import { DocumentNode } from 'graphql';
import { RootState, AppDispatch } from 'store';
import { from, Observable, of } from 'rxjs';
import { useStore } from 'react-redux';
import { useCallback } from 'react';
import { StateObservable } from 'redux-observable';
import { logout } from 'store/epics';
import { Action } from 'redux';
import { showMessage } from 'store/slices/globalMessages';

export interface IGithubApiErrorBody {
  message: string;
  documentation_url: string;
}
export class GithubApiError extends Error {
  status: number;
  headers: Headers;
  body: IGithubApiErrorBody;

  constructor(status: number, headers: Headers, body: IGithubApiErrorBody) {
    super(`${status} ${body.message}`);
    // * Set the prototype explicitly. https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    Object.setPrototypeOf(this, GithubApiError.prototype);
    this.name = this.constructor.name;

    this.status = status;
    this.headers = headers;
    this.body = body;
  }
}

export const handleAjaxError = (dispatch: AppDispatch) => (err: any): void => {
  console.error('handleAjaxError', err);

  if (err instanceof GithubApiError) {
    if (err.status === 401) {
      dispatch(logout());
      return;
    }

    dispatch(
      showMessage({
        hideIn: null,
        message: {
          type: 'error',
          title: 'GithubApiError',
          description: err.body.message,
        },
      })
    );
    return;
  }

  throw err;
};
export const handleAjaxErrorRx = (err: any): Observable<Action> => {
  console.error('handleAjaxErrorRx', err);

  if (err instanceof GithubApiError) {
    if (err.status === 401) {
      return of(logout());
    }

    return of(
      showMessage({
        hideIn: null,
        message: {
          type: 'error',
          title: 'GithubApiError',
          description: err.body.message,
        },
      })
    );
  }

  throw err;
};

interface IAjaxRequest<R> {
  path: string;
  init?: RequestInit;
  transformResponse: (res: Response) => Promise<R>;
}
const ajaxBasic = async <R>({
  path,
  init,
  transformResponse,
}: IAjaxRequest<R>): Promise<R> => {
  const res = await fetch(path, init);

  return await transformResponse(res);
};

interface IGraphqlResponseBody {
  data: any;
  errors?: any[];
}
export const gqlQuery = (
  query: DocumentNode,
  variables?: object
): IAjaxRequest<[IGraphqlResponseBody, Headers]> => {
  return {
    path: 'https://api.github.com/graphql',
    init: {
      method: 'POST',
      body: JSON.stringify({ query: query.loc?.source.body, variables }),
    },
    transformResponse: async (res) => {
      const body = await res.json();

      if (!res.ok) {
        throw new GithubApiError(res.status, res.headers, body);
      }

      return [body, res.headers];
    },
  };
};

export const withGithubAuthentication = (oauthToken: string | null) => <R>(
  req: IAjaxRequest<R>
): IAjaxRequest<R> => {
  return !oauthToken
    ? req
    : {
        ...req,
        init: {
          ...req.init,
          headers: {
            ...req.init?.headers,
            Authorization: `Bearer ${oauthToken}`,
          },
        },
      };
};

const ajax = (getState: () => RootState): typeof ajaxBasic => (req) => {
  return ajaxBasic(withGithubAuthentication(getState().auth.token)(req));
};

export const rxajax = (state$: StateObservable<RootState>) => <R>(
  req: IAjaxRequest<R>
): Observable<R> => from(ajax(() => state$.value)(req));

export const useAjax = <
  R extends any,
  F extends (...args: any[]) => Promise<R>
>(
  f: (ajx: typeof ajaxBasic) => F,
  deps: React.DependencyList
): F => {
  const store = useStore();
  const g = useCallback(
    (...args: any[]) => f(ajax(store.getState))(...args).catch(handleAjaxError),
    deps
  );
  return g as F;
};

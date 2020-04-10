import {DocumentNode} from 'graphql';
import {RootState, AppDispatch} from 'store';
import {from, Observable, of} from 'rxjs';
import {useStore} from 'react-redux';
import {useMemo} from 'react';
import {StateObservable} from 'redux-observable';
import {logout} from 'store/epics';
import {Action} from 'redux';
import {showMessage} from 'store/slices/globalMessages';

const apiRoot = 'https://api.github.com';

export interface IGithubApiErrorBody {
  message: string;
  documentation_url: string;
}
export class GithubApiError extends Error {
  status: number;
  headers: Headers;
  data: IGithubApiErrorBody;

  constructor(status: number, headers: Headers, data: IGithubApiErrorBody) {
    super(`${status} ${data.message}`);
    // * Set the prototype explicitly. https://stackoverflow.com/questions/41102060/typescript-extending-error-class
    Object.setPrototypeOf(this, GithubApiError.prototype);
    this.name = this.constructor.name;

    this.status = status;
    this.headers = headers;
    this.data = data;
  }
}

export const handleAjaxError = (dispatch: AppDispatch) => (err: any): void => {
  console.error(err);

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
          description: err.data.message,
        },
      })
    );
    return;
  }

  throw err;
};
export const handleAjaxErrorRx = (err: any): Observable<Action> => {
  console.error(err);

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
          description: err.data.message,
        },
      })
    );
  }

  throw err;
};

const transformApiError = async (res: Response): Promise<Response> => {
  if (!res.ok) {
    const body = await res.json();
    throw new GithubApiError(res.status, res.headers, body);
  }

  return res;
};

interface IAjaxRequest<R> {
  path: string;
  init?: RequestInit;
  transformResponse: (res: Response) => Promise<R>;
}
const ajaxBasic = async <R>({path, init, transformResponse}: IAjaxRequest<R>): Promise<R> => {
  const res = await fetch(path, init);

  return await transformResponse(res);
};

interface IGraphqlResponseBody<R = any> {
  data: R;
  errors?: any[];
}
export const gqlQuery = <R = any>(
  query: DocumentNode,
  variables?: object
): IAjaxRequest<[IGraphqlResponseBody<R>, Headers]> => {
  return {
    path: `${apiRoot}/graphql`,
    init: {
      method: 'POST',
      body: JSON.stringify({query: query.loc?.source.body, variables}),
    },
    transformResponse: (res) =>
      transformApiError(res).then(async (res) => {
        const body = await res.json();
        const r: [IGraphqlResponseBody<R>, Headers] = [body, res.headers];
        return r;
      }),
  };
};

interface IRawQueryParams extends RequestInit {
  path: string;
}
export const rawQuery = ({path, ...init}: IRawQueryParams): IAjaxRequest<Response> => {
  return {
    path: `${apiRoot}${path}`,
    init,
    transformResponse: transformApiError,
  };
};

interface IJsonQueryParams extends IRawQueryParams {}
export const jsonQuery = (params: IJsonQueryParams): IAjaxRequest<[any, Headers]> => {
  const ajxr = rawQuery(params);
  return {
    ...ajxr,
    transformResponse: (res) =>
      ajxr.transformResponse(res).then(async (res) => {
        const r: [any, Headers] = [await res.json(), res.headers];
        return r;
      }),
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

export const useAjax = () => {
  const store = useStore();
  return useMemo(() => ajax(store.getState), []);
};

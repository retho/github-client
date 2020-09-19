import {AppStore} from 'store';
import {showMessage} from 'store/slices/globalMessages';
import {logout} from 'store/epics';

export type GithubApiErrorBody = {
  message: string;
  documentation_url: string;
};

type AjaxSuccessfulResponse<D> = {
  kind: 'success';
  status: number;
  headers: Headers;
  data: D;
};
type AjaxUnathorized = {
  kind: 'unauthorized';
};
type AjaxApiError = {
  kind: 'api-error';
  status: number;
  headers: Headers;
  data: GithubApiErrorBody;
};
type AjaxUnknownError = {
  kind: 'unknown-error';
  error: any;
};
export type AjaxReply<D> =
  | AjaxSuccessfulResponse<D>
  | AjaxUnathorized
  | AjaxApiError
  | AjaxUnknownError;

export type AjaxRequest<D> = {
  res2data: (res: Response) => Promise<D>;
  path: string;
  config?: RequestInit;
};
export type Ajax = <D>(params: AjaxRequest<D>) => Promise<AjaxReply<D>>;
export const genAjax = (store: AppStore): Ajax => async ({res2data, path, config}) => {
  const oauthToken = store.getState().auth.token;

  const reply = await fetch(path, {
    ...config,
    headers: {
      ...config?.headers,
      ...(oauthToken ? {Authorization: `Bearer ${oauthToken}`} : {}),
    },
  })
    .then(async (res) => {
      if (res.ok) {
        const data = await res2data(res);

        return {
          kind: 'success' as const,
          status: res.status,
          headers: res.headers,
          data,
        };
      }

      if (res.status === 401) {
        store.dispatch(logout());
        return {kind: 'unauthorized' as const};
      }

      const data: GithubApiErrorBody = await res.json();

      return {
        kind: 'api-error' as const,
        status: res.status,
        headers: res.headers,
        data,
      };
    })
    .catch((err) => {
      console.error(err);
      store.dispatch(
        showMessage({
          hideIn: null,
          message: {
            type: 'error',
            title: 'Unknown network error',
            description: err.message,
          },
        })
      );

      return {
        kind: 'unknown-error' as const,
        error: err,
      };
    });
  return reply;
};

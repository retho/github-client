import {DocumentNode} from 'graphql';
import {AjaxRequest} from './ajax';

const apiRoot = 'https://api.github.com';

type GraphqlResponseBody<R> = {
  data: R;
  errors?: unknown[];
};
const gqlQuery = <R>(
  query: DocumentNode,
  variables?: object
): AjaxRequest<GraphqlResponseBody<R>> => {
  return {
    path: `${apiRoot}/graphql`,
    config: {
      method: 'POST',
      body: JSON.stringify({query: query.loc?.source.body, variables}),
    },
    res2data: (res) => res.json(),
  };
};

type RawQueryParams = RequestInit & {
  path: string;
};
const rawQuery = ({path, ...rest}: RawQueryParams): AjaxRequest<Response> => {
  return {
    path: `${apiRoot}${path}`,
    config: rest,
    res2data: (res) => Promise.resolve(res),
  };
};

type JsonQueryParams = RawQueryParams & {};
const jsonQuery = <R>(params: JsonQueryParams): AjaxRequest<R> => {
  const ajxr = rawQuery(params);
  return {
    ...ajxr,
    res2data: (res) => res.json(),
  };
};

export {rawQuery, jsonQuery, gqlQuery};

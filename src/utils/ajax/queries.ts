import {DocumentNode} from 'graphql';
import {IAjaxRequest} from './ajax';

const apiRoot = 'https://api.github.com';

interface IGraphqlResponseBody<R = any> {
  data: R;
  errors?: any[];
}
const gqlQuery = <R = any>(
  query: DocumentNode,
  variables?: object
): IAjaxRequest<IGraphqlResponseBody<R>> => {
  return {
    path: `${apiRoot}/graphql`,
    config: {
      method: 'POST',
      body: JSON.stringify({query: query.loc?.source.body, variables}),
    },
    res2data: (res) => res.json(),
  };
};

interface IRawQueryParams extends RequestInit {
  path: string;
}
const rawQuery = ({path, ...rest}: IRawQueryParams): IAjaxRequest<Response> => {
  return {
    path: `${apiRoot}${path}`,
    config: rest,
    res2data: (res) => Promise.resolve(res),
  };
};

interface IJsonQueryParams extends IRawQueryParams {}
const jsonQuery = <R = any>(params: IJsonQueryParams): IAjaxRequest<R> => {
  const ajxr = rawQuery(params);
  return {
    ...ajxr,
    res2data: (res) => res.json(),
  };
};

export {rawQuery, jsonQuery, gqlQuery};

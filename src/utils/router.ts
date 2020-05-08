import {IRoute, Empty} from 'router/core';
import UrlPattern from 'url-pattern';
import {stringify as qsStringifyQuery} from 'query-string';

export const stringifyQuery = qsStringifyQuery;
export const stringifyRoute = <P extends string | Empty, Q extends string | Empty>(
  route: IRoute<P, Q>,
  params: P extends string ? Record<P, string> : null,
  query: Q extends string ? Partial<Record<Q, string>> : null
) => {
  const pattern = new UrlPattern(route.pattern);
  return pattern.stringify(params) + (query ? `?${stringifyQuery(query as any)}` : '');
};

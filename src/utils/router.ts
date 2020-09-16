import {IRoute, Empty} from 'router/core';
import UrlPattern from 'url-pattern';
import {stringify as qsStringifyQuery, parse as qsParse} from 'query-string';
import {mapValues} from 'lodash';
import {matchPath} from 'react-router-dom';

export const stringifyQuery = qsStringifyQuery;
export const stringifyRoute = <P extends string | Empty, Q extends string | Empty>(
  route: IRoute<P, Q>,
  params: P extends string ? Record<P, string> : null,
  query: Q extends string ? Partial<Record<Q, string>> : null
) => {
  const pattern = new UrlPattern(route.pattern);
  return encodeURI(
    pattern.stringify(params && mapValues(params, encodeURIComponent)) +
      (query ? `?${stringifyQuery(query as any)}` : '')
  );
};

export const matchRoute = <P extends string | Empty, Q extends string | Empty>(
  route: IRoute<P, Q>,
  pathname: string,
  search: string
): null | [Record<P, string>, Partial<Record<Q, string>>] => {
  const matched: {params: Record<P, string>} | null = matchPath(pathname, {
    path: route.pattern,
    exact: true,
  });
  if (!matched) return null;

  const params = mapValues(matched.params, decodeURIComponent);
  const query = qsParse(search, {
    parseBooleans: false,
    parseNumbers: false,
    arrayFormat: 'none',
  }) as Partial<Record<Q, string>>;
  return [params, query];
};

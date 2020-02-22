import { IRoute } from 'router/routes';
import UrlPattern from 'url-pattern';
import { stringify as qsStringifyQuery } from 'query-string';

export const stringifyQuery = qsStringifyQuery;
export const stringifyRoute = <P extends Record<string, string> | null>(
  route: IRoute<P>,
  params: P,
  query?: Record<string, string>
) => {
  const pattern = new UrlPattern(route.pattern);
  return pattern.stringify(params) + (query ? `?${stringifyQuery(query)}` : '');
};

const empty = Symbol('empty');
export type Empty = typeof empty;

export type RouteRender<P extends string | Empty = Empty, Q extends string | Empty = Empty> = {
  (params: Record<P, string>, query: Partial<Record<Q, string>>): JSX.Element;
};

export type Route<P extends string | Empty = Empty, Q extends string | Empty = Empty> = {
  pattern: string;
  render: RouteRender<P, Q>;
};

export const createRoute = <P extends string | Empty = Empty, Q extends string | Empty = Empty>(
  pattern: string,
  render: RouteRender<P, Q>
): Route<P, Q> => ({pattern, render});

export const createRouteRender = <
  P extends string | Empty = Empty,
  Q extends string | Empty = Empty
>(
  render: RouteRender<P, Q>
): RouteRender<P, Q> => render;

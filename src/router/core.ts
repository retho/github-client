const empty = Symbol('empty');
export type Empty = typeof empty;

export interface IRouteRender<P extends string | Empty = Empty, Q extends string | Empty = Empty> {
  (params: Record<P, string>, query: Partial<Record<Q, string>>): JSX.Element;
}

export interface IRoute<P extends string | Empty = Empty, Q extends string | Empty = Empty> {
  pattern: string;
  render: IRouteRender<P, Q>;
}

export const createRoute = <P extends string | Empty = Empty, Q extends string | Empty = Empty>(
  pattern: string,
  render: IRouteRender<P, Q>
): IRoute<P, Q> => ({pattern, render});

export const createRouteRender = <
  P extends string | Empty = Empty,
  Q extends string | Empty = Empty
>(
  render: IRouteRender<P, Q>
): IRouteRender<P, Q> => render;

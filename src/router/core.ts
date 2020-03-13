export interface IRouteRender<
  P extends string | null,
  Q extends string | null
> {
  (
    params: P extends string ? Record<P, string> : {},
    query: Q extends string ? Partial<Record<Q, string>> : {}
  ): JSX.Element;
}
export interface IRoute<P extends string | null, Q extends string | null> {
  pattern: string;
  render: IRouteRender<P, Q>;
}

export const createRoute = <
  P extends string | null = null,
  Q extends string | null = null
>(
  pattern: string,
  render: IRouteRender<P, Q>
): IRoute<P, Q> => ({ pattern, render });

export const createRouteRender = <
  P extends string | null = null,
  Q extends string | null = null
>(
  render: IRouteRender<P, Q>
): IRouteRender<P, Q> => render;

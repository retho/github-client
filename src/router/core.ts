export interface IRoute<P extends string | null, Q extends string | null> {
  pattern: string;
}

export interface IRouteRender<P extends string | null, Q extends string | null> {
  (
    params: P extends string ? Record<P, string> : {},
    query: Q extends string ? Partial<Record<Q, string>> : {}
  ): JSX.Element;
}

export interface IRouteWithRender<P extends string | null, Q extends string | null>
  extends IRoute<P, Q> {
  render: IRouteRender<P, Q>;
}

export const createRoute = <P extends string | null = null, Q extends string | null = null>(
  pattern: string
): IRoute<P, Q> => ({pattern});

export const extendRoute = <P extends string | null = null, Q extends string | null = null>(
  route: IRoute<P, Q>,
  render: IRouteRender<P, Q>
): IRouteWithRender<P, Q> => ({...route, render});

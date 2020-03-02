export interface IRoute<P extends string | null, Q extends string | null> {
  pattern: string;
  render: (
    params: P extends string ? Record<P, string> : {},
    query: Q extends string ? Partial<Record<Q, string>> : {}
  ) => JSX.Element;
}
export const createRoute = <
  P extends string | null = null,
  Q extends string | null = null
>(
  route: IRoute<P, Q>
): IRoute<P, Q> => route;

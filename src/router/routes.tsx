import React from 'react';
import AppPage from 'components/pages/AppPage';
import IconPage from 'components/pages/IconsPage';

export interface IRoute<P extends Record<string, string> | null>
  extends ICreateRouteConfig<P> {}
interface ICreateRouteConfig<P extends any> {
  pattern: string;
  render: (params: P) => JSX.Element;
}

const createRoute = <P extends any>(
  route: ICreateRouteConfig<P>
): P extends Record<string, string> | null
  ? keyof P extends string
    ? IRoute<Record<keyof P, string>>
    : IRoute<null>
  : never => route as any;

const routes = {
  root: createRoute({
    pattern: '/',
    render: () => <AppPage />,
  }),
  search: createRoute({
    pattern: '/search',
    render: () => <AppPage />,
  }),
  icons: createRoute({
    pattern: '/icons',
    render: () => <IconPage />,
  }),
  specificIcon: createRoute({
    pattern: '/icons/:iconType',
    render: ({ iconType }: { iconType: string }) => (
      <IconPage selectedIcon={iconType} />
    ),
  }),
};

export default routes;

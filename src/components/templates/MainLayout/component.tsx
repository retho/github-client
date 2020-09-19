import React, {FC} from 'react';
import './style.scss';
import AppHeader from 'components/organisms/AppHeader';

export type MainLayoutProps = {};
const MainLayout: FC<MainLayoutProps> = (props) => {
  return (
    <div className="MainLayout">
      <AppHeader className="MainLayout__header" />
      <div className="MainLayout__body">{props.children}</div>
    </div>
  );
};

export default MainLayout;

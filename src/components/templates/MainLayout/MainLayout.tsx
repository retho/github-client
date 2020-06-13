import React from 'react';
import './style.scss';
import AppHeader from 'components/organisms/AppHeader';

export interface IMainLayoutProps {
  children?: JSX.Element;
}
const MainLayout: React.FC<IMainLayoutProps> = ({children}) => {
  return (
    <div className="MainLayout">
      <AppHeader className="MainLayout__header" />
      <div className="MainLayout__body">{children}</div>
    </div>
  );
};

export default MainLayout;

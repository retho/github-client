import React from 'react';
import './style.scss';
import MainLayout from 'components/templates/MainLayout';
import { Link } from 'react-router-dom';
import { stringifyRoute } from 'utils/router';
import { routes } from 'router';
import DemoTheme from 'components/organisms/DemoTheme';

export interface IDemoPageProps {
  subject?: 'theme';
}
const DemoPage: React.FC<IDemoPageProps> = ({ subject }) => {
  let content = null;
  switch (subject) {
    case 'theme': {
      content = <DemoTheme />;
      break;
    }
    default: {
      content = (
        <div className="DemoPage-nav">
          <ul>
            <li>
              <Link to={stringifyRoute(routes.demoTheme, null, null)}>
                Theme
              </Link>
            </li>
          </ul>
        </div>
      );
    }
  }

  return <MainLayout>{content}</MainLayout>;
};

export default DemoPage;

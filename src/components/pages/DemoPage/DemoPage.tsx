import React from 'react';
import './style.scss';
import MainLayout from 'components/templates/MainLayout';
import { Link } from 'react-router-dom';
import { stringifyRoute } from 'utils/router';
import { routes } from 'router';
import DemoTheme from 'components/organisms/DemoTheme';
import DemoMedia from 'components/organisms/DemoMedia';

export interface IDemoPageProps {
  subject?: 'theme' | 'media';
}
const DemoPage: React.FC<IDemoPageProps> = ({ subject }) => {
  let content = null;
  switch (subject) {
    case 'theme': {
      content = <DemoTheme />;
      break;
    }
    case 'media': {
      content = <DemoMedia />;
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
            <li>
              <Link to={stringifyRoute(routes.demoMedia, null, null)}>
                Media
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

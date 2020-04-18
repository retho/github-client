import React from 'react';
import './style.scss';
import MainLayout from 'components/templates/MainLayout';
import {Link} from 'react-router-dom';
import {stringifyRoute} from 'utils/router';
import {routes} from 'router';
import DemoTheme from 'components/organisms/DemoTheme';
import DemoMedia from 'components/organisms/DemoMedia';
import DemoForm from 'components/organisms/DemoForm';

const nav = {
  theme: {
    component: DemoTheme,
    title: 'theme',
    url: stringifyRoute(routes.demoTheme, null, null),
  },
  media: {
    component: DemoMedia,
    title: 'media',
    url: stringifyRoute(routes.demoMedia, null, null),
  },
  form: {
    component: DemoForm,
    title: 'form',
    url: stringifyRoute(routes.demoForm, null, null),
  },
};

export interface IDemoPageProps {
  subject?: keyof typeof nav;
}
const DemoPage: React.FC<IDemoPageProps> = ({subject}) => {
  const SubjectComponent = subject && nav[subject].component;

  const content = SubjectComponent ? (
    <SubjectComponent />
  ) : (
    <div className="DemoPage-nav">
      <ul>
        {Object.values(nav).map((x) => (
          <li key={x.url}>
            <Link to={x.url}>{x.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return <MainLayout>{content}</MainLayout>;
};

export default DemoPage;

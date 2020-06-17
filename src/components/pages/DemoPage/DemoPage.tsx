import React from 'react';
import './style.scss';
import MainLayout from 'components/templates/MainLayout';
import {Link} from 'react-router-dom';
import {stringifyRoute} from 'utils/router';
import {routes} from 'router';
import DemoEmpty from 'components/organisms/DemoEmpty';
import DemoTheme from 'components/organisms/DemoTheme';
import DemoMedia from 'components/organisms/DemoMedia';
import DemoForm from 'components/organisms/DemoForm';
import DemoThunkVsRx from 'components/organisms/DemoThunkVsRx';
import DemoPureComponent from 'components/organisms/DemoPureComponent';
import DemoSvgMap from 'components/organisms/DemoSvgMap';
import DemoRxJs from 'components/organisms/DemoRxJs';

const nav = {
  empty: {
    component: DemoEmpty,
    title: 'empty',
    url: stringifyRoute(routes.demoEmpty, null, null),
  },
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
  'thunk-vs-rx': {
    component: DemoThunkVsRx,
    title: 'redux-thunk vs redux-observable',
    url: stringifyRoute(routes.demoThunkVsRx, null, null),
  },
  'pure-component': {
    component: DemoPureComponent,
    title: 'Component vs PureComponent',
    url: stringifyRoute(routes.demoPureComponent, null, null),
  },
  svg: {
    component: DemoSvgMap,
    title: 'svg map',
    url: stringifyRoute(routes.demoSvgMap, null, null),
  },
  rxjs: {
    component: DemoRxJs,
    title: 'rxjs',
    url: stringifyRoute(routes.demoRxJs, null, null),
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

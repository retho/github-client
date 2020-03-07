import React, { useEffect } from 'react';
import './style.scss';
import i18n from './i18n';
import { useLocale } from 'utils/i18n';
import { range } from 'lodash-es';
import { useAjax } from 'utils/ajax';
import { queryUserData } from './gql';

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis risus sed vulputate odio ut enim. Massa vitae tortor condimentum lacinia quis vel eros donec ac. Sit amet nisl suscipit adipiscing bibendum est ultricies. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa. Senectus et netus et malesuada fames. Et pharetra pharetra massa massa ultricies. Arcu felis bibendum ut tristique et egestas quis ipsum suspendisse. Id faucibus nisl tincidunt eget nullam non nisi est. Vulputate ut pharetra sit amet aliquam id diam maecenas. Enim neque volutpat ac tincidunt. Faucibus turpis in eu mi bibendum neque. Id aliquet risus feugiat in ante metus dictum. Risus ultricies tristique nulla aliquet enim tortor at auctor urna. Id aliquet risus feugiat in ante metus dictum. Suspendisse ultrices gravida dictum fusce ut placerat orci. Ac auctor augue mauris augue neque gravida in.';

const HomePage: React.FC = () => {
  const locale = useLocale(i18n);

  const loadUserData = useAjax((ajax) => () => ajax(queryUserData()), []);

  useEffect(() => {
    loadUserData().then(console.log);
  }, []);

  return (
    <div className="HomePage">
      <h1>{locale.title}</h1>
      <div>
        {range(0, 40).map((_, i) => (
          <br key={i} />
        ))}
        {loremIpsum}
      </div>
    </div>
  );
};

export default HomePage;

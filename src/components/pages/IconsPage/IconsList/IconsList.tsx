import React from 'react';
import './style.scss';
import SvgIcon, { allSvgIconTypes } from 'components/atoms/SvgIcon/SvgIcon';
import { Link } from 'react-router-dom';
import { routes } from 'router';
import { stringifyRoute } from 'utils/router';

interface IIconsListProps {}
const IconsList: React.FC<IIconsListProps> = () => {
  return (
    <div className="IconsList">
      {allSvgIconTypes.map((x) => (
        <Link
          key={x}
          className="IconsList-item IconsList__item"
          to={stringifyRoute(routes.specificIcon, { iconType: x })}
        >
          <SvgIcon className="IconPage-icons-list-item__icon" type={x} />
          {x}
        </Link>
      ))}
    </div>
  );
};

export default IconsList;

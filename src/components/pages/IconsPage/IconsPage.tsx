import React from 'react';
import './style.scss';
import IconsList from './IconsList';
import {isSvgIconType} from 'components/atoms/SvgIcon/SvgIcon';
import IconView from './IconView';

export type IconPageProps = {
  selectedIcon?: string;
};
const IconPage: React.FC<IconPageProps> = (props) => {
  return (
    <div className="IconPage">
      <div className="IconPage-content IconPage__content">
        {!props.selectedIcon ? (
          <IconsList />
        ) : isSvgIconType(props.selectedIcon) ? (
          <IconView iconType={props.selectedIcon} />
        ) : (
          <div>Icon was not found</div>
        )}
      </div>
    </div>
  );
};

export default IconPage;

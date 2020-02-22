import React from 'react';
import './style.scss';
import IconsList from './IconsList';
import { isSvgIconType } from 'components/atoms/SvgIcon/SvgIcon';
import IconView from './IconView';

interface IIconPageProps {
  selectedIcon?: string;
}
const IconPage: React.FC<IIconPageProps> = ({ selectedIcon }) => {
  return (
    <div className="IconPage">
      <div className="IconPage-content IconPage__content">
        {!selectedIcon ? (
          <IconsList />
        ) : isSvgIconType(selectedIcon) ? (
          <IconView iconType={selectedIcon} />
        ) : (
          <div>Icon was not found</div>
        )}
      </div>
    </div>
  );
};

export default IconPage;

import React from 'react';
import './style.scss';
import SvgIcon, {SvgIconType} from 'components/atoms/SvgIcon/SvgIcon';

interface IIconViewProps {
  iconType: SvgIconType;
}
const IconView: React.FC<IIconViewProps> = ({iconType}) => {
  return (
    <div className="IconView">
      <h2>{iconType}</h2>
      <div className="IconView__icons-list">
        <SvgIcon type={iconType} className="IconView__icon IconView__icon--size_bg" />
        <SvgIcon type={iconType} className="IconView__icon IconView__icon--size_md" />
        <SvgIcon type={iconType} className="IconView__icon IconView__icon--size_sm" />
        <SvgIcon type={iconType} className="IconView__icon IconView__icon--size_x-sm" />
      </div>
    </div>
  );
};

export default IconView;

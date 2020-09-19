import React, {FC} from 'react';
import './style.scss';
import SvgIcon, {SvgIconType} from 'components/atoms/SvgIcon';

export type IconViewProps = {
  iconType: SvgIconType;
};
const IconView: FC<IconViewProps> = (props) => {
  return (
    <div className="IconView">
      <h2>{props.iconType}</h2>
      <div className="IconView__icons-list">
        <SvgIcon type={props.iconType} className="IconView__icon IconView__icon--size_bg" />
        <SvgIcon type={props.iconType} className="IconView__icon IconView__icon--size_md" />
        <SvgIcon type={props.iconType} className="IconView__icon IconView__icon--size_sm" />
        <SvgIcon type={props.iconType} className="IconView__icon IconView__icon--size_x-sm" />
      </div>
    </div>
  );
};

export default IconView;

import React from 'react';
import cn from 'classnames';
import './style.scss';

// * icon sources:
// * - https://octicons.github.com/
import { ReactComponent as octiconMarkGithub } from './svg/octicon-mark-github.svg';
import { ReactComponent as octiconCode } from './svg/octicon-code.svg';
import { ReactComponent as octiconSignOut } from './svg/octicon-sign-out.svg';
import { ReactComponent as octiconRepo } from './svg/octicon-repo.svg';
import { ReactComponent as octiconX } from './svg/octicon-x.svg';
import { ReactComponent as octiconPlay } from './svg/octicon-play.svg';
import { ReactComponent as octiconInfo } from './svg/octicon-info.svg';
import { ReactComponent as octiconStar } from './svg/octicon-star.svg';
import { ReactComponent as octiconGear } from './svg/octicon-gear.svg';

const icons = {
  'octicon-mark-github': octiconMarkGithub,
  'octicon-code': octiconCode,
  'octicon-sign-out': octiconSignOut,
  'octicon-repo': octiconRepo,
  'octicon-x': octiconX,
  'octicon-play': octiconPlay,
  'octicon-info': octiconInfo,
  'octicon-star': octiconStar,
  'octicon-gear': octiconGear,
};
export type SvgIconType = keyof typeof icons;

export const allSvgIconTypes = Object.keys(icons) as SvgIconType[];

export const isSvgIconType = (type: string): type is SvgIconType =>
  Object.keys(icons).includes(type);

export interface IIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  type: SvgIconType;
}
const SvgIcon = ({ type, className, ...restProps }: IIconProps) => {
  const CustomIcon = icons[type];
  return <CustomIcon className={cn('SvgIcon', className)} {...restProps} />;
};

export default SvgIcon;

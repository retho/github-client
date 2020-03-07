import React from 'react';
import cn from 'classnames';
import './style.scss';

// * icon sources:
// * - https://octicons.github.com/
import { ReactComponent as octiconMarkGithub } from './svg/octicon-mark-github.svg';
import { ReactComponent as octiconCode } from './svg/octicon-code.svg';
import { ReactComponent as octiconSignOut } from './svg/octicon-sign-out.svg';
import { ReactComponent as octiconRepo } from './svg/octicon-repo.svg';
import { ReactComponent as octiconTriangleDown } from './svg/octicon-triangle-down.svg';
import { ReactComponent as octiconTriangleLeft } from './svg/octicon-triangle-left.svg';
import { ReactComponent as octiconTriangleRight } from './svg/octicon-triangle-right.svg';
import { ReactComponent as octiconTriangleUp } from './svg/octicon-triangle-up.svg';
import { ReactComponent as octiconX } from './svg/octicon-x.svg';

const icons = {
  'octicon-mark-github': octiconMarkGithub,
  'octicon-code': octiconCode,
  'octicon-sign-out': octiconSignOut,
  'octicon-repo': octiconRepo,
  'octicon-triangle-down': octiconTriangleDown,
  'octicon-triangle-left': octiconTriangleLeft,
  'octicon-triangle-right': octiconTriangleRight,
  'octicon-triangle-up': octiconTriangleUp,
  'octicon-x': octiconX,
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

import React from 'react';
import cn from 'classnames';
import './style.scss';

export interface ISvgRegionProps {
  id: string;
  path: string | string[];
  onClick?: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
}
const SvgRegion: React.FC<ISvgRegionProps> = ({id, path, onClick}) => {
  return (
    <g className={cn('SvgRegion')} onClick={onClick}>
      <title>{id}</title>
      {Array.isArray(path) ? path.map((x, i) => <path key={i} d={x} />) : <path d={path || ''} />}
    </g>
  );
};

export default SvgRegion;

import React from 'react';
import './style.scss';
import SvgMap from './SvgMap';

export interface IDemoSvgMapProps {}
const DemoSvgMap: React.FC<IDemoSvgMapProps> = () => {
  return (
    <div className="DemoSvgMap">
      <SvgMap />
    </div>
  );
};

export default DemoSvgMap;

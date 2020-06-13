import React from 'react';
import './style.scss';

import fds from './dataFederalDistricts';
import SvgRegion from './SvgRegion';

export interface ISvgMapProps {}
const SvgMap: React.FC<ISvgMapProps> = () => {
  return (
    <div className="SvgMap">
      <svg version="1.0" width="1650" height="1000" viewBox="0 0 1650 1000">
        <g transform="matrix(0.98780187,0,0,0.98780187,44.07902,15.838595)">
          {fds.map((fd) => (
            <g
              key={fd.id}
              // eslint-disable-next-line no-console
              onClick={() => console.log(`rederal district ${fd.id} clicked`)}
            >
              {fd.regions.map((reg) => (
                <SvgRegion
                  key={reg.id}
                  id={reg.id}
                  path={reg.path}
                  // eslint-disable-next-line no-console
                  onClick={() => console.log(`region ${reg.id} clicked`)}
                />
              ))}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default SvgMap;

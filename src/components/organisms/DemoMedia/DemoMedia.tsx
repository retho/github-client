import React from 'react';
import './style.scss';
import {useMedia, MediaBreakpoints} from 'utils/media';

export interface IDemoMediaProps {}
const DemoMedia: React.FC<IDemoMediaProps> = () => {
  const currentBreakpoint = useMedia('xl', {
    [MediaBreakpoints.lg]: 'lg',
    [MediaBreakpoints.md]: 'md',
    [MediaBreakpoints.sm]: 'sm',
    [MediaBreakpoints.xs]: 'xs',
  });

  const currentDevice = useMedia('desktop', {
    [MediaBreakpoints.md]: 'tablet',
    [MediaBreakpoints.sm]: 'mobile',
  });

  return (
    <div className="DemoMedia">
      <h1 className="DemoMedia__header">
        {currentBreakpoint} {currentDevice}
      </h1>
      <div className="DemoMedia__card-list">
        <div className="DemoMedia__card" />
        <div className="DemoMedia__card" />
        <div className="DemoMedia__card" />
        <div className="DemoMedia__card" />
      </div>
    </div>
  );
};

export default DemoMedia;

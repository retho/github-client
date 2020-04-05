import React from 'react';
import './style.scss';

export interface IDemoMediaProps {}
const DemoMedia: React.FC<IDemoMediaProps> = () => {
  return (
    <div className="DemoMedia">
      <div className="DemoMedia__card" />
      <div className="DemoMedia__card" />
      <div className="DemoMedia__card" />
      <div className="DemoMedia__card" />
    </div>
  );
};

export default DemoMedia;

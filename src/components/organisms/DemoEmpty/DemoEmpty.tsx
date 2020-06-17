import React from 'react';
import './style.scss';

export interface IDemoEmptyProps {}
const DemoEmpty: React.FC<IDemoEmptyProps> = () => {
  return <div className="DemoEmpty"></div>;
};

export default DemoEmpty;

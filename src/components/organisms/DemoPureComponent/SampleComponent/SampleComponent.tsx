import React, {ReactNode} from 'react';
import './style.scss';

export interface ISampleComponentProps {
  title: string;
  children: ReactNode;
}
const SampleComponent: React.FC<ISampleComponentProps> = ({title, children}) => {
  return (
    <div className="SampleComponent">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default SampleComponent;

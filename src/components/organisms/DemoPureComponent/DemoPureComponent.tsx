import React, {useRef, Component, PureComponent, FC, useState} from 'react';
import './style.scss';
import {useForceRender} from 'utils/common';
import SampleComponent from './SampleComponent';

interface ISampleProps {
  someProp: number;
}

class A extends Component<ISampleProps> {
  renderCount = 0;

  render() {
    const {someProp} = this.props;
    this.renderCount = this.renderCount + 1;

    return (
      <SampleComponent title={`(${someProp}) Component`}>
        Rendered {this.renderCount} times
      </SampleComponent>
    );
  }
}

class C extends PureComponent<ISampleProps> {
  renderCount = 0;

  render() {
    const {someProp} = this.props;
    this.renderCount = this.renderCount + 1;

    return (
      <SampleComponent title={`(${someProp}) PureComponent`}>
        Rendered {this.renderCount} times
      </SampleComponent>
    );
  }
}

const B: FC<ISampleProps> = ({someProp}) => {
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;

  return (
    <SampleComponent title={`(${someProp}) FunctionComponent`}>
      Rendered {renderCount.current} times
    </SampleComponent>
  );
};

const D: FC<ISampleProps> = React.memo(function D({someProp}) {
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;

  return (
    <SampleComponent title={`(${someProp}) FunctionComponent (with React.memo())`}>
      Rendered {renderCount.current} times
    </SampleComponent>
  );
});

export interface IDemoPureComponentProps {}
const DemoPureComponent: React.FC<IDemoPureComponentProps> = () => {
  const forceRender = useForceRender();
  const [counter, setCounter] = useState(0);

  return (
    <div className="DemoPureComponent">
      <div className="DemoPureComponent__control">
        <span>counter: {counter}</span>
        <button onClick={() => setCounter((x) => x + 1)}>increment</button>
        <button onClick={() => forceRender()}>rerender without children props change</button>
      </div>
      <div className="DemoPureComponent__sample">
        <A someProp={counter} />
      </div>
      <div className="DemoPureComponent__sample">
        <B someProp={counter} />
      </div>
      <div className="DemoPureComponent__sample">
        <C someProp={counter} />
      </div>
      <div className="DemoPureComponent__sample">
        <D someProp={counter} />
      </div>
    </div>
  );
};

export default DemoPureComponent;

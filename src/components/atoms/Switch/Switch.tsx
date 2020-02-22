import React from 'react';
import cn from 'classnames';
import './style.scss';
import ReactSwitch, { ReactSwitchProps } from 'react-switch';

export interface ILangTogglerProps {
  className?: string;
  checked: boolean;
  onChange: ReactSwitchProps['onChange'];
  checkedIcon?: ReactSwitchProps['checkedIcon'];
  uncheckedIcon?: ReactSwitchProps['uncheckedIcon'];
  onColor?: ReactSwitchProps['onColor'];
  offColor?: ReactSwitchProps['offColor'];
}
const Switch = (props: ILangTogglerProps) => {
  return (
    <ReactSwitch
      className={cn('Switch', props.className)}
      checked={props.checked}
      onChange={props.onChange}
      height={24}
      width={48}
      checkedIcon={props.checkedIcon}
      uncheckedIcon={props.uncheckedIcon}
      onColor={props.onColor}
      offColor={props.offColor}
    />
  );
};

export default Switch;

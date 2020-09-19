import React, {FC} from 'react';
import cn from 'classnames';
import ReactSwitch, {ReactSwitchProps} from 'react-switch';

export type LangTogglerProps = {
  className?: string;
  checked: boolean;
  onChange: ReactSwitchProps['onChange'];
  checkedIcon?: ReactSwitchProps['checkedIcon'];
  uncheckedIcon?: ReactSwitchProps['uncheckedIcon'];
  onColor?: ReactSwitchProps['onColor'];
  offColor?: ReactSwitchProps['offColor'];
};
const Switch: FC<LangTogglerProps> = (props) => {
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

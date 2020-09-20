import React, {FC} from 'react';
import ReactSwitch, {ReactSwitchProps} from 'react-switch';
import bem, {cn} from 'utils/bem';

const root = bem('Switch');
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
      className={cn(root(), props.className)}
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

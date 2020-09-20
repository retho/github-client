import React, {FC} from 'react';
import './style.scss';
import {useDispatch} from 'react-redux';
import {useSelector} from 'utils/redux';
import {switchLang} from 'store/slices/i18n';
import Switch from 'components/atoms/Switch';
import {LocaleLang} from 'constants/locale';
import bem, {cn} from 'utils/bem';

const root = bem('LangToggler');
export type LangTogglerProps = {
  className?: string;
};
const LangToggler: FC<LangTogglerProps> = (props) => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.i18n.lang);

  const handleChange = (checked: boolean) =>
    dispatch(switchLang(checked ? LocaleLang.en : LocaleLang.ru));

  return (
    <Switch
      className={cn(root(), props.className)}
      checked={lang === LocaleLang.en}
      onChange={handleChange}
      checkedIcon={<span className="LangToggler__lang-tip">&nbsp;en</span>}
      uncheckedIcon={<span className="LangToggler__lang-tip">&nbsp;ru</span>}
      onColor="#888"
      offColor="#888"
    />
  );
};

export default LangToggler;

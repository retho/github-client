import React from 'react';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { SupportedLang, switchLang } from 'store/slices/i18n';
import cn from 'classnames';
import Switch from 'components/atoms/Switch';

export interface ILangTogglerProps {
  className?: string;
}
const LangToggler = (props: ILangTogglerProps) => {
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.i18n.lang);

  const handleChange = (checked: boolean) =>
    dispatch(switchLang(checked ? SupportedLang.en : SupportedLang.ru));

  return (
    <Switch
      className={cn('LangToggler', props.className)}
      checked={lang === SupportedLang.en}
      onChange={handleChange}
      checkedIcon={<span className="LangToggler__lang-tip">&nbsp;en</span>}
      uncheckedIcon={<span className="LangToggler__lang-tip">&nbsp;ru</span>}
      onColor="#888"
      offColor="#888"
    />
  );
};

export default LangToggler;

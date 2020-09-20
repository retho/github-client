import React, {FC} from 'react';
import ReactDom from 'react-dom';
import './style.scss';
import SvgIcon from 'components/atoms/SvgIcon';
import {stopPropagation} from 'utils/common';
import bem from 'utils/bem';

const foregroundNode = document.querySelector('#foreground');
if (!foregroundNode) {
  throw new Error('#foreground not found');
}

const root = bem('Modal');
const wrapper = bem('Modal-wrapper');
export type ModalProps = {
  open: boolean;
  onClose?: () => void;
};
const Modal: FC<ModalProps> = (props) => {
  return ReactDom.createPortal(
    <div className={wrapper({closed: !props.open})} onClick={props.onClose}>
      <div className={root()} onClick={stopPropagation}>
        <SvgIcon className={root('x')} type="octicon-x" onClick={props.onClose} />
        {props.children}
      </div>
    </div>,
    foregroundNode
  );
};

export default Modal;

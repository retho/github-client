import React, {FC} from 'react';
import ReactDom from 'react-dom';
import cn from 'classnames';
import './style.scss';
import SvgIcon from 'components/atoms/SvgIcon';
import {stopPropagation} from 'utils/common';

const getForegroundNode = () => {
  const foregroundNode = document.querySelector('#foreground');
  if (!foregroundNode) {
    throw new Error('#foreground not found');
  }
  return foregroundNode;
};

export type ModalProps = {
  open: boolean;
  onClose?: () => void;
};
const Modal: FC<ModalProps> = (props) => {
  return ReactDom.createPortal(
    <div
      className={cn('Modal-wrapper', !props.open && 'Modal-wrapper--closed')}
      onClick={props.onClose}
    >
      <div className="Modal" onClick={stopPropagation}>
        <SvgIcon className="Modal__x" type="octicon-x" onClick={props.onClose} />
        {props.children}
      </div>
    </div>,
    getForegroundNode()
  );
};

export default Modal;

import React from 'react';
import ReactDom from 'react-dom';
import cn from 'classnames';
import './style.scss';
import SvgIcon from 'components/atoms/SvgIcon';
import { stopPropagation } from 'utils/common';

const foregroundNode = document.querySelector('#foreground');
if (!foregroundNode) {
  throw new Error('#foreground not found');
}

export interface IModalProps {
  children?: JSX.Element;
  open: boolean;
  onClose?: () => void;
}
const Modal: React.FC<IModalProps> = ({ children, open, onClose }) => {
  return ReactDom.createPortal(
    <div
      className={cn('Modal-wrapper', !open && 'Modal-wrapper--closed')}
      onClick={onClose}
    >
      <div className="Modal" onClick={stopPropagation}>
        <SvgIcon className="Modal__x" type="octicon-x" onClick={onClose} />
        {children}
      </div>
    </div>,
    foregroundNode
  );
};

export default Modal;

import React, {FC} from 'react';

export interface IExternalLinkProps {
  className?: string;
  href: string;
}
const ExternalLink: FC<IExternalLinkProps> = (props) => {
  return (
    <a className={props.className} href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
};

export default ExternalLink;

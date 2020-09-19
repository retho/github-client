import React, {FC} from 'react';

export type ExternalLinkProps = {
  className?: string;
  href: string;
};
const ExternalLink: FC<ExternalLinkProps> = (props) => {
  return (
    <a className={props.className} href={props.href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
};

export default ExternalLink;

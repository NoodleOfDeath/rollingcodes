import React from 'react';

import Icon from '@mdi/react';
import styled from 'styled-components';

type AnchorProps = React.PropsWithChildren<{
  href?: string;
  target?: string;
  icon?: string;
  color?: string;
  underline?: boolean;
  textDecoration?: string;
}>;

const StyledAnchor = styled.a<AnchorProps>`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  color: ${({ color }) => color || 'black'};
  text-decoration: ${({ textDecoration }) => textDecoration || 'underline'};
`;

export const Anchor = ({
  href,
  target = '_blank',
  icon,
  color,
  underline,
  textDecoration = underline ? 'underline' : 'none',
  children,
}: AnchorProps = {}) => {
  return (
    <StyledAnchor href={ href } target={ target } color={ color } textDecoration={ textDecoration }>
      {icon && <Icon path={ icon } title="Mail" size={ 1 } />}
      {children}
    </StyledAnchor>
  );
};

export const LinkAnchor = ({
  color = 'blue',
  underline = true,
  ...props
}: AnchorProps) => {
  return <Anchor color={ color } underline={ underline } { ...props } />;
};
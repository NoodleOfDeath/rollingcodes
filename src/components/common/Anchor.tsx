import React from 'react';

import Icon from '@mdi/react';
import styled from 'styled-components';

type AnchorProps = React.PropsWithChildren<{
  href?: string;
  target?: string;
  icon?: string;
  color?: string;
}>;

const StyledAnchor = styled.a<AnchorProps>`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: center;
  color: ${({ color }) => color || 'black'};
  text-decoration: none;
`;

export const Anchor = ({
  href,
  target,
  icon,
  color,
  children,
}: AnchorProps = {}) => {
  return (
    <StyledAnchor href={ href } target={ target } color={ color }>
      {icon && <Icon path={ icon } title="Mail" size={ 1 } />}
      {children}
    </StyledAnchor>
  );
};
import React from 'react';

import styled from 'styled-components';

export type StackProps = {
  direction?: 'column' | 'row';
  row?: boolean;
  gap?: string;
  children?: React.ReactNode;
};

const StyledStack = styled.div<StackProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: ${({ gap }) => gap};
`;

export const Stack = ({
  row = false,
  direction = row ? 'row' : 'column', 
  gap = '0.25rem',
  children, 
}: StackProps) => {
  return (
    <StyledStack direction={ direction } gap={ gap }>
      {children}
    </StyledStack>
  );
};
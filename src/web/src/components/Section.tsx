import React from 'react';

import styled from 'styled-components';

import { Stack, StackProps } from './common';

export type SectionProps = React.PropsWithChildren<{
  header?: React.ReactNode;
  subheader?: React.ReactNode;
  nested?: boolean;
}> & StackProps;

const StyledSectionHeader = styled.div<{ $nested?: boolean; }>`
  font-size: ${({ $nested }) => $nested ? '1.25rem' : '1.5rem'};
  font-weight: bold;
  text-transform: ${({ $nested }) => $nested ? 'none' : 'uppercase'};
`;

const StyledSectionSubheader = styled.div<{ $nested?: boolean; }>`
  font-size: 1rem;
  font-weight: bold;
  font-style: italic;
`;

export const Section = ({
  header, 
  subheader,
  nested,
  children,
  ...props
}: SectionProps = {}) => {
  return (
    <Stack>
      {header && <StyledSectionHeader $nested={ nested }>{header}</StyledSectionHeader>}
      {subheader && <StyledSectionSubheader $nested={ nested }>{subheader}</StyledSectionSubheader>}
      {children && <Stack { ...props }>{children}</Stack>}
    </Stack>
  );
};
import React from 'react';

import NextLink from 'next/link';

import { BaseComponent, TextViewProps } from '~/hooks';

type LinkProps = React.PropsWithChildren<{
  href: string;
  target?: string;
}> & TextViewProps;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Link = ({ color = 'inherit', ...props }: LinkProps) => (
  <BaseComponent
    color={ color }
    Component={ NextLink as any }
    { ...props } />
);
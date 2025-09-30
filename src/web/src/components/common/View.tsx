import React from 'react';

import { BaseComponent, ViewProps } from '~/hooks';

export const Div = ({ ...props }: ViewProps) => (
  <div { ...props as any } />
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const View = ({ ...props }: ViewProps) => (
  <BaseComponent
    Component={ Div }
    { ...props } />
);
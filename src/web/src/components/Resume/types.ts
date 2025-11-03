import { CSSProperties } from 'react';

import { ResumeData } from '~/data/resume';

export type ResumeStylePreset = {
  /** Display name for the preset */
  name: string;
  /** Unique identifier */
  id: string;
  /** Description of the style */
  description: string;
  /** Layout configuration */
  layout: 'sidebar' | 'single-column' | 'two-column';
  /** Color scheme */
  colors: {
    background: string;
    headerBackground: string;
    headerText: string;
    primary: string;
    secondary: string;
    text: string;
    accent?: string;
  };
  /** Typography configuration */
  typography: {
    fontFamily: string;
    headerFontSize: string;
    baseFontSize: string;
    lineHeight: number;
  };
  /** Spacing configuration */
  spacing: {
    sectionGap: string;
    itemGap: string;
    padding: string;
  };
  /** Component visibility and ordering */
  sections: {
    order: Array<'education' | 'experience' | 'header' | 'projects' | 'skills' | 'summary'>;
    visible: {
      education: boolean;
      projects: boolean;
      skills: boolean;
      summary: boolean;
    };
  };
  /** Style overrides */
  styles?: {
    container?: CSSProperties;
    header?: CSSProperties;
    section?: CSSProperties;
  };
};

export type ResumeConfig = {
  preset: ResumeStylePreset;
  data: ResumeData;
};

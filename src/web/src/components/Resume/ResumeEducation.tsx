import React from 'react';

import styled from 'styled-components';

import { Section, Stack } from '~/components';
import { Education } from '~/data/resume';

const StyledSubheader = styled.div`
  font-weight: bold;
  line-height: 1.2;
`;

export type ResumeEducationProps = {
  education: Education;
};

export const ResumeEducation = ({ education }: ResumeEducationProps) => {
  return (
    <Section
      header="Education"
      subheader={ (
        <Stack>
          <StyledSubheader>{education.degree}</StyledSubheader>
          <StyledSubheader>
            {`Majors: ${education.majors.join(' & ')}`}
          </StyledSubheader>
          {education.minor && (
            <StyledSubheader>
              {`Minor: ${education.minor}`}
            </StyledSubheader>
          )}
        </Stack>
      ) } />
  );
};

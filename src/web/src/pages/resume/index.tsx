import React from 'react';

import { usePDF } from 'react-to-pdf';
import styled from 'styled-components';

import { Section, Stack } from '~/components';
import {
  ResumeEducation,
  ResumeHeader,
  ResumeSkills,
  WorkExperienceItem,
} from '~/components/Resume';
import { resumeData } from '~/data/resume';

const StyledButton = styled.button`
  padding: 1rem;
  margin: 1rem auto;
  align-self: center;
  cursor: pointer;
  background-color: #282c34;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background-color: #3a3f47;
  }
`;

const StyledPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
`;

const StyledContainer = styled.div`
  display: flex;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* Standard letter size aspect ratio (8.5 : 11) */
  width: min(100vw - 4rem, 850px);
  aspect-ratio: 8.5 / 11;

  /* Scale font sizes relative to container width */
  font-size: clamp(8px, 0.8vw, 12px);

  @media print {
    width: 8.5in;
    height: 11in;
    box-shadow: none;
    font-size: 10pt;
  }
`;

const StyledLeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StyledRightColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const StyledSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  flex: 1;
  overflow: hidden;
`;

const StyledParagraph = styled.li`
  list-style: none;
  line-height: 1.4;
`;

const Index = () => {
  const { toPDF, targetRef } = usePDF({
    filename: `Morgan, Thomas - Resume - ${new Date().getFullYear()}.pdf`,
    method: 'save',
    resolution: 2,
  });

  return (
    <Stack>
      <StyledButton onClick={ () => toPDF() }>
        Download PDF
      </StyledButton>
      <StyledPageWrapper>
        <StyledContainer ref={ targetRef }>
          <StyledLeftColumn>
            <ResumeHeader contact={ resumeData.contact } />
            <StyledSectionContainer>
              <ResumeEducation education={ resumeData.education } />
              <ResumeSkills skills={ resumeData.skills } />
            </StyledSectionContainer>
          </StyledLeftColumn>
          <StyledRightColumn>
            <StyledSectionContainer>
              <Section header="Summary">
                <StyledParagraph>{resumeData.summary}</StyledParagraph>
              </Section>
              <Section header="Work Experience" gap="1.25rem">
                {resumeData.workExperience.map((experience, index) => (
                  <WorkExperienceItem
                    key={ index }
                    experience={ experience } />
                ))}
              </Section>
              {resumeData.projects.length > 0 && (
                <Section header="Projects" gap="1.5rem">
                  {resumeData.projects.map((project, index) => (
                    <WorkExperienceItem
                      key={ index }
                      experience={ project } />
                  ))}
                </Section>
              )}
            </StyledSectionContainer>
          </StyledRightColumn>
        </StyledContainer>
      </StyledPageWrapper>
    </Stack>
  );
};

export default Index;

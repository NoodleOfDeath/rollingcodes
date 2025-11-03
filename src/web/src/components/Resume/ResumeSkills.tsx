import React from 'react';

import { Tooltip } from '@mui/material';
import styled from 'styled-components';

import { Section } from '~/components';
import { SkillCategory } from '~/data/resume';

const StyledSkillItem = styled.span`
  cursor: help;
`;

const StyledSkillsContainer = styled.div`
  display: block;
`;

export type ResumeSkillsProps = {
  skills: SkillCategory[];
};

export const ResumeSkills = ({ skills }: ResumeSkillsProps) => {
  return (
    <Section header="Skills">
      {skills.map((category, index) => (
        <Section key={ `${category.title}-${index}` } nested header={ category.title }>
          <StyledSkillsContainer>
            {category.items.map((skill, skillIndex) => (
              <React.Fragment key={ `${skill.title}-${skillIndex}` }>
                <Tooltip
                  title={ skill.description }
                  enterDelay={ 500 }
                  enterNextDelay={ 500 }
                  arrow
                  placement="top"
                  slotProps={ {
                    tooltip: {
                      sx: {
                        bgcolor: 'rgba(0, 0, 0, 0.85)',
                        fontSize: '0.75rem',
                        maxWidth: 300,
                      },
                    },
                  } }>
                  <StyledSkillItem>{skill.title}</StyledSkillItem>
                </Tooltip>
                {skillIndex < category.items.length - 1 ? '; ' : ';'}
              </React.Fragment>
            ))}
          </StyledSkillsContainer>
        </Section>
      ))}
    </Section>
  );
};

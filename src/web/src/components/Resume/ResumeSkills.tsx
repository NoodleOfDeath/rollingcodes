import React from 'react';

import { Section } from '~/components';
import { Skills } from '~/data/resume';

export type ResumeSkillsProps = {
  skills: Skills;
};

export const ResumeSkills = ({ skills }: ResumeSkillsProps) => {
  return (
    <Section header="Skills" gap="1.5rem">
      <Section nested header="Methodologies">
        {skills.methodologies.join('; ')};
      </Section>
      <Section nested header="Favorite Languages">
        {skills.favoriteLanguages.join('; ')};
      </Section>
      <Section nested header="All Languages">
        {skills.allLanguages.join('; ')};
      </Section>
      <Section nested header="Libraries, Frameworks, and Platforms">
        {skills.librariesAndFrameworks.join('; ')};
      </Section>
      <Section nested header="CI/CD, DevOps, and Cloud">
        {skills.ciCdDevOpsCloud.join('; ')};
      </Section>
      <Section nested header="Developer Tools">
        {skills.developerTools.join('; ')};
      </Section>
      <Section nested header="Robotics Simulation">
        {skills.roboticsSimulation.join('; ')};
      </Section>
      <Section nested header="Certifications">
        {skills.certifications.join('; ')};
      </Section>
    </Section>
  );
};

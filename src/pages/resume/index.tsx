import React from 'react';

import {
  mdiCalendar,
  mdiEmail,
  mdiGithub,
  mdiPhone,
  mdiPin,
} from '@mdi/js';
import styled from 'styled-components';

import {
  Anchor,
  Section,
  Stack,
} from '~/components';

const StyledContainer = styled.div`
  display: flex;
  max-width: 1000px;
  margin: auto;
  border: 1px solid black;
`;

const StyledLeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StyledRightColumn = styled.div`
  flex: 2;
  border-left: 1px solid black;
`;

const StyledHeader = styled.header`
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: white;
  padding: 1rem;
`; 

const StyledHeaderName = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const StyledHeaderTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const StyledHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
`;

type WorkExperienceProps = React.PropsWithChildren<{
  company: React.ReactNode;
  title: React.ReactNode;
  startDate: Date;
  endDate?: Date;
  location: React.ReactNode;
  achievements: React.ReactNode[];
}>;

const WorkExperience = ({
  company,
  title,
  startDate,
  endDate,
  location,
  achievements,
}: WorkExperienceProps) => {
  return (
    <Section 
      nested
      header={ title }
      subheader={ company }>
      <Stack row gap="1rem">
        <Anchor 
          icon={ mdiCalendar }>
          {`${startDate.toDateString()} - ${endDate?.toDateString() ?? 'present'}` }
        </Anchor>
        <Anchor icon={ mdiPin }>
          {location}
        </Anchor>
      </Stack>
      <Stack gap="0.25rem">
        {achievements.map((achievement, index) => (
          <li key={ index }>
            {achievement}
          </li>
        ))}
      </Stack>
    </Section>
  );
};

const Index = () => {
  return (
    <StyledContainer>
      <StyledLeftColumn>
        <StyledHeader>
          <StyledHeaderName>Thom Morgan</StyledHeaderName>
          <StyledHeaderTitle>Full Stack Engineer</StyledHeaderTitle>
          <StyledHeaderContent>
            <Anchor 
              href="mailto:thom@noodleofdeath.com" 
              target="_blank"
              icon={ mdiEmail }
              color='white'>
              thom@noodleofdeath.com
            </Anchor>
            <Anchor 
              href="tel:17032155735" 
              target="_blank" 
              icon={ mdiPhone }
              color='white'>
              (703) 215-5735
            </Anchor>
            <Anchor icon={ mdiPin } color='white'>
              Waltham, MA
            </Anchor>
            <Anchor 
              href="https://www.github.com/noodleofdeath"
              target="_blank"
              icon={ mdiGithub }
              color='white'>
              www.github.com/noodleofdeath
            </Anchor>
          </StyledHeaderContent>
        </StyledHeader>
        <StyledSectionContainer>
          <Section 
            header="Education"
            subheader="Bachelor of Science Mathematics & Computer Science (Film Studies Minor)">

          </Section>
          <Section header="Skills" gap="1.5rem">
            <Section nested header="Languages">
              ANTLR4; Brainfuck; C; C#; C++; CSS
              ; Go; HTML; Java; JavaScript; JSON;
              LaTeX; MatLab; MySQL; NoSQL;
              ObjectiveC; PERL; PHP;
              PostgreSQL; Python; R; Ruby; Rust
              ; SCSS; Shell; Solidity; SQL; Swift;
              SwiftUI; TypeScript; Whitespace;
              XHTML; XML; YAML
            </Section>
            <Section nested header="Libraries, Frameworks, and Platforms">
              Angularjs; Angular 8+; Asana;
              Atlassian (JIRA
              Confluence);
              Bootstrap; Cordova; Docker;
              FastAPI; Flutter; Gradle; GraphQL;
              jQuery; Nextjs; Nodejs; Nuxtjs;
              Pandas; PyTorch; Reactjs; React-
              Native; Tailwind CSS; Tensorflow;
              Vuejs; WordPress
            </Section>
            <Section nested header="CI/CD, DevOps, and Cloud">
              AWS; Azure; BlueOcean; CircleCI;
              DataDog; DigitalOcean; Helm;
              GitHub Actions; GitLab Webhooks;
              Google Cloud Services; Jenkins;
              Kubernetes; Terraform
            </Section>
            <Section nested header="Software/Tools">
              Android Studio; Aptitude;
              CocoaPods; Eclipse IDE;
              Homebrew; NPM; PNPM; Remix
              IDE; Swift Package Manager;
              VSCode; XCode; Yarn
            </Section>
          </Section>
        </StyledSectionContainer>
      </StyledLeftColumn>
      <StyledRightColumn>
        <StyledSectionContainer>
          <Section header="Career Objective">
            Highly skilled Full Stack Engineer and Mobile Application Engineer with over 10 years of professional experience in iOS and Android native development, natural language processing, databases, cloud computing, API design, and web development. Certified Professional Scrum Master I and AWS Developer Certified, with expertise in Agile, Kanban, and Waterfall methodologies. Seeking opportunities to leverage my expertise in software engineering, data science, and machine learning to develop innovative, high-quality, and scalable software solutions.
          </Section>
          <Section header="Work Experience" gap="1.5rem">
            <WorkExperience  
              title="Senior Full Stack Engineer, iOS/Android Engineer"
              company="Boston Dynamics"
              startDate={ new Date('2020-04-22') }
              location="Waltham, MA"
              achievements={ [
                'Redesigned the React web application and native Android',
                'Designed, implemented, and lead a team of engineers to reengineer the native Spot iOS app resulting in more than 20% monthly app',
                'Staged, tested, and deployed Mobile Device Management (MDM)',
                'Wrote unit, systems, and end-to-end tests to be run on the CI/CD',
              ] } />
            <WorkExperience  
              title="Senior Full Stack Engineer"
              company="Absci Corp"
              startDate={ new Date('2020-06-20') }
              endDate={ new Date('2022-04-22') }
              location="Waltham, MA"
              achievements={ [
                'Developed and deployed end-to-end applications resulting in a 30',
                'Built end-to-end applications using FastAPI and Vue.js, resulting in a',
                'Engineered generative neural networks to produce DNA sequences of potential markers that maximize gene affinity, increasing the accuracy of identifying key biological markers by 50',
              ] } />
            <WorkExperience  
              title="Full Stack Engineer, iOS Engineer, and Android Engineer"
              company="Unisys Federal SAIC"
              startDate={ new Date('2016-05-22') }
              endDate={ new Date('2020-04-22') }
              location="Alexandria, VA"
              achievements={ [
                'Ported over a dozen existing ReactJS/Angular.js web applications into native and React-Native mobile applications increasing the number of CBP interceptions by over 1000% than in previous years',
                'Refactored the codebase, using best practices, reducing build times',
              ] } />
          </Section>
          <Section header="Projects" gap="1.5rem">
            <WorkExperience
              title="Lead Full Stack Engineer, iOS/Android Engineer, DevOps Engineer"
              company="Read Less LLC"
              startDate={ new Date('2023-02-20') }
              location="remote"
              achievements={ [
                'Providing users with concise and accessible news with support for over 40 languages',
                'Designed and developed the Express API, leveraging Sequelize ORM and PostgreSQL, reducing MVP development time to under 2 weeks',
                'Engineered an on-demand automated worker queue to interface with more than 3 REST APIs including OpenAI\'s completion API, DeepAI\'s image generation API, and Resemble.ai\'s voice cloning API',
                'Developed a puppeteer web scraper that crawls over 100 news',
                'Designed and developed the React web application',
                'Configured and deployed to Kubernetes clusters, DNS, SSL, and CI/CD pipelines coupled with Github Actions, cutting operating costs to $500 a month',
              ] } />
          </Section>
        </StyledSectionContainer>
      </StyledRightColumn>
    </StyledContainer>
  );
};

export default Index;
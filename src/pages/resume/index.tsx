import React from 'react';

import {
  mdiCalendar,
  mdiEmail,
  mdiGithub,
  mdiPhone,
  mdiPin,
} from '@mdi/js';
import { format } from 'date-fns';
import { usePDF } from 'react-to-pdf';
import styled from 'styled-components';

import {
  Anchor,
  Section,
  Stack,
} from '~/components';

const StyledButton = styled.button`
  padding: 1rem;
  margin: 1rem auto;
  align-self: center;
`;

const StyledContainer = styled.div`
  display: flex;
  min-width: 1000px;
  max-width: 1000px;
  margin: auto;
`;

const StyledLeftColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StyledRightColumn = styled.div`
  flex: 2;
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

const StyledSubheader = styled.div`
  font-weight: bold;
`;

const StyledSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const StyledParagraph = styled.li`
  list-style: none;
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
          { `${ format(startDate, 'MMM yyyy') } - ${ endDate ? format(endDate, 'MMM yyyy') : 'present' }` }
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
  const { toPDF, targetRef } = usePDF({
    filename: 'Morgan Resume - 2024.pdf',
    method: 'save',
  });
  return (
    <Stack>
      <StyledButton onClick={ () => toPDF() }>
        Download PDF
      </StyledButton>
      <StyledContainer ref={ targetRef }>
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
              subheader={ (
                <Stack>
                  <StyledSubheader>Bachelor of Science</StyledSubheader>
                  <StyledSubheader>Majors: Computer Science &amp; Mathematics</StyledSubheader>
                  <StyledSubheader>Minor: Film Studies</StyledSubheader>
                </Stack>
              ) } />
            <Section header="Skills" gap="0.5rem">
              <Section nested header="Methodologies">
                AGILE; Kanban; Waterfall;
              </Section>
              <Section nested header="Favorite Languages">
                Python; Swift; TypeScript; V;
              </Section>
              <Section nested header="All Languages">
                ANTLR4; C; C#; C++; CSS
                ; Go; HTML; Java; JavaScript; JSON;
                LaTeX; MatLab; MySQL; NoSQL;
                ObjectiveC; PERL; PHP;
                PostgreSQL; Python; R; Ruby; Rust
                ; SCSS; Shell; Solidity; SQL; Swift;
                SwiftUI; TypeScript;
                XHTML; XML; YAML;
              </Section>
              <Section nested header="Libraries, Frameworks, and Platforms">
                Angularjs; Angular 8+; Asana;
                Atlassian (JIRA
                Confluence);
                Bootstrap; Cordova; Docker; Express;
                FastAPI; Flutter; Gradle; GraphQL; gRPC;
                jQuery; Nextjs; Nodejs; Nuxtjs;
                Pandas; Protobuffs; PyTorch; Reactjs; React-
                Native; REST APIs, Tailwind CSS; Tensorflow;
                Vuejs; WordPress;
              </Section>
              <Section nested header="CI/CD, DevOps, and Cloud">
                AWS; Azure; BlueOcean; CircleCI;
                DataDog; DigitalOcean; Helm;
                GitHub Actions; GitLab Webhooks;
                Google Cloud Services; Jenkins;
                Kubernetes; Terraform;
              </Section>
              <Section nested header="Developer Tools">
                Android Studio; Aptitude;
                CocoaPods; Eclipse IDE;
                Homebrew; NPM; PNPM; Remix
                IDE; Swift Package Manager;
                VSCode; XCode; Yarn;
              </Section>
              <Section nested header="Simulations/CAD Software">
                CATIA; Gazebo; MuJoCo;
              </Section>
              <Section nested header="Certifications">
                AWS Developer Certified; Offensive Security Certified Professional (OSCP); Professional Scrum Master I (PSM I); 
              </Section>
            </Section>
          </StyledSectionContainer>
        </StyledLeftColumn>
        <StyledRightColumn>
          <StyledSectionContainer>
            <Section header="Summary">
              <StyledParagraph>I am a Full Stack Engineer and Penetration Tester with over 10 years of professional experience in end-to-end web app development, mobile app development, CI/CD, offensive security hardening, robotics, and data science.</StyledParagraph>
            </Section>
            <Section header="Work Experience" gap="1.25rem">
              <WorkExperience  
                title="Senior Full Stack Engineer &amp; Penetration Tester"
                company="Boston Dynamics"
                startDate={ new Date('2020-06-15') }
                location="Waltham, MA"
                achievements={ [
                  'Rearchitected and fine tuned various perception AI models used by Spot and Atlas, improving their success rate of climbing debris without falling over from 60% to 99.9%',
                  'Redesigned the React web application and native Android application for Stretch leading to 25% fewer direct support requests from customers.',
                  'Designed, implemented, and lead a team of engineers to reengineer the native Spot iOS app and SDK increasing developer SDK downloads by more than 20% a month.',
                  'Staged, tested, and deployed Mobile Device Management (MDM) for tablet devices improving security and ensuring $50M in deals with customers who labeled MDM as a dealbreaking requirement.',
                  'Refactored unit, systems, simulations (Gazebo and MuJoCo), and end-to-end tests (Selenium/Playwright) that reduced CI/CD pipeline costs by about 35%.',
                ] } />
              <WorkExperience  
                title="Senior Full Stack Engineer &amp; Data Scientist"
                company="Absci Corp"
                startDate={ new Date('2018-06-15') }
                endDate={ new Date('2020-06-15') }
                location="Remote"
                achievements={ [
                  'Engineered generative adversarial neural networks to produce DNA sequences of potential markers that maximize gene affinity, beating the previous algorithm\'s accuracy of identifying key biological markers by 20%.',
                  'Developed and deployed end-to-end applications resulting in a 50% increase in the speed at which genomes could be submitted and sequenced by biologists.',
                  'Data mined APIs and designed data visualizations that provided scientists and product owners with the necessary KPIs to facilitate budgeting decisions.',
                ] } />
              <WorkExperience  
                title="Senior Full Stack Engineer &amp; iOS/Android Engineer"
                company="Unisys Federal SAIC"
                startDate={ new Date('2014-05-15') }
                endDate={ new Date('2018-06-15') }
                location="Alexandria, VA"
                achievements={ [
                  'Ported over a dozen existing ReactJS/Angular.js web applications into native and React-Native mobile applications increasing the number of CBP interceptions by over 1000% (not a typo) than in previous years.',
                  'Refactored the codebase, using best practices, reducing build times and cutting CI/CD costs by nearly 50% ',
                ] } />
            </Section>
            <Section header="Projects" gap="1.5rem">
              <WorkExperience
                title="Lead Full Stack, iOS/Android, DevOps Engineer"
                company="Read Less LLC"
                startDate={ new Date('2023-02-20') }
                location="Remote"
                achievements={ [
                  'Developed and app that provides users with concise and accessible news with support for over 40 languages.',
                  'Designed and developed the Express API, leveraging Sequelize ORM and PostgreSQL, reducing MVP development time to under 2 weeks.',
                  'Engineered an on-demand automated worker queue to interface with more than 3 REST APIs including OpenAI\'s completion API, DeepAI\'s image generation API, and Resemble.ai\'s voice cloning API.',
                  'Developed a puppeteer web scraper that crawls over 100 news.',
                  'Designed and developed the React web application.',
                  'Configured and deployed to Kubernetes clusters, DNS, SSL, and CI/CD pipelines coupled with Github Actions, cutting operation costs to less than $500/month.',
                ] } />
            </Section>
          </StyledSectionContainer>
        </StyledRightColumn>
      </StyledContainer>
    </Stack>
  );
};

export default Index;
import React from 'react';

import {
  mdiApple,
  mdiBeer,
  mdiCalendar,
  mdiEmail,
  mdiGithub,
  mdiPhone,
  mdiPin,
  mdiWeb,
} from '@mdi/js';
import { format, intervalToDuration } from 'date-fns';
import pluralize from 'pluralize';
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
  gap: 1.5rem;
  padding: 1rem;
`;

const StyledParagraph = styled.li`
  list-style: none;
`;

type WorkExperienceProps = React.PropsWithChildren<{
  company: React.ReactNode;
  title: React.ReactNode;
  startDate?: Date;
  endDate?: Date;
  releaseDate?: Date;
  location: React.ReactNode;
  achievements: React.ReactNode[];
}>;

const WorkExperience = ({
  company,
  title,
  startDate,
  endDate,
  releaseDate,
  location,
  achievements,
}: WorkExperienceProps) => {
  const duration = startDate ? intervalToDuration({ end: endDate ?? new Date(), start: startDate }) : null;
  const timeInYears = duration ? `${duration.years} ${pluralize('year', duration.years)}${duration.months ? ` ${duration.months} ${pluralize('month', duration.months)}` : ''}` : '';
  return (
    <Section
      nested
      header={ title }
      subheader={ company }>
      <Stack row gap="1rem">
        {startDate != null && (
          <Anchor
            icon={ mdiCalendar }>
            {`${format(startDate, 'MMM yyyy')} - ${endDate ? format(endDate, 'MMM yyyy') : 'present'} (${timeInYears})`}
          </Anchor>
        )}
        {releaseDate != null && (
          <Anchor
            icon={ mdiApple }>
            {['Released on', format(releaseDate, 'MMM d, yyyy')].join(' ')}
          </Anchor>
        )}
        {location && (
          <Anchor icon={ mdiPin }>
            {location}
          </Anchor>
        )}
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
                Everett, MA
              </Anchor>
              <Anchor
                href="https://www.github.com/noodleofdeath"
                target="_blank"
                icon={ mdiGithub }
                color='cyan'>
                www.github.com/noodleofdeath
              </Anchor>
              <Anchor
                href="https://noodleofdeath.com"
                target="_blank"
                icon={ mdiWeb }
                color='cyan'>
                www.noodleofdeath.com
              </Anchor>
              <Anchor
                href="https://drunkmode.app"
                target="_blank"
                icon={ mdiBeer }
                color='cyan'>
                www.drunkmode.app
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
                ANTLR4; C; C#; C++; CSS; Go; HTML; Java; JavaScript; JSON;
                LaTeX; MatLab; MySQL; NoSQL; ObjectiveC; PERL; PHP; PostgreSQL; 
                Python; R; Ruby; Rust; SCSS; Shell; Solidity; SQL; Swift; SwiftUI;
                TypeScript; XHTML; XML; YAML;
              </Section>
              <Section nested header="Libraries, Frameworks, and Platforms">
                Angularjs; Angular 8+; Asana;
                Atlassian (JIRA Confluence);
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
                Blender; CATIA; Gazebo; MuJoCo;
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
              <StyledParagraph>Full Stack Engineer with over 12 years of professional experience in end-to-end web app development, mobile app development, CI/CD, offensive security hardening, robotics, and data science.</StyledParagraph>
            </Section>
            <Section header="Work Experience" gap="1.25rem">
              <WorkExperience
                title="Senior Full Stack Engineer &amp; Penetration Tester"
                company="Boston Dynamics"
                startDate={ new Date('2022-06-15') }
                location="Waltham, MA"
                achievements={ [
                  'Redesigned the React web application and react-native applications for Stretch leading to significantly fewer support requests from logistics customers.',
                  'Staged, tested, and deployed Mobile Device Management (MDM) for tablet devices improving security and ensuring $50M in deals with customers who labeled MDM as a dealbreaking requirement.',
                  'Built and designed an automated test harness used for systems, simulations (Gazebo and MuJoCo), and end-to-end tests (Selenium/Playwright) both in Jenkins and BuildKite providing tangible code and test coverage metrics and hardening software before release.',
                  'Rearchitected and fine tuned various perception AI models used by Spot and Atlas for path expansion, object detection, and obstacle avoidance.',
                ] } />
              <WorkExperience
                title="Senior Full Stack Engineer &amp; Data Scientist"
                company="Absci Corp"
                startDate={ new Date('2020-06-15') }
                endDate={ new Date('2022-06-15') }
                location="Remote"
                achievements={ [
                  'Engineered generative adversarial neural networks to produce DNA sequences of potential markers that maximize gene affinity, beating the previous algorithm\'s accuracy of identifying key biological markers by 20%.',
                  'Developed and deployed end-to-end applications resulting in a 50% increase in the speed at which genomes could be submitted and sequenced by biologists.',
                  'Data mined APIs and designed data visualizations that provided scientists and product owners with the necessary KPIs to facilitate budgeting decisions.',
                ] } />
              <WorkExperience
                title="Senior Full Stack Engineer &amp; iOS/Android Engineer"
                company="Unisys Federal SAIC"
                startDate={ new Date('2016-05-15') }
                endDate={ new Date('2020-06-15') }
                location="Alexandria, VA"
                achievements={ [
                  'Ported over a dozen existing ReactJS/Angular.js web applications into native and React-Native mobile applications increasing the number of CBP interceptions of wanted person by over 10 times than in previous years.',
                  'Refactored the codebase, using best practices, reducing build times and cutting CI/CD costs by nearly 50% ',
                ] } />
            </Section>
            <Section header="Projects" gap="1.5rem">
              <WorkExperience
                title="Lead Full Stack, iOS/Android, DevOps Engineer"
                company="Read Less LLC"
                releaseDate={ new Date('2024-02-20') }
                location={ (
                  <Stack row gap="1rem">
                    <Anchor
                      href="https://drunkmode.app"
                      target="_blank"
                      icon={ mdiBeer }
                      color='blue'>
                      drunkmode.app
                    </Anchor>
                    <Anchor
                      href="https://github.com/NoodleOfDeath/react-native-screen-time-api"
                      target="_blank"
                      icon={ mdiGithub }
                      color='blue'>
                      react-native-screen-time-api
                    </Anchor>
                  </Stack>
                ) }
                achievements={ [
                  'Developed an iOS app to help users prevent themselves from drunk texting or using other apps irresponsibly.',
                  'Open sourced the underlying Screen Time API feature code as a react native library.',
                  'Designed and developed the Express API, leveraging Sequelize ORM and PostgreSQL, reducing MVP development time to under 2 weeks.',
                  'Designed and developed the React web application in 1 day.',
                  'Configured and deployed to Kubernetes clusters, DNS, SSL, and CI/CD pipelines coupled with Github Actions, cutting operation costs to less than $80/month.',
                ] } />
            </Section>
          </StyledSectionContainer>
        </StyledRightColumn>
      </StyledContainer>
    </Stack>
  );
};

export default Index;
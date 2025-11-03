import React from 'react';

import {
  mdiApple,
  mdiBriefcase,
  mdiCalendar,
  mdiEmail,
  mdiFileDocument,
  mdiGithub,
  mdiPhone,
  mdiPin,
} from '@mdi/js';
import { format, intervalToDuration } from 'date-fns';
import pluralize from 'pluralize';
import { usePDF } from 'react-to-pdf';
import styled from 'styled-components';

import {
  Anchor,
  LinkAnchor,
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
  width: 1000px;
  margin: auto;
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
  flex: 1;
`;

const StyledParagraph = styled.li`
  list-style: none;
`;

type Company = {
  name: string;
  href?: string;
};

type WorkType = 'Contract' | 'Full-Time' | 'Internship' | 'Part-Time';

type WorkExperienceProps = React.PropsWithChildren<{
  company: Company | string;
  title: React.ReactNode;
  type?: WorkType;
  startDate?: Date;
  endDate?: Date;
  releaseDate?: Date;
  location: React.ReactNode;
  achievements: React.ReactNode[];
}>;

const WorkExperience = ({
  company,
  title,
  type,
  startDate,
  endDate,
  releaseDate,
  location,
  achievements,
}: WorkExperienceProps) => {
  const duration = startDate ? intervalToDuration({ end: endDate ?? new Date(), start: startDate }) : null;
  const timeInYears = duration ? `${duration.years} ${pluralize('yr', duration.years)}${duration.months ? ` ${duration.months} ${pluralize('mth', duration.months)}` : ''}` : '';
  return (
    <Section
      nested
      header={ title }
      subheader={ typeof company === 'string' ? company : (<LinkAnchor href={ company.href } target="_blank">{ company.name }</LinkAnchor>) }>
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
        {type && (
          <Anchor icon={ type === 'Full-Time' ? mdiBriefcase : type === 'Contract' ? mdiFileDocument : undefined }>
            {type}
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
    filename: `Morgan, Thomas - Resume - ${new Date().getFullYear()}.pdf`,
    method: 'save',
    resolution: 1,
  });
  return (
    <Stack>
      <StyledButton onClick={ () => toPDF() }>
        Download PDF
      </StyledButton>
      <StyledContainer
        ref={ targetRef }
        style={ {
          alignItems: 'center', backgroundColor: 'white', border: '1px solid black', width: 'calc(height * (8.5 / 11))',
        } }>
        <StyledLeftColumn>
          <StyledHeader>
            <StyledHeaderName>Thom Morgan</StyledHeaderName>
            <StyledHeaderTitle>
              AI Systems Penetration Tester &amp;
              Secure Full Stack Engineer
            </StyledHeaderTitle>
            <StyledHeaderContent>
              <LinkAnchor
                href="mailto:thom@noodleofdeath.com"
                target="_blank"
                icon={ mdiEmail }
                color='cyan'>
                thom@noodleofdeath.com
              </LinkAnchor>
              <LinkAnchor
                href="tel:17032155735"
                target="_blank"
                icon={ mdiPhone }
                color='cyan'>
                (703) 215-5735
              </LinkAnchor>
              <Anchor icon={ mdiPin } color='white'>
                Everett, MA
              </Anchor>
              <LinkAnchor
                href="https://www.github.com/noodleofdeath"
                target="_blank"
                icon={ mdiGithub }
                color='cyan'>
                www.github.com/noodleofdeath
              </LinkAnchor>
            </StyledHeaderContent>
          </StyledHeader>
          <StyledSectionContainer>
            <Section
              header="Education"
              subheader={ (
                <Stack>
                  <StyledSubheader>Bachelor of Science</StyledSubheader>
                  <StyledSubheader>Majors: Computer Science &amp; Mathematics</StyledSubheader>
                </Stack>
              ) } />
            <Section header="Skills" gap="1.5rem">
              <Section nested header="Methodologies">
                AGILE; Kanban; Waterfall;
              </Section>
              <Section nested header="Favorite Languages">
                JavaScript; Python; 
                <strong>TypeScript;</strong>
              </Section>
              <Section nested header="All Languages">
                C; C++; CSS; Go; HTML; Java; JavaScript;
                Python; R; Ruby; Rust; SCSS; Shell; SQL;
                TypeScript;
              </Section>
              <Section nested header="Libraries, Frameworks, and Platforms">
                Docker; Express; FastAPI; GraphQL; gRPC;
                Jest; Next.js; Node.js; Pandas;
                Playwright; PyTorch; React.js; React Native;
                REST APIs; Selenium; TensorFlow;
              </Section>
              <Section nested header="CI/CD, DevOps, and Cloud">
                AWS; Azure; Blue Ocean; BuildKite; CircleCI;
                Datadog; DigitalOcean; Helm;
                GitHub Actions; GitLab Webhooks;
                Google Cloud Services; Jenkins;
                Kubernetes; Terraform;
              </Section>
              <Section nested header="Developer Tools">
                Git; GitHub; npm; pnpm;
                VS Code; Yarn;
              </Section>
              <Section nested header="Robotics Simulation">
                Gazebo; MuJoCo;
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
              <StyledParagraph>Security-minded Full Stack and AI Systems Engineer with 12+ years of experience designing and automating adversarial test harnesses for robotics, embedded systems, and LLM-integrated applications. Expert in secure CI/CD pipelines, red teaming, and AI evaluation frameworks that identify brittleness, drift, and catastrophic forgetting before deployment. Combines deep software engineering expertise with offensive security certification (OSCP) and ML fluency to ensure safety, reproducibility, and compliance across large-scale intelligent systems.</StyledParagraph>
            </Section>
            <Section header="Work Experience" gap="1.25rem">
              <WorkExperience
                title="AI Systems Penetration Tester &amp; Senior Secure Full Stack Engineer"
                company={ {
                  href: 'https://www.bostondynamics.com',
                  name: 'Boston Dynamics',
                } }
                type="Full-Time"
                startDate={ new Date('2022-06-15') }
                location="Waltham, MA (Hybrid)"
                achievements={ [
                  'Designed a secure test harness integrating simulated robotics environments (Gazebo, MuJoCo) with CI/CD pipelines (Jenkins, Buildkite) to automatically probe system regressions, safety violations, and catastrophic forgetting in AI subsystems.',
                  'Performed adversarial red teaming of robotic vision and navigation models, identifying potential failure modes in perception pipelines prior to field deployment. Implemented full-stack telemetry, logging, and anomaly detection to support incident response and drift monitoring across production firmware and AI models.',
                  'Rearchitected and fine-tuned various perception AI models used by Spot and Atlas for path expansion, object detection, and obstacle avoidance.',
                ] } />
              <WorkExperience
                title="Senior Secure Full Stack Engineer &amp; Data Scientist"
                company={ {
                  href: 'https://www.absci.com',
                  name: 'Absci Corp',
                } }
                type="Contract"
                startDate={ new Date('2020-06-15') }
                endDate={ new Date('2022-06-15') }
                location="Oregon, WA (Remote)"
                achievements={ [
                  'Built GAN-based DNA sequence generators and automated evaluation scripts to test for convergence and outlier drift in model-generated biomarker sequences.',
                  'Integrated data quality scoring and statistical validation pipelines to ensure reproducible outputs and detect overfitting or catastrophic forgetting in deployed models.',
                  'Delivered full-stack tools accelerating lab throughput by 50%, automating submission, sequencing, and analysis with real-time risk dashboards for scientists.',
                ] } />
              <WorkExperience
                title="AI Systems Penetration Tester &amp; Senior Secure Full Stack Engineer"
                company={ {
                  href: 'https://www.saic.com/',
                  name: 'Unisys Federal SAIC',
                } }
                type="Full-Time"
                startDate={ new Date('2016-05-15') }
                endDate={ new Date('2020-06-15') }
                location="Alexandria, VA"
                achievements={ [
                  'Implemented AI evaluation frameworks to harden software used to process sensitive PII for identifying wanted individuals both from being circumvented while also guaranteeing compliance with data privacy regulations.',
                  'Re-engineered mobile field applications used by U.S. Customs & Border Protection with an emphasis on security, reliability, and low-latency data validation.',
                  'Integrated automated regression testing and code-coverage analytics into existing CI/CD pipelines, cutting build and deployment costs by nearly 50%.',
                ] } />
            </Section>
            <Section header="Open Source Highlights" gap="1.5rem">
              <WorkExperience
                title="Contributor"
                company=""
                location={ (
                  <Stack row gap="1rem">
                    <LinkAnchor
                      href="https://github.com/NoodleOfDeath/react-native-screen-time-api"
                      target="_blank"
                      icon={ mdiGithub }>
                      react-native-screen-time-api
                    </LinkAnchor>
                    <LinkAnchor
                      href="https://github.com/NoodleOfDeath/readless"
                      target="_blank"
                      icon={ mdiGithub }>
                      readless
                    </LinkAnchor>
                    <LinkAnchor
                      href="https://github.com/rapid7/metasploit-framework"
                      target="_blank"
                      icon={ mdiGithub }>
                      metasploit-framework
                    </LinkAnchor>
                  </Stack>
                ) }
                achievements={ [
                  'Built and published an open-source TypeScript/React Native library providing native iOS Screen Time API integration, enabling developers to implement programmatic usage controls and digital wellbeing features in their applications.',
                  'Designed the library architecture to bridge native iOS APIs with cross-platform JavaScript, handling complex async operations, permission flows, and real-time monitoring capabilities.',
                  'Contributed security testing modules and exploit payloads to the Rapid7 Metasploit Framework, supporting offensive security research and penetration testing workflows.',
                ] } />
            </Section>
          </StyledSectionContainer>
        </StyledRightColumn>
      </StyledContainer>
    </Stack>
  );
};

export default Index;
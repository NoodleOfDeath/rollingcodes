import React from 'react';

import styled from 'styled-components';

import { ResumeEducation } from './ResumeEducation';
import { ResumeSkills } from './ResumeSkills';
import { WorkExperienceItem } from './WorkExperienceItem';
import { ResumeStylePreset } from './types';

import { Section } from '~/components';
import { useResumeContext } from '~/contexts/ResumeContext';

const StyledContainer = styled.div<{ $preset: any; $pageCount: number }>`
  position: relative;
  background: ${(props) => props.$preset.colors.background};
  color: ${(props) => props.$preset.colors.text};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: min(100vw - 4rem, 850px);
  font-family: ${(props) => props.$preset.typography.fontFamily};
  font-size: ${(props) => props.$preset.typography.baseFontSize};
  line-height: ${(props) => props.$preset.typography.lineHeight};

  ${(props) => props.$preset.styles?.container || ''}

  @media print {
    width: 8.5in;
    height: 11in;
    margin: 0;
    box-shadow: none;
    font-size: 10pt;
  }
`;

const StyledLeftColumn = styled.div<{ $preset: any }>`
  flex: ${(props) => (props.$preset.layout === 'sidebar' ? 1 : props.$preset.layout === 'two-column' ? 1 : 0)};
  display: ${(props) => (props.$preset.layout === 'single-column' ? 'none' : 'flex')};
  flex-direction: column;
`;

const StyledRightColumn = styled.div<{ $preset: any }>`
  flex: ${(props) => (props.$preset.layout === 'sidebar' ? 2 : props.$preset.layout === 'two-column' ? 2 : 1)};
  display: flex;
  flex-direction: column;
  padding-left: ${(props) => (props.$preset.layout === 'single-column' ? 0 : '1rem')};
`;

const StyledSectionContainer = styled.div<{ $preset: any }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.$preset.spacing.sectionGap};
  padding: ${(props) => props.$preset.spacing.padding};
  flex: 1;
  overflow: hidden;
`;

const StyledParagraph = styled.div`
  margin: 0;
  padding: 0;
`;

const StyledHeader = styled.header<{ $preset: any }>`
  background: ${(props) => props.$preset.colors.headerBackground};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: ${(props) => props.$preset.colors.headerText};
  padding: ${(props) => props.$preset.spacing.padding};

  ${(props) => props.$preset.styles?.header || ''}
`;

const StyledHeaderName = styled.div<{ $preset: any }>`
  font-size: ${(props) => props.$preset.typography.headerFontSize};
  font-weight: bold;
`;

const StyledHeaderTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const StyledContentWrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const StyledBodyWrapper = styled.div<{ $preset: any }>`
  display: flex;
  flex-direction: ${(props) => (props.$preset.layout === 'single-column' ? 'column' : 'row')};
  flex: 1;
  overflow: hidden;
`;

const StyledPageIndicator = styled.div<{ $page: number; $pageHeight: number }>`
  position: absolute;
  /* Calculate position as percentage of total container height */
  top: ${(props) => `${(props.$page * props.$pageHeight)}px`};
  margin-top: 105px; /* Adjust for visual offset */
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg,
    transparent 0%,
    #ff5252 10%,
    #ff5252 90%,
    transparent 100%
  );
  z-index: 1000;
  pointer-events: none;

  &::before {
    content: 'Page ${(props) => props.$page + 1}';
    position: absolute;
    right: 10px;
    top: -20px;
    background: #ff5252;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: bold;
    font-family: system-ui, -apple-system, sans-serif;
  }

  @media print {
    display: none !important;
    visibility: hidden !important;
  }
`;

export type ResumeRendererProps = {
  targetRef?: React.RefObject<HTMLDivElement>;
  presetStyleOverride?: ResumeStylePreset;
};

export const ResumeRenderer = ({ targetRef, presetStyleOverride }: ResumeRendererProps) => {
  const { config, isDownloading } = useResumeContext();
  const { data, preset: _preset } = config;

  const [preset, setPreset] = React.useState<ResumeStylePreset>(presetStyleOverride || _preset);
  const [dimensions, setDimensions] = React.useState({ height: 0, width: 0 });

  // Use ResizeObserver to track actual dimension changes
  React.useEffect(() => {
    if (!targetRef?.current) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ height, width });
      }
    });
    resizeObserver.observe(targetRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [targetRef]);

  const resumeHeight = dimensions.height;
  const pageWidth = dimensions.width;
  const pageHeight = React.useMemo(() => resumeHeight > 0 && pageWidth > 0 ? (11 * pageWidth / 8.5) : 0, [resumeHeight, pageWidth]);

  const pageCount = React.useMemo(() => {
    return resumeHeight > 0 && pageHeight > 0 ? Math.ceil(resumeHeight / pageHeight) : 1;
  }, [resumeHeight, pageHeight]);

  React.useEffect(() => {
    setPreset(presetStyleOverride || _preset);
    console.log(resumeHeight, pageHeight, pageCount);
  }, [presetStyleOverride, _preset, pageCount, resumeHeight, pageHeight]);

  const renderSection = React.useCallback((sectionKey: string) => {
    switch (sectionKey) {
    case 'header':
      return (
        <StyledHeader key="header" $preset={ preset }>
          <StyledHeaderName $preset={ preset }>{data.contact.name}</StyledHeaderName>
          <StyledHeaderTitle>{data.contact.title}</StyledHeaderTitle>
          <div style={ {
            display: 'flex', flexWrap: 'wrap', fontSize: '0.9rem', gap: '0.5rem', 
          } }>
            <div>{data.contact.email}</div>
            <div>|</div>
            <div>{data.contact.phone}</div>
            <div>|</div>
            <div>{data.contact.location}</div>
          </div>
        </StyledHeader>
      );
    case 'summary':
      return preset.sections.visible.summary ? (
        <Section key="summary" header="Summary">
          <StyledParagraph>{data.summary}</StyledParagraph>
        </Section>
      ) : null;
    case 'skills':
      return preset.sections.visible.skills ? (
        <ResumeSkills key="skills" skills={ data.skills } />
      ) : null;
    case 'experience':
      return (
        <Section key="experience" header="Work Experience" gap={ preset.spacing.itemGap }>
          {data.workExperience.map((experience, index) => (
            <WorkExperienceItem key={ index } experience={ experience } />
          ))}
        </Section>
      );
    case 'education':
      return preset.sections.visible.education ? (
        <ResumeEducation key="education" education={ data.education } />
      ) : null;
    case 'projects':
      return preset.sections.visible.projects && data.projects.length > 0 ? (
        <Section key="projects" header="Projects" gap={ preset.spacing.itemGap }>
          {data.projects.map((project, index) => (
            <WorkExperienceItem key={ index } experience={ project } />
          ))}
        </Section>
      ) : null;
    default:
      return null;
    }
  }, [data, preset]);

  const renderLayout = React.useCallback(() => {
    if (preset.layout === 'single-column') {
      return (
        <StyledSectionContainer $preset={ preset }>
          {preset.sections.order.map((section) => renderSection(section))}
        </StyledSectionContainer>
      );
    }

    // Two-column or sidebar layout
    const headerSection = renderSection('header');
    const leftSections = ['skills', 'education'];
    const rightSections = ['summary', 'experience', 'projects'];

    return (
      <React.Fragment>
        {headerSection}
        <StyledBodyWrapper $preset={ preset }>
          <StyledLeftColumn $preset={ preset }>
            <StyledSectionContainer $preset={ preset }>
              {preset.sections.order
                .filter((s) => leftSections.includes(s))
                .map((section) => renderSection(section))}
            </StyledSectionContainer>
          </StyledLeftColumn>
          <StyledRightColumn $preset={ preset }>
            <StyledSectionContainer $preset={ preset }>
              {preset.sections.order
                .filter((s) => rightSections.includes(s))
                .map((section) => renderSection(section))}
            </StyledSectionContainer>
          </StyledRightColumn>
        </StyledBodyWrapper>
      </React.Fragment>
    );
  }, [preset, renderSection]);

  // Generate page indicators for multi-page resumes
  const pageIndicators = React.useMemo(() => {
    const indicators = [];
    for (let i = 1; i < pageCount; i++) {
      indicators.push(
        <StyledPageIndicator
          key={ `page-${i}` }
          $page={ i }
          $pageHeight={ pageHeight } />
      );
    }
    return indicators;
  }, [pageCount, pageHeight]);

  return (
    <StyledContainer ref={ targetRef } $preset={ preset } $pageCount={ pageCount }>
      <StyledContentWrapper>
        {renderLayout()}
      </StyledContentWrapper>
      {!isDownloading && pageIndicators.length > 0 && pageIndicators }
    </StyledContainer>
  );
};

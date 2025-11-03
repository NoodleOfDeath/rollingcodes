import React from 'react';

import {
  mdiApple,
  mdiBriefcase,
  mdiCalendar,
  mdiFileDocument,
  mdiPin,
} from '@mdi/js';
import { format, intervalToDuration } from 'date-fns';
import pluralize from 'pluralize';

import { Anchor, LinkAnchor, Section, Stack } from '~/components';
import { Company, WorkExperience } from '~/data/resume';

export type WorkExperienceItemProps = {
  experience: WorkExperience;
};

export const WorkExperienceItem = ({ experience }: WorkExperienceItemProps) => {
  const {
    achievements,
    company,
    endDate,
    location,
    releaseDate,
    startDate,
    title,
    type,
  } = experience;

  const duration = startDate
    ? intervalToDuration({ end: endDate ?? new Date(), start: startDate })
    : null;
  const timeInYears = duration
    ? `${duration.years} ${pluralize('yr', duration.years)}${
        duration.months ? ` ${duration.months} ${pluralize('mth', duration.months)}` : ''
      }`
    : '';

  const companyNode = typeof company === 'string'
    ? company
    : (
      <LinkAnchor href={ company.href } target="_blank">
        {company.name}
      </LinkAnchor>
    );

  return (
    <Section
      nested
      header={ title }
      subheader={ companyNode }>
      <Stack row gap="1rem">
        {startDate != null && (
          <Anchor icon={ mdiCalendar }>
            {`${format(startDate, 'MMM yyyy')} - ${
              endDate ? format(endDate, 'MMM yyyy') : 'present'
            } (${timeInYears})`}
          </Anchor>
        )}
        {releaseDate != null && (
          <Anchor icon={ mdiApple }>
            {['Released on', format(releaseDate, 'MMM d, yyyy')].join(' ')}
          </Anchor>
        )}
        {type && (
          <Anchor
            icon={
              type === 'Full-Time'
                ? mdiBriefcase
                : type === 'Contract'
                  ? mdiFileDocument
                  : undefined
            }>
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

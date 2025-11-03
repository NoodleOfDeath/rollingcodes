import React from 'react';

import {
  mdiEmail,
  mdiGithub,
  mdiPhone,
  mdiPin,
  mdiWeb,
} from '@mdi/js';
import styled from 'styled-components';

import { Anchor, LinkAnchor } from '~/components';
import { ContactInfo } from '~/data/resume';

const StyledHeader = styled.header`
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: white;
  padding: 1rem;
  line-height: 1.2;
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

export type ResumeHeaderProps = {
  contact: ContactInfo;
};

export const ResumeHeader = ({ contact }: ResumeHeaderProps) => {
  return (
    <StyledHeader>
      <StyledHeaderName>{contact.name}</StyledHeaderName>
      <StyledHeaderTitle>{contact.title}</StyledHeaderTitle>
      <StyledHeaderContent>
        <LinkAnchor
          href={ `mailto:${contact.email}` }
          target="_blank"
          icon={ mdiEmail }
          color='cyan'>
          {contact.email}
        </LinkAnchor>
        {typeof contact.phone === 'string' ? (
          <LinkAnchor
            href={ `tel:${contact.phone.replace(/[^0-9]/g, '')}` }
            target="_blank"
            icon={ mdiPhone }
            color='cyan'>
            {contact.phone}
          </LinkAnchor>
        ) : contact.phone}
        <Anchor icon={ mdiPin } color='white'>
          {contact.location}
        </Anchor>
        {contact.github && (
          typeof contact.github === 'string' ? (
            <LinkAnchor
              href={ contact.github }
              target="_blank"
              icon={ mdiGithub }
              color='cyan'>
              {contact.github.replace('https://', '')}
            </LinkAnchor>
          ) : contact.github
        )}
        {contact.website && (
          typeof contact.website === 'string' ? (
            <LinkAnchor
              href={ contact.website }
              target="_blank"
              icon={ mdiWeb }
              color='cyan'>
              {contact.website.replace('https://', '')}
            </LinkAnchor>
          ) : contact.website
        )}
      </StyledHeaderContent>
    </StyledHeader>
  );
};

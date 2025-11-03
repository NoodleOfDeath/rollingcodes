'use client';

import React from 'react';

import {
  mdiGithub,
  mdiLinkedin,
  mdiStackOverflow,
  mdiTwitter,
  mdiWeb,
} from '@mdi/js';
import { Icon } from '@mdi/react';
import {
  Box,
  ClickAwayListener,
  IconButton,
  Paper,
  Popper,
  Typography,
} from '@mui/material';

type AuthorSocials = {
  github?: string;
  linkedin?: string;
  stackoverflow?: string;
  twitter?: string;
  website?: string;
};

type AuthorTooltipProps = {
  author: string;
  bio?: string;
  socials?: AuthorSocials;
  timeout?: number;
};

const SOCIAL_ICONS: Record<keyof AuthorSocials, string> = {
  github: mdiGithub,
  linkedin: mdiLinkedin,
  stackoverflow: mdiStackOverflow,
  twitter: mdiTwitter,
  website: mdiWeb,
};

export const AuthorTooltip: React.FC<AuthorTooltipProps> = ({
  author,
  bio,
  socials,
  timeout = 2_000,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleMouseLeave = React.useCallback(() => {
    // Auto-dismiss after 5 seconds
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
      setAnchorEl(null);
    }, timeout);
  }, [timeout]);

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpen(false);
    setAnchorEl(null);
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const hasSocials = socials && Object.keys(socials).length > 0;

  return (
    <React.Fragment>
      <Typography
        component="span"
        variant="body2"
        color="text.secondary"
        onMouseEnter={ handleMouseEnter }
        onMouseLeave={ handleMouseLeave }
        sx={ {
          '&:hover': {
            color: 'primary.main',
            cursor: 'pointer',
            textDecoration: 'underline',
          },
          transition: 'all 0.2s',
        } }>
        {author}
      </Typography>

      <Popper
        open={ open }
        anchorEl={ anchorEl }
        placement="top"
        sx={ { zIndex: 1300 } }
        modifiers={ [
          {
            name: 'offset',
            options: { offset: [0, 8] },
          },
        ] }>
        <ClickAwayListener onClickAway={ handleClose }>
          <Paper
            onMouseEnter={ () => {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
              }
            } }
            onMouseLeave={ handleMouseLeave }
            sx={ {
              bgcolor: 'background.paper',
              border: '1px solid rgba(0, 217, 255, 0.3)',
              borderRadius: 2,
              boxShadow: '0 8px 24px rgba(0, 217, 255, 0.2)',
              maxWidth: 300,
              p: 2,
            } }>
            <Typography
              variant="subtitle1"
              sx={ {
                color: 'primary.main',
                fontWeight: 600,
                mb: 1,
              } }>
              {author}
            </Typography>

            {bio && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={ {
                  lineHeight: 1.6,
                  mb: hasSocials ? 2 : 0,
                } }>
                {bio}
              </Typography>
            )}

            {hasSocials && (
              <Box sx={ { display: 'flex', gap: 1 } }>
                {Object.entries(socials).map(([platform, url]) => (
                  <IconButton
                    key={ platform }
                    component="a"
                    href={ url }
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    sx={ {
                      '&:hover': {
                        bgcolor: 'rgba(0, 217, 255, 0.1)',
                        color: 'primary.main',
                      },
                      color: 'text.secondary',
                    } }>
                    <Icon
                      path={ SOCIAL_ICONS[platform as keyof AuthorSocials] }
                      size={ 0.8 } />
                  </IconButton>
                ))}
              </Box>
            )}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </React.Fragment>
  );
};

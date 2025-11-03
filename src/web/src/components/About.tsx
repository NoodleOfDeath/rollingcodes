import React from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Description as ResumeIcon,
  Pets as PetsIcon,
  LocalBar as DrunkModeIcon,
} from '@mui/icons-material';
import Link from 'next/link';

export const About = () => {
  return (
    <Card
      sx={ {
        position: 'sticky',
        top: 20,
      } }>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={ { fontWeight: 700 } }>
          About Me
        </Typography>

        <Divider sx={ { mb: 2 } } />

        <Typography variant="body2" color="text.secondary" paragraph>
          Hi! I'm <strong>Thom Morgan</strong>, a Security-minded Full Stack and AI Systems Engineer with 12+ years of experience.
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph>
          Currently working at <strong>Boston Dynamics</strong> as an AI Systems Penetration Tester & Senior Secure Full Stack Engineer, where I design adversarial test harnesses for robotics and AI systems.
        </Typography>

        <Stack spacing={ 1.5 } sx={ { mb: 2 } }>
          <Box>
            <Chip
              icon={ <LinkedInIcon />}
              label="OSCP Certified"
              size="small"
              sx={ { mr: 1, mb: 1 } } />
            <Chip
              label="AWS Certified"
              size="small"
              sx={ { mr: 1, mb: 1 } } />
            <Chip
              label="PSM I"
              size="small"
              sx={ { mb: 1 } } />
          </Box>
        </Stack>

        <Divider sx={ { my: 2 } } />

        <Typography variant="subtitle2" gutterBottom sx={ { fontWeight: 600 } }>
          Quick Links
        </Typography>

        <Stack spacing={ 1 } sx={ { mt: 1.5 } }>
          <Button
            component={ Link }
            href="/resume"
            startIcon={ <ResumeIcon /> }
            variant="outlined"
            size="small"
            fullWidth
            sx={ { justifyContent: 'flex-start' } }>
            View Resume
          </Button>

          <Button
            component="a"
            href="https://github.com/noodleofdeath"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={ <GitHubIcon /> }
            variant="outlined"
            size="small"
            fullWidth
            sx={ { justifyContent: 'flex-start' } }>
            GitHub Projects
          </Button>

          <Button
            component="a"
            href="https://drunkmode.app"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={ <DrunkModeIcon /> }
            variant="outlined"
            size="small"
            fullWidth
            sx={ { justifyContent: 'flex-start' } }>
            Drunk Mode App
          </Button>

          <Button
            component="a"
            href="https://instagram.com/houdinithepomsky"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={ <PetsIcon /> }
            variant="outlined"
            size="small"
            fullWidth
            sx={ { justifyContent: 'flex-start' } }>
            Houdini the Pomsky
          </Button>
        </Stack>

        <Divider sx={ { my: 2 } } />

        <Typography variant="caption" color="text.secondary">
          Open source contributor • React Native enthusiast • Dog dad
        </Typography>

        <Box sx={ { mt: 2, textAlign: 'center' } }>
          <Button
            component={ Link }
            href="/about"
            variant="text"
            size="small"
            color="primary">
            Learn More About Me →
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

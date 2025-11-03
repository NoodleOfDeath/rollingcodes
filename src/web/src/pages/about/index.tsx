import React from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
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
  Security as SecurityIcon,
  Code as CodeIcon,
  SmartToy as RobotIcon,
} from '@mui/icons-material';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const About: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>About Me - Thom Morgan | Rolling Codes</title>
        <meta
          name="description"
          content="Learn about Thom Morgan, AI Systems Penetration Tester and Senior Secure Full Stack Engineer at Boston Dynamics" />
      </Head>
      <Box
        sx={ {
          bgcolor: 'background.default',
          minHeight: '100vh',
          py: 8,
        } }>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={ { mb: 6, textAlign: 'center' } }>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={ {
                color: 'primary.main',
                fontWeight: 700,
                mb: 2,
              } }>
              About Me
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Thom Morgan - AI Systems Penetration Tester & Secure Full Stack Engineer
            </Typography>
          </Box>

          <Grid container spacing={ 4 }>
            {/* Main Content */}
            <Grid item xs={ 12 } md={ 8 }>
              {/* Introduction */}
              <Card sx={ { mb: 4 } }>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={ { fontWeight: 600, mb: 2 } }>
                    👋 Hi, I'm Thom
                  </Typography>
                  <Typography variant="body1" paragraph color="text.secondary">
                    I'm a security-minded Full Stack and AI Systems Engineer with over 12 years of
                    professional experience. I specialize in designing and automating adversarial
                    test harnesses for robotics, embedded systems, and LLM-integrated applications.
                  </Typography>
                  <Typography variant="body1" paragraph color="text.secondary">
                    Currently, I work at <strong>Boston Dynamics</strong>, where I combine my
                    expertise in secure CI/CD pipelines, red teaming, and AI evaluation frameworks
                    to identify brittleness, drift, and catastrophic forgetting before deployment.
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    I hold an OSCP certification (Offensive Security Certified Professional) and
                    have deep ML fluency, which allows me to ensure safety, reproducibility, and
                    compliance across large-scale intelligent systems.
                  </Typography>
                </CardContent>
              </Card>

              {/* Experience Highlights */}
              <Card sx={ { mb: 4 } }>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={ { fontWeight: 600, mb: 3 } }>
                    <RobotIcon sx={ { mr: 1, verticalAlign: 'middle' } } />
                    What I Do
                  </Typography>
                  <Stack spacing={ 3 }>
                    <Box>
                      <Typography variant="h6" gutterBottom sx={ { fontWeight: 600 } }>
                        <SecurityIcon sx={ { fontSize: 20, mr: 1, verticalAlign: 'middle' } } />
                        AI Systems Security & Red Teaming
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        I design secure test harnesses that integrate simulated robotics environments
                        (Gazebo, MuJoCo) with CI/CD pipelines to automatically probe system regressions,
                        safety violations, and catastrophic forgetting in AI subsystems.
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="h6" gutterBottom sx={ { fontWeight: 600 } }>
                        <CodeIcon sx={ { fontSize: 20, mr: 1, verticalAlign: 'middle' } } />
                        Full Stack Development
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        From React and TypeScript frontends to Python and Node.js backends, I build
                        end-to-end solutions with a focus on security, scalability, and performance.
                        I've rearchitected web and mobile applications that serve thousands of users.
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="h6" gutterBottom sx={ { fontWeight: 600 } }>
                        🤖 Robotics & AI Models
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        I perform adversarial red teaming of robotic vision and navigation models,
                        identifying potential failure modes in perception pipelines. I've rearchitected
                        and fine-tuned perception AI models used by Spot and Atlas robots.
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Projects */}
              <Card sx={ { mb: 4 } }>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={ { fontWeight: 600, mb: 3 } }>
                    🚀 Notable Projects
                  </Typography>
                  <Stack spacing={ 3 }>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        <DrunkModeIcon sx={ { fontSize: 20, mr: 1, verticalAlign: 'middle' } } />
                        Drunk Mode
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Creator of the Drunk Mode app - an iOS application that helps users prevent
                        themselves from drunk texting or using other apps irresponsibly. The app
                        features Screen Time API integration and puzzle-based deactivation.
                      </Typography>
                      <Button
                        component="a"
                        href="https://drunkmode.app"
                        target="_blank"
                        variant="outlined"
                        size="small"
                        startIcon={ <DrunkModeIcon /> }>
                        Visit drunkmode.app
                      </Button>
                    </Box>

                    <Divider />

                    <Box>
                      <Typography variant="h6" gutterBottom>
                        📱 React Native Libraries
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        I've created and contributed to numerous open source React Native libraries,
                        including react-native-screen-time-api which provides native iOS Screen Time
                        API integration for cross-platform applications.
                      </Typography>
                      <Button
                        component="a"
                        href="https://github.com/noodleofdeath"
                        target="_blank"
                        variant="outlined"
                        size="small"
                        startIcon={ <GitHubIcon /> }>
                        View on GitHub
                      </Button>
                    </Box>

                    <Divider />

                    <Box>
                      <Typography variant="h6" gutterBottom>
                        🛡️ Security Research
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        I contribute security testing modules and exploit payloads to the Metasploit
                        Framework, supporting offensive security research and penetration testing
                        workflows.
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Personal */}
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={ { fontWeight: 600, mb: 2 } }>
                    🐾 Beyond Code
                  </Typography>
                  <Typography variant="body1" paragraph color="text.secondary">
                    When I'm not breaking AI systems or building software, you can find me hanging out
                    with my dog <strong>Houdini</strong>, an adorable Pomsky (Pomeranian-Husky mix)
                    who has his own Instagram following!
                  </Typography>
                  <Button
                    component="a"
                    href="https://instagram.com/houdinithepomsky"
                    target="_blank"
                    variant="outlined"
                    size="small"
                    startIcon={ <InstagramIcon /> }>
                    Follow @houdinithepomsky
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={ 12 } md={ 4 }>
              {/* Quick Facts */}
              <Card sx={ { mb: 4 } }>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={ { fontWeight: 600 } }>
                    Quick Facts
                  </Typography>
                  <Divider sx={ { mb: 2 } } />
                  <Stack spacing={ 2 }>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        LOCATION
                      </Typography>
                      <Typography variant="body2">Everett, MA</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        CURRENT ROLE
                      </Typography>
                      <Typography variant="body2">
                        AI Systems Penetration Tester at Boston Dynamics
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        EXPERIENCE
                      </Typography>
                      <Typography variant="body2">12+ years</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        EDUCATION
                      </Typography>
                      <Typography variant="body2">
                        B.S. Computer Science & Mathematics
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card sx={ { mb: 4 } }>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={ { fontWeight: 600 } }>
                    Certifications
                  </Typography>
                  <Divider sx={ { mb: 2 } } />
                  <Stack spacing={ 1 }>
                    <Chip
                      label="OSCP - Offensive Security Certified Professional"
                      size="small"
                      sx={ { justifyContent: 'flex-start' } } />
                    <Chip
                      label="AWS Developer Certified"
                      size="small"
                      sx={ { justifyContent: 'flex-start' } } />
                    <Chip
                      label="PSM I - Professional Scrum Master"
                      size="small"
                      sx={ { justifyContent: 'flex-start' } } />
                  </Stack>
                </CardContent>
              </Card>

              {/* Links */}
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={ { fontWeight: 600 } }>
                    Connect
                  </Typography>
                  <Divider sx={ { mb: 2 } } />
                  <Stack spacing={ 1.5 }>
                    <Button
                      component={ Link }
                      href="/resume"
                      startIcon={ <ResumeIcon /> }
                      variant="outlined"
                      fullWidth
                      sx={ { justifyContent: 'flex-start' } }>
                      View Resume
                    </Button>
                    <Button
                      component="a"
                      href="https://github.com/noodleofdeath"
                      target="_blank"
                      startIcon={ <GitHubIcon /> }
                      variant="outlined"
                      fullWidth
                      sx={ { justifyContent: 'flex-start' } }>
                      GitHub
                    </Button>
                    <Button
                      component="a"
                      href="mailto:thom@noodleofdeath.com"
                      variant="outlined"
                      fullWidth
                      sx={ { justifyContent: 'flex-start' } }>
                      Email Me
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default About;

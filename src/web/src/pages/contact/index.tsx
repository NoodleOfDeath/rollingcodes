import React from 'react';

import {
  Email,
  GitHub,
  LinkedIn,
  Phone,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';

const ContactPage = () => {
  const contactMethods = [
    {
      icon: <Email sx={ { fontSize: 40 } } />,
      label: 'Email',
      link: 'mailto:thom@noodleofdeath.com',
      value: 'thom@noodleofdeath.com',
    },
    {
      icon: <Phone sx={ { fontSize: 40 } } />,
      label: 'Phone',
      link: 'tel:+17032155735',
      value: '(703) 215-5735',
    },
    {
      icon: <GitHub sx={ { fontSize: 40 } } />,
      label: 'GitHub',
      link: 'https://github.com/noodleofdeath',
      value: '@noodleofdeath',
    },
    {
      icon: <LinkedIn sx={ { fontSize: 40 } } />,
      label: 'LinkedIn',
      link: 'https://www.linkedin.com/in/thom-morgan',
      value: 'Thom Morgan',
    },
  ];

  return (
    <Container maxWidth="lg" sx={ { py: 8 } }>
        <Box sx={ { mb: 6, textAlign: 'center' } }>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={ {
              color: 'primary.main',
              fontWeight: 700,
            } }>
            Contact Me
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={ { maxWidth: 800, mx: 'auto' } }>
            Let&apos;s connect! Feel free to reach out through any of the following channels.
          </Typography>
        </Box>

        <Grid container spacing={ 4 } sx={ { mb: 6 } }>
          {contactMethods.map((method) => (
            <Grid item xs={ 12 } sm={ 6 } md={ 3 } key={ method.label }>
              <Card
                sx={ {
                  '&:hover': {
                    border: '1px solid rgba(0, 217, 255, 0.3)',
                    boxShadow: '0 8px 24px rgba(0, 217, 255, 0.15)',
                    transform: 'translateY(-4px)',
                  },
                  border: '1px solid rgba(0, 217, 255, 0.1)',
                  borderRadius: 2,
                  height: '100%',
                  transition: 'all 0.3s ease',
                } }>
                <CardContent
                  sx={ {
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 4,
                    textAlign: 'center',
                  } }>
                  <Box sx={ { color: 'primary.main', mb: 2 } }>{method.icon}</Box>
                  <Typography variant="h6" gutterBottom sx={ { fontWeight: 600 } }>
                    {method.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={ { mb: 2, wordBreak: 'break-all' } }>
                    {method.value}
                  </Typography>
                  <Button
                    variant="outlined"
                    href={ method.link }
                    target={ method.link.startsWith('http') ? '_blank' : undefined }
                    rel={ method.link.startsWith('http') ? 'noopener noreferrer' : undefined }
                    sx={ {
                      '&:hover': { borderColor: 'primary.main' },
                      borderColor: 'rgba(0, 217, 255, 0.3)',
                    } }>
                    Connect
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card
          sx={ {
            bgcolor: 'rgba(0, 217, 255, 0.05)',
            border: '1px solid rgba(0, 217, 255, 0.2)',
            borderRadius: 2,
            mb: 4,
          } }>
          <CardContent sx={ { p: 4 } }>
            <Typography variant="h5" gutterBottom sx={ { color: 'primary.main', fontWeight: 600 } }>
              About My Work
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              I&apos;m a Red Team Operator & AI Systems Evaluator with expertise in web application
              pentesting and secure full stack engineering. I specialize in adversarial testing,
              LLM red teaming, and building robust security solutions.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Currently based in Everett, MA, I&apos;m available for consulting, collaboration, and
              exciting new opportunities in cybersecurity and AI systems.
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={ {
            bgcolor: 'rgba(255, 152, 0, 0.05)',
            border: '1px solid rgba(255, 152, 0, 0.3)',
            borderRadius: 2,
          } }>
          <CardContent sx={ { p: 4 } }>
            <Typography variant="h5" gutterBottom sx={ { color: 'warning.main', fontWeight: 600 } }>
              For Those Who Do Their Homework
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Standard channels above work fine. But if you&apos;ve actually explored this site and
              want to bypass the noise, there&apos;s a more direct line. Those who follow my work
              closely will know how to reach me.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={ { fontStyle: 'italic' } }>
              Hint: The details are scattered throughout the site. Pay attention.
            </Typography>
          </CardContent>
        </Card>
      </Container>
  );
};

export default ContactPage;

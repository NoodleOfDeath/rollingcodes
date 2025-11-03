import React, { useEffect, useState } from 'react';

import { mdiLightbulbOn } from '@mdi/js';
import Icon from '@mdi/react';
import {
  Close as CloseIcon,
  GetApp as DownloadIcon,
  Edit as EditIcon,
  Palette as PaletteIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Fade,
  IconButton,
  Stack as MuiStack,
  Popover,
  Typography,
} from '@mui/material';
import { Resolution, usePDF } from 'react-to-pdf';
import styled from 'styled-components';

import { LayoutSelector } from '~/components/Resume/LayoutSelector';
import { ResumeDataEditor } from '~/components/Resume/ResumeDataEditor';
import { ResumeRenderer } from '~/components/Resume/ResumeRenderer';
import { ResumeProvider, useResumeContext } from '~/contexts/ResumeContext';

const StyledPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const ResumePageContent = () => {
  const {
    config,
    setIsDownloading,
  } = useResumeContext();

  const [layoutSelectorOpen, setLayoutSelectorOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLButtonElement | null>(null);
  const [showPopover, setShowPopover] = useState(true);

  const editResumeRef = React.useRef<HTMLButtonElement>(null);

  const { toPDF, targetRef } = usePDF({
    filename: `${config.data.contact.name} - Resume - ${new Date().getFullYear()}.pdf`,
    method: 'save',
    resolution: Resolution.NORMAL,
  });

  // Show popover on first visit after a short delay
  useEffect(() => {
    const hasSeenPopover = localStorage.getItem('resumePopoverSeen');
    if (!hasSeenPopover) {
      // Delay showing the popover to give the page time to load
      const timer = setTimeout(() => {
        setShowPopover(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowPopover(false);
    }
  }, []);

  const handleLayoutClick = () => {
    setLayoutSelectorOpen(true);
    setPopoverAnchor(null);
    localStorage.setItem('resumePopoverSeen', 'true');
  };

  const handlePopoverClose = () => {
    setShowPopover(false);
    setPopoverAnchor(null);
    localStorage.setItem('resumePopoverSeen', 'true');
  };

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    toPDF();
    // Wait a moment for the PDF generation to start before resetting
    setTimeout(() => setIsDownloading(false), 5_000);
  };

  return (
    <React.Fragment>
      {/* Layout Selector Dialog */}
      <LayoutSelector
        open={ layoutSelectorOpen }
        onClose={ () => setLayoutSelectorOpen(false) } />

      {/* Resume Data Editor */}
      <ResumeDataEditor
        open={ editorOpen }
        onClose={ () => setEditorOpen(false) } />

      {/* Popover Tooltip */}
      <Popover
        anchorEl={ editResumeRef.current }
        anchorOrigin={ {
          horizontal: 'center',
          vertical: 'bottom',
        } }
        open={ Boolean(editResumeRef.current) && showPopover }
        transformOrigin={ {
          horizontal: 'center',
          vertical: 'top',
        } }
        onClose={ handlePopoverClose }
        sx={ { mt: 1 } }
        TransitionComponent={ Fade }>
        <Box sx={ {
          maxWidth: 400, p: 2, position: 'relative',
        } }>
          <IconButton
            onClick={ handlePopoverClose }
            size="small"
            aria-label="Close"
            sx={ {
              position: 'absolute',
              right: 4,
              top: 4,
            } }>
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Want your resume to look like this?</strong>
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={ {
              display: 'block', fontStyle: 'italic', mb: 1,
            } }>
            You can replace all of my resume information with yours to create your own.
          </Typography>
          <Typography
            variant="caption"
            color="primary"
            component="a"
            href="/prompts/2025-11-03.1231-resume-builder.md"
            target="_blank"
            sx={ {
              '&:hover': { textDecoration: 'underline' },
              cursor: 'pointer',
              display: 'block',
              fontWeight: 'bold',
              mt: 1.5,
              textDecoration: 'none',
            } }>
            <Box sx={ {
              alignItems: 'center', display: 'flex', flex: 1, gap: 1,
            } }>
              <Icon path={ mdiLightbulbOn } size={ 5 } />
              <div>Also, did you know it only took me 45 minutes to build this Resume Builder (and a little longer polishing it)? Click here to see the conversation and prompt I used with Claude Code!</div>
            </Box>
          </Typography>
        </Box>
      </Popover>

      {/* Main Content */}
      <Container maxWidth="xl" sx={ { py: 4 } }>
        <MuiStack spacing={ 3 }>
          {/* Control Bar - Employer View */}
          <Box
            sx={ {
              alignItems: 'center',
              display: 'flex',
              gap: 2,
              justifyContent: 'space-between',
            } }>
            <Box sx={ { display: 'flex', gap: 2 } }>
              <Button
                ref={ editResumeRef }
                variant="outlined"
                size="large"
                startIcon={ <EditIcon /> }
                onClick={ () => setEditorOpen(true) }
                sx={ { px: 3 } }>
                Edit Resume Info
              </Button>
              <Button
                id="layout-selector-button"
                variant="outlined"
                size="large"
                startIcon={ <PaletteIcon /> }
                onClick={ handleLayoutClick }
                sx={ {
                  '@keyframes pulse': {
                    '0%': { boxShadow: '0 0 0 0 rgba(25, 118, 210, 0.7)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(25, 118, 210, 0)' },
                    '50%': { boxShadow: '0 0 0 10px rgba(25, 118, 210, 0)' },
                  },
                  animation: popoverAnchor
                    ? 'pulse 1.5s ease-in-out infinite'
                    : 'none',
                  px: 4,
                } }>
                Choose a different layout
              </Button>
            </Box>

            <Button
              variant="contained"
              size="large"
              startIcon={ <DownloadIcon /> }
              onClick={ handleDownloadPDF }
              sx={ { px: 4 } }>
              Download PDF
            </Button>
          </Box>

          {/* Resume Preview - Clean Employer View */}
          <StyledPageWrapper>
            <ResumeRenderer targetRef={ targetRef } />
          </StyledPageWrapper>
        </MuiStack>
      </Container>
    </React.Fragment>
  );
};

const Index = () => {
  return (
    <ResumeProvider>
      <ResumePageContent />
    </ResumeProvider>
  );
};

export default Index;

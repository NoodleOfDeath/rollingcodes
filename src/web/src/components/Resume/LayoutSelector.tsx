import React from 'react';

import { Close } from '@mui/icons-material';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';

import { PresetSelector } from './PresetSelector';

export type LayoutSelectorProps = {
  onClose: () => void;
  open: boolean;
};

export const LayoutSelector = ({
  onClose,
  open,
}: LayoutSelectorProps) => {
  const handlePresetChange = () => {
    // Auto-close after selection for instant feedback
    setTimeout(() => onClose(), 300);
  };

  return (
    <Dialog
      fullScreen
      open={ open }
      onClose={ onClose }
      sx={ { '& .MuiDialog-paper': { bgcolor: 'background.default' } } }>
      <DialogTitle>
        <Box
          sx={ {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
          } }>
          <Typography variant="h5">Choose a Layout</Typography>
          <IconButton edge="end" color="inherit" onClick={ onClose }>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={ { py: 4 } }>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          Select a template to instantly apply it to your resume. Each template showcases your
          actual resume data with different styling and layouts.
        </Typography>
        <PresetSelector
          onChange={ handlePresetChange }
          showThumbnails />
      </DialogContent>
    </Dialog>
  );
};

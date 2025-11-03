import React from 'react';

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

import { ResumeRenderer } from './ResumeRenderer';
import { resumePresets } from './presets';

import { useResumeContext } from '~/contexts/ResumeContext';

export type PresetSelectorProps = {
  onChange?: () => void;
  showThumbnails?: boolean;
};

export const PresetSelector = ({
  onChange,
  showThumbnails = true,
}: PresetSelectorProps) => {

  const { config, updateConfig } = useResumeContext();

  return (
    <Box>
      <Box sx={ {
        display: 'flex', gap: 2, mb: 3, 
      } }>
        <FormControl fullWidth>
          <InputLabel>Resume Style</InputLabel>
          <Select
            label="Resume Style"
            value={ config.preset.id }
            onChange={ (e) => {
              const preset = resumePresets[e.target.value];
              if (preset) {
                updateConfig({ preset });
                onChange?.();
              }
            } }>
            {Object.values(resumePresets).map((preset) => (
              <MenuItem key={ preset.id } value={ preset.id }>
                {preset.name}
                {' '}
                -
                {preset.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {showThumbnails && (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Style Presets
          </Typography>
          <Grid container spacing={ 2 }>
            {Object.values(resumePresets).map((preset) => (
              <Grid item key={ preset.id } xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 }>
                <Card
                  sx={ {
                    border:
                      preset.id === config.preset.id
                        ? '2px solid #1976d2'
                        : '1px solid #ddd',
                  } }>
                  <CardActionArea onClick={ () => {
                    updateConfig({ preset });
                    onChange?.();
                  } }>
                    <div style={ { overflow: 'hidden' } }>
                      <div style={ { height: '400px', transform: 'scale(0.5) translateY(-30%)' } }>
                        <ResumeRenderer presetStyleOverride={ preset } />
                      </div>
                    </div>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {preset.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {preset.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={ { display: 'block', mt: 1 } }>
                        Layout: 
                        {' '}
                        {preset.layout}
                        {' '}
                        | Font: 
                        {' '}
                        {preset.typography.fontFamily.split(',')[0].replace(/"/g, '')}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      )}
    </Box>
  );
};

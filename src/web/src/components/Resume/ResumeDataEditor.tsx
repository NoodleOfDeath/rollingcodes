import React, { useEffect, useState } from 'react';

import {
  Add as AddIcon,
  Close as CloseIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Drawer,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';

import { useResumeContext } from '~/contexts/ResumeContext';
import { ResumeData, WorkExperience } from '~/data/resume';

export type ResumeDataEditorProps = {
  open: boolean;
  onClose: () => void;
};

export const ResumeDataEditor = ({
  onClose,
  open,
}: ResumeDataEditorProps) => {
  const {
    config, updateData, resetToDefault,
  } = useResumeContext();
  const [localData, setLocalData] = useState<ResumeData>(config.data);

  // Sync local data with context when dialog opens
  useEffect(() => {
    if (open) {
      setLocalData(config.data);
    }
  }, [open, config.data]);

  const handleChange = (updates: Partial<ResumeData>) => {
    const newData = { ...localData, ...updates };
    setLocalData(newData);
    updateData(newData);
  };

  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      achievements: [''],
      company: 'Company Name',
      location: 'Location',
      startDate: new Date(),
      title: 'Job Title',
      type: 'Full-Time',
    };
    handleChange({ workExperience: [...localData.workExperience, newExperience] });
  };

  const updateWorkExperience = (index: number, updates: Partial<WorkExperience>) => {
    const newExperience = [...localData.workExperience];
    newExperience[index] = { ...newExperience[index], ...updates };
    handleChange({ workExperience: newExperience });
  };

  const deleteWorkExperience = (index: number) => {
    const newExperience = localData.workExperience.filter((_, i) => i !== index);
    handleChange({ workExperience: newExperience });
  };

  const addAchievement = (expIndex: number) => {
    const newExperience = [...localData.workExperience];
    newExperience[expIndex].achievements.push('New achievement');
    handleChange({ workExperience: newExperience });
  };

  const updateAchievement = (expIndex: number, achIndex: number, value: string) => {
    const newExperience = [...localData.workExperience];
    newExperience[expIndex].achievements[achIndex] = value;
    handleChange({ workExperience: newExperience });
  };

  const deleteAchievement = (expIndex: number, achIndex: number) => {
    const newExperience = [...localData.workExperience];
    newExperience[expIndex].achievements = newExperience[expIndex].achievements.filter(
      (_, i) => i !== achIndex
    );
    handleChange({ workExperience: newExperience });
  };

  const addSkillCategory = () => {
    const newCategory = {
      items: [],
      title: 'New Category',
    };
    handleChange({ skills: [...localData.skills, newCategory] });
  };

  const updateSkillCategory = (categoryIndex: number, title: string) => {
    const skills = [...localData.skills];
    skills[categoryIndex] = { ...skills[categoryIndex], title };
    handleChange({ skills });
  };

  const deleteSkillCategory = (categoryIndex: number) => {
    const skills = localData.skills.filter((_, i) => i !== categoryIndex);
    handleChange({ skills });
  };

  const addSkillToCategory = (categoryIndex: number) => {
    const skills = [...localData.skills];
    skills[categoryIndex].items.push({ description: '', title: '' });
    handleChange({ skills });
  };

  const updateSkillInCategory = (
    categoryIndex: number,
    skillIndex: number,
    field: 'description' | 'title',
    value: string
  ) => {
    const skills = [...localData.skills];
    skills[categoryIndex].items[skillIndex] = {
      ...skills[categoryIndex].items[skillIndex],
      [field]: value,
    };
    handleChange({ skills });
  };

  const deleteSkillFromCategory = (categoryIndex: number, skillIndex: number) => {
    const skills = [...localData.skills];
    skills[categoryIndex].items = skills[categoryIndex].items.filter((_, i) => i !== skillIndex);
    handleChange({ skills });
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset to Thom\'s resume data? This will erase all your changes.')) {
      resetToDefault();
      setLocalData(config.data);
    }
  };

  return (
    <Drawer
      anchor="left"
      open={ open }
      onClose={ onClose }
      sx={ {
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: {
            lg: 600,
            md: 500,
            sm: 400,
            xs: '100%',
          },
        },
      } }>
      <Box sx={ { p: 2 } }>
        <Box sx={ {
          alignItems: 'center', display: 'flex', justifyContent: 'space-between', mb: 2,
        } }>
          <Typography variant="h5">
            Edit Resume Data
          </Typography>
          <IconButton
            onClick={ onClose }
            aria-label="Close editor">
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={ { mb: 3 } }>
          Customize the resume content. Changes update in real-time.
        </Typography>

        {/* Contact Information */}
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={ <ExpandMoreIcon /> }
            sx={ { '& .MuiAccordionSummary-expandIconWrapper': { mr: 1 }, flexDirection: 'row-reverse' } }>
            <Typography variant="h6">Contact Info</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={ {
              display: 'flex', flexDirection: 'column', gap: 2, 
            } }>
              <TextField
                fullWidth
                label="Name"
                value={ localData.contact.name }
                onChange={ (e) =>
                  handleChange({ contact: { ...localData.contact, name: e.target.value } }) } />
              <TextField
                fullWidth
                label="Title"
                value={ localData.contact.title }
                onChange={ (e) =>
                  handleChange({ contact: { ...localData.contact, title: e.target.value } }) } />
              <TextField
                fullWidth
                label="Email"
                value={ localData.contact.email }
                onChange={ (e) =>
                  handleChange({ contact: { ...localData.contact, email: e.target.value } }) } />
              <TextField
                fullWidth
                label="Phone"
                value={ localData.contact.phone }
                onChange={ (e) =>
                  handleChange({ contact: { ...localData.contact, phone: e.target.value } }) } />
              <TextField
                fullWidth
                label="Location"
                value={ localData.contact.location }
                onChange={ (e) =>
                  handleChange({ contact: { ...localData.contact, location: e.target.value } }) } />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Summary */}
        <Accordion>
          <AccordionSummary
            expandIcon={ <ExpandMoreIcon /> }
            sx={ { '& .MuiAccordionSummary-expandIconWrapper': { mr: 1 }, flexDirection: 'row-reverse' } }>
            <Typography variant="h6">Summary</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              multiline
              rows={ 4 }
              value={ localData.summary }
              onChange={ (e) => handleChange({ summary: e.target.value }) } />
          </AccordionDetails>
        </Accordion>

        {/* Work Experience */}
        <Accordion>
          <AccordionSummary
            expandIcon={ <ExpandMoreIcon /> }
            sx={ { '& .MuiAccordionSummary-expandIconWrapper': { mr: 1 }, flexDirection: 'row-reverse' } }>
            <Box sx={ {
              alignItems: 'center', display: 'flex', justifyContent: 'space-between', width: '100%',
            } }>
              <Typography variant="h6">Work Experience</Typography>
              <IconButton
                size="small"
                onClick={ (e) => {
                  e.stopPropagation();
                  addWorkExperience();
                } }>
                <AddIcon />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={ {
              display: 'flex', flexDirection: 'column', gap: 2, 
            } }>
              {localData.workExperience.map((exp, expIndex) => (
                <Box
                  key={ expIndex }
                  sx={ {
                    border: '1px solid #ddd',
                    borderRadius: 1,
                    p: 2,
                  } }>
                  <Box sx={ {
                    display: 'flex', justifyContent: 'space-between', mb: 1, 
                  } }>
                    <Typography variant="subtitle2">
                      Position
                      {expIndex + 1}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={ () => deleteWorkExperience(expIndex) }>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <TextField
                    fullWidth
                    label="Title"
                    size="small"
                    sx={ { mb: 1 } }
                    value={ exp.title }
                    onChange={ (e) => updateWorkExperience(expIndex, { title: e.target.value }) } />
                  <TextField
                    fullWidth
                    label="Company"
                    size="small"
                    sx={ { mb: 1 } }
                    value={ typeof exp.company === 'string' ? exp.company : exp.company.name }
                    onChange={ (e) => {
                      const currentCompany = exp.company;
                      const newCompany = typeof currentCompany === 'string'
                        ? e.target.value
                        : { ...currentCompany, name: e.target.value };
                      updateWorkExperience(expIndex, { company: newCompany });
                    } } />
                  <TextField
                    fullWidth
                    label="Company Website"
                    size="small"
                    sx={ { mb: 1 } }
                    placeholder="https://www.example.com"
                    value={ typeof exp.company === 'string' ? '' : (exp.company.href || '') }
                    onChange={ (e) => {
                      const currentCompany = exp.company;
                      const companyName = typeof currentCompany === 'string' ? currentCompany : currentCompany.name;
                      const newCompany = {
                        href: e.target.value,
                        name: companyName,
                      };
                      updateWorkExperience(expIndex, { company: newCompany });
                    } } />
                  <TextField
                    fullWidth
                    label="Location"
                    size="small"
                    sx={ { mb: 1 } }
                    value={ exp.location as string }
                    onChange={ (e) => updateWorkExperience(expIndex, { location: e.target.value }) } />

                  <Typography
                    variant="caption"
                    sx={ {
                      display: 'block', mb: 1, mt: 2, 
                    } }>
                    Achievements:
                  </Typography>
                  {exp.achievements.map((ach, achIndex) => (
                    <Box
                      key={ achIndex }
                      sx={ {
                        display: 'flex', gap: 1, mb: 1, 
                      } }>
                      <TextField
                        fullWidth
                        multiline
                        size="small"
                        value={ ach as string }
                        onChange={ (e) =>
                          updateAchievement(expIndex, achIndex, e.target.value) } />
                      <IconButton
                        size="small"
                        onClick={ () => deleteAchievement(expIndex, achIndex) }>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    size="small"
                    startIcon={ <AddIcon /> }
                    onClick={ () => addAchievement(expIndex) }>
                    Add Achievement
                  </Button>
                </Box>
              ))}
              <Button
                variant="outlined"
                startIcon={ <AddIcon /> }
                onClick={ addWorkExperience }>
                Add Work Experience
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Skills */}
        <Accordion>
          <AccordionSummary
            expandIcon={ <ExpandMoreIcon /> }
            sx={ { '& .MuiAccordionSummary-expandIconWrapper': { mr: 1 }, flexDirection: 'row-reverse' } }>
            <Box sx={ {
              alignItems: 'center', display: 'flex', justifyContent: 'space-between', width: '100%',
            } }>
              <Typography variant="h6">Skills</Typography>
              <IconButton
                size="small"
                onClick={ (e) => {
                  e.stopPropagation();
                  addSkillCategory();
                } }>
                <AddIcon />
              </IconButton>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={ {
              display: 'flex', flexDirection: 'column', gap: 3,
            } }>
              {localData.skills.map((category, categoryIndex) => (
                <Box key={ categoryIndex }>
                  <Box sx={ {
                    alignItems: 'center', display: 'flex', gap: 1, mb: 1,
                  } }>
                    <TextField
                      fullWidth
                      size="small"
                      label="Category Title"
                      value={ category.title }
                      onChange={ (e) => updateSkillCategory(categoryIndex, e.target.value) } />
                    <IconButton
                      size="small"
                      color="error"
                      onClick={ () => deleteSkillCategory(categoryIndex) }>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  {category.items.map((skill, skillIndex) => (
                    <Box
                      key={ skillIndex }
                      sx={ {
                        display: 'flex', flexDirection: 'column', gap: 1, mb: 1, ml: 2,
                      } }>
                      <Box sx={ { display: 'flex', gap: 1 } }>
                        <TextField
                          fullWidth
                          size="small"
                          label="Skill Title"
                          value={ skill.title }
                          onChange={ (e) =>
                            updateSkillInCategory(categoryIndex, skillIndex, 'title', e.target.value) } />
                        <IconButton
                          size="small"
                          onClick={ () => deleteSkillFromCategory(categoryIndex, skillIndex) }>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <TextField
                        fullWidth
                        size="small"
                        label="Description"
                        multiline
                        rows={ 2 }
                        value={ skill.description }
                        onChange={ (e) =>
                          updateSkillInCategory(categoryIndex, skillIndex, 'description', e.target.value) }
                        sx={ { ml: 0 } } />
                    </Box>
                  ))}
                  <Button
                    size="small"
                    startIcon={ <AddIcon /> }
                    onClick={ () => addSkillToCategory(categoryIndex) }
                    sx={ { ml: 2 } }>
                    Add Skill to
                    {' '}
                    {category.title}
                  </Button>
                </Box>
              ))}
              <Button
                variant="outlined"
                startIcon={ <AddIcon /> }
                onClick={ addSkillCategory }>
                Add Skill Category
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Education */}
        <Accordion>
          <AccordionSummary
            expandIcon={ <ExpandMoreIcon /> }
            sx={ { '& .MuiAccordionSummary-expandIconWrapper': { mr: 1 }, flexDirection: 'row-reverse' } }>
            <Typography variant="h6">Education</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={ {
              display: 'flex', flexDirection: 'column', gap: 2, 
            } }>
              <TextField
                fullWidth
                label="Degree"
                value={ localData.education.degree }
                onChange={ (e) =>
                  handleChange({ education: { ...localData.education, degree: e.target.value } }) } />
              <TextField
                fullWidth
                label="Majors (comma-separated)"
                value={ localData.education.majors.join(', ') }
                onChange={ (e) =>
                  handleChange({
                    education: {
                      ...localData.education,
                      majors: e.target.value.split(',').map((m) => m.trim()),
                    },
                  }) } />
              <TextField
                fullWidth
                label="Minor"
                value={ localData.education.minor || '' }
                onChange={ (e) =>
                  handleChange({ education: { ...localData.education, minor: e.target.value } }) } />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Reset Button */}
        <Box sx={ {
          borderTop: '1px solid #ddd', mt: 3, pt: 3,
        } }>
          <Button
            fullWidth
            variant="outlined"
            color="warning"
            onClick={ handleReset }
            sx={ { mb: 2 } }>
            Reset to Thom&apos;s Resume
          </Button>
          <Typography variant="caption" color="text.secondary" sx={ { display: 'block', textAlign: 'center' } }>
            This will restore the original resume data and delete your changes.
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { defaultPreset } from '~/components/Resume/presets';
import { ResumeConfig } from '~/components/Resume/types';
import { resumeData } from '~/data/resume';

const RESUME_DATA_STORAGE_KEY = 'resumeData';

export type ResumeContextType = {
  config: ResumeConfig;
  isDownloading: boolean;
  resetToDefault: () => void;
  setConfig: (config: ResumeConfig) => void;
  setIsDownloading: (isDownloading: boolean) => void;
  updateConfig: (updates: Partial<ResumeConfig>) => void;
  updateData: (data: typeof resumeData) => void;
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

// Load resume data from localStorage or use default
const loadResumeData = (): typeof resumeData => {
  try {
    const stored = localStorage.getItem(RESUME_DATA_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load resume data from localStorage:', error);
  }
  return resumeData;
};

// Save resume data to localStorage
const saveResumeData = (data: typeof resumeData) => {
  try {
    localStorage.setItem(RESUME_DATA_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save resume data to localStorage:', error);
  }
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ResumeConfig>({
    data: loadResumeData(),
    preset: defaultPreset,
  });

  const [isDownloading, setIsDownloading] = useState(false);

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveResumeData(config.data);
  }, [config.data]);

  const updateConfig = (updates: Partial<ResumeConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const updateData = (data: typeof resumeData) => {
    setConfig((prev) => ({ ...prev, data }));
  };

  const resetToDefault = () => {
    setConfig((prev) => ({ ...prev, data: resumeData }));
    localStorage.removeItem(RESUME_DATA_STORAGE_KEY);
  };

  const value: ResumeContextType = {
    config,
    isDownloading,
    resetToDefault,
    setConfig,
    setIsDownloading,
    updateConfig,
    updateData,
  };

  return <ResumeContext.Provider value={ value }>{children}</ResumeContext.Provider>;
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};
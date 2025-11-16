import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { defaultPreset } from '~/components/Resume/presets';
import { ResumeConfig } from '~/components/Resume/types';
import {
  ResumeVersion,
  getResumeData,
  resumeData,
} from '~/data/resume';

const RESUME_DATA_STORAGE_KEY = 'resumeData';
const RESUME_VERSION_STORAGE_KEY = 'resumeVersion';

export type ResumeContextType = {
  config: ResumeConfig;
  isDownloading: boolean;
  resetToDefault: () => void;
  resumeVersion: ResumeVersion;
  setConfig: (config: ResumeConfig) => void;
  setIsDownloading: (isDownloading: boolean) => void;
  setResumeVersion: (version: ResumeVersion) => void;
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

// Load resume version from localStorage or use default
const loadResumeVersion = (): ResumeVersion => {
  try {
    const stored = localStorage.getItem(RESUME_VERSION_STORAGE_KEY);
    if (stored && (stored === 'tech-lead' || stored === 'ic')) {
      return stored as ResumeVersion;
    }
  } catch (error) {
    console.error('Failed to load resume version from localStorage:', error);
  }
  return 'tech-lead';
};

// Save resume version to localStorage
const saveResumeVersion = (version: ResumeVersion) => {
  try {
    localStorage.setItem(RESUME_VERSION_STORAGE_KEY, version);
  } catch (error) {
    console.error('Failed to save resume version to localStorage:', error);
  }
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeVersion, setResumeVersionState] = useState<ResumeVersion>(loadResumeVersion());
  const [config, setConfig] = useState<ResumeConfig>({
    data: loadResumeData(),
    preset: defaultPreset,
  });

  const [isDownloading, setIsDownloading] = useState(false);

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveResumeData(config.data);
  }, [config.data]);

  // Save version to localStorage whenever it changes
  useEffect(() => {
    saveResumeVersion(resumeVersion);
  }, [resumeVersion]);

  const setResumeVersion = (version: ResumeVersion) => {
    setResumeVersionState(version);
    // Update config data to match the new version
    const newData = getResumeData(version);
    setConfig((prev) => ({ ...prev, data: newData }));
  };

  const updateConfig = (updates: Partial<ResumeConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const updateData = (data: typeof resumeData) => {
    setConfig((prev) => ({ ...prev, data }));
  };

  const resetToDefault = () => {
    const defaultData = getResumeData(resumeVersion);
    setConfig((prev) => ({ ...prev, data: defaultData }));
    localStorage.removeItem(RESUME_DATA_STORAGE_KEY);
  };

  const value: ResumeContextType = {
    config,
    isDownloading,
    resetToDefault,
    resumeVersion,
    setConfig,
    setIsDownloading,
    setResumeVersion,
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
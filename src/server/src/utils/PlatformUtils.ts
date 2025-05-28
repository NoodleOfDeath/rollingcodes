import { DeviceEventEmitter, Platform } from 'react-native';

import VersionCheck from 'react-native-version-check';

import {
  Storage,
  StorageKey,
  StorageMutation,
} from '~/contexts';

const getUserAgent = () => {
  const userAgent = { 
    ...Platform,
    currentBuildNumber: VersionCheck.getCurrentBuildNumber(),
    currentVersion: VersionCheck.getCurrentVersion(),
    //locale: Localization.getLocale(),
  };
  return userAgent;
};

const emitEvent = async <Event extends StorageKey>(event: Event, mutation?: StorageMutation<Event>, state?: Storage) => {
  DeviceEventEmitter.emit(event, mutation, state);
};

export {
  emitEvent,
  getUserAgent,
};
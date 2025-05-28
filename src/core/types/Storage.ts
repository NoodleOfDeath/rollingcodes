/* eslint-disable @typescript-eslint/sort-type-constituents */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import { PuzzlePackageInfo } from 'drunkmode-puzzles';
import type { Contact } from 'react-native-contacts';
import { Purchase } from 'react-native-iap';
import type { FamilyActivitySelection } from 'react-native-screen-time-api';

import { ColorScheme } from './Client';
import { UserData } from './UserData';
import { DurationString } from '../utils';

// puzzle

export const PUZZLE_DIFFICULTIES = [
  'easy',
  'medium',
  'hard',
];

export type PuzzleDifficulty = typeof PUZZLE_DIFFICULTIES[number];

export const PUZZLES: { [key in string]: PuzzlePackageInfo } = {
  traceTheLine: {
    displayName: 'Trace the Line',
    icon: 'gesture-swipe-vertical',
    instructions: 'Please touch and drag the circle in a straight line',
    name: 'traceTheLine',
  },
  crossword: {
    comingSoon: true,
    displayName: 'Crossword',
    icon: 'alphabetical',
    instructions: 'TODO',
    name: 'crossword',
  },
  solitaire: {
    comingSoon: true,
    displayName: 'Solitaire',
    icon: 'cards-playing-club-multiple',
    instructions: 'TODO',
    name: 'solitaire',
  },
  jigsaw: {
    comingSoon: true,
    displayName: 'Jigsaw',
    icon: 'puzzle',
    instructions: 'Drag and drop the puzzle pieces to fit one another',
    name: 'jigsaw',
  },
  maze: {
    comingSoon: true,
    displayName: 'Maze',
    icon: 'map-search',
    instructions: 'TODO',
    name: 'maze',
  },
  tetris: {
    comingSoon: true,
    displayName: 'Tetris',
    icon: 'ruler-square',
    instructions: 'TODO',
    name: 'tetris',
  },
  wordle: {
    comingSoon: true,
    displayName: 'Wordle',
    icon: 'alpha-w-box-outline',
    instructions: 'TODO',
    name: 'wordle',
  },
};

export type PuzzleName = keyof typeof PUZZLES;

export type PuzzleSelection = {
  default?: PuzzlePackageInfo;
  pause?: PuzzlePackageInfo;
  preview?: never;
};

export type PuzzleUseCase = keyof PuzzleSelection;

export type RideShareApp = {
  id: string;
  displayName: string;
  icon?: string;
  url: string;
  appStoreUrl: {
    ios?: string;
    android?: string;
  };
};

export const RIDE_SHARE_APPS: RideShareApp[] = [
  {
    appStoreUrl: { ios: 'https://apps.apple.com/us/app/lyft/id529379082' },
    displayName: 'Lyft',
    id: 'lyft',
    url: 'lyft://',
  },
  {
    appStoreUrl: { ios: 'https://apps.apple.com/us/app/uber-request-a-ride/id368677368' },
    displayName: 'Uber',
    id: 'uber',
    url: 'uber://',
  },
  {
    appStoreUrl: { ios: 'https://apps.apple.com/us/app/waymo-one/id1343524838' },
    displayName: 'Waymo One',
    id: 'waymo',
    url: 'waymo://',
  },
];

export class Syncable {
  
  isSyncing = false;
  synced = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  
  get canSync() {
    return !this.isSyncing && (!this.synced || this.error);
  }
  
  start() {
    this.isSyncing = true;
    this.synced = false;
    this.error = undefined;
    return this;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fail(e?: any) {
    this.isSyncing = false;
    this.synced = true;
    this.error = e;
    return this;
  }
  
  done() {
    this.isSyncing = false;
    this.synced = true;
    this.error = undefined;
    return this;
  }
  
  reset() {
    this.isSyncing = false;
    this.synced = false;
    this.error = undefined;
    return this;
  }
  
}

export type SyncableState = {
  profile: Syncable;
  events: Syncable;
  polls: Syncable;
};

export class SyncState implements SyncableState {
  
  profile: Syncable = new Syncable();
  events: Syncable = new Syncable();
  polls: Syncable = new Syncable();
  
  start<K extends keyof SyncableState>(key: K) {
    this[key].start();
    return this;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fail<K extends keyof SyncableState>(key: K, e?: any) {
    this[key].fail(e);
    return this;
  }
  
  done<K extends keyof SyncableState>(key: K) {
    this[key].done();
    return this;
  }
  
  reset<K extends keyof SyncableState>(key: K) {
    this[key].reset();
    return this;
  }
  
}

// storage

export const STORAGE_KEYS = [
  'hasOnboarded',
  'lastReviewedAt',
  'lastWhatsNewVersion',
  'drunkModeActivatedAt',
  'drunkModeDeactivatesAfter',
  'drunkModeAllowPausing',
  'drunkModePausedAt',
  'drunkModePausedFor',
  'drunkModePauseCount',
  'drunkModeMaxPauseCount',
  'drunkModePauseDuration',
  'drunkModePauseWaitDuration',
  'drunkModePauseWaitDurationDoubles',
  'drunkModeResumedAt',
  'drunkModeExtensionDuration',
  'drunkModeExtensionDurationDoubles',
  'drunkModeExtensionCount',
  'drunkModeMaxExtensionDuration',
  'disableMovingButtons',
  'activitySelection',
  'contactSelection',
  'puzzleSelection',
  'puzzleConfigurations',
  'colorScheme',
  'disableAppInstallation',
  'disableVerbalAbuse',
  'autoDeactivateAfter',
  'rideShareApp',
  'useFaceId',
  'pushNotificationsEnabled',
  'pushNotificationsConfig',
  // dont need to save these prefs
  'fcmToken',
  'activeSubscription',
  'metrics',
  'userData',
  // polls
  'polls',
  'events',
] as const;

export type StorageKey = typeof STORAGE_KEYS[number];

export type SpecialTypeKeys = 'pushNotificationsConfig' | 'polls' | 'events';

export type Storage = {
  // onboarding
  hasOnboarded?: boolean;
  lastReviewedAt?: number;
  lastWhatsNewVersion?: string;
  // drunk mode settings
  drunkModeActivatedAt?: number;
  drunkModeDeactivatesAfter?: number;
  drunkModeAllowPausing?: boolean;
  drunkModePausedAt?: number;
  drunkModeResumedAt?: number;
  drunkModePausedFor?: DurationString;
  drunkModePauseCount?: number;
  drunkModeMaxPauseCount?: number;
  drunkModePauseDuration?: DurationString;
  drunkModePauseWaitDuration?: DurationString;
  drunkModePauseWaitDurationDoubles?: boolean;
  drunkModeExtensionDuration?: DurationString;
  drunkModeNextExtensionDuration?: DurationString;
  drunkModeExtensionDurationDoubles?: boolean;
  drunkModeExtensionCount?: number;
  drunkModeMaxExtensionDuration?: DurationString;
  disableMovingButtons?: boolean;
  // selections
  activitySelection?: FamilyActivitySelection;
  contactSelection?: Record<string, Contact>;
  puzzleSelection?: PuzzleSelection;
  puzzleConfigurations?: Record<string, PuzzlePackageInfo>;
  // preferences
  colorScheme?: ColorScheme;
  disableAppInstallation?: boolean;
  disableVerbalAbuse?: boolean;
  autoDeactivateAfter?: DurationString;
  rideShareApp?: RideShareApp;
  useFaceId?: boolean;
  pushNotificationsEnabled?: boolean;
  pushNotificationsConfig?: { [key: string]: Partial<unknown> };
  // user data
  attestationNonce?: string;
  fcmToken?: string;
  activeSubscription?: Purchase;
  metrics?: UserMetrics;
  userData?: UserData;
  adNetwork?: string;
  // polls
  polls?: unknown[];
  events?: unknown[];
};

export const PREFERENCE_KEYS = STORAGE_KEYS.filter((key) => {
  return !/^(activeSubscription|adNetwork|events|fcmToken|metrics|polls|userData)$/.test(key);
});

export type PreferenceKey = typeof PREFERENCE_KEYS[number];

export const DEFAULT_AUTODEACTIVATE_DRUNK_MODE_DURATION = '6h';
export const DEFAULT_PAUSE_DRUNK_MODE_DURATION = '5m';
export const DEFAULT_PAUSE_DRUNK_MODE_WAIT_TIME = '5m';
export const DEFAULT_DRUNK_MODE_EXTENSION_DURATION = '5m';
export const DEFAULT_DRUNK_MODE_MAX_EXTENSION_DURATION = '23h';

export type ActivationPeriod = {
  start: number;
  end: number;
};

export type UserDrunkModeEvent = 'activate' | 'deactivate' | 'pause' | 'resume' | 'imlit';
export type UserPuzzleEvent = 'playedPuzzle' | 'failedPuzzle' | 'completedPuzzle' | 'progressedPuzzle' | 'puzzleTooHard';

export type UserEventType = UserDrunkModeEvent | UserPuzzleEvent;

export type UserDrunkModeEventPayload = {
  disableAppInstallation?: boolean;
  drunkModeDeactivatesAfter?: number;
  drunkModePauseDuration?: DurationString;
  drunkModeExtensionDuration?: DurationString;
};

export type UserPuzzleEventPayload = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: any;
  duration?: number;
  puzzle: PuzzleName;
  useCase: PuzzleUseCase 
};

export type UserEventPayload<T extends UserEventType> = 
  T extends UserDrunkModeEvent ? 
  UserDrunkModeEventPayload : 
  // eslint-disable-next-line @typescript-eslint/sort-type-constituents
  T extends UserPuzzleEvent ? 
  UserPuzzleEventPayload : 
  never;

export type UserEvent = {
  timestamp: number;
  type: UserEventType;
  data: string;
};

export type UserMetrics = {
  events?: UserEvent[];
};

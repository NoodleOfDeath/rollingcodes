import { Platform } from 'react-native';

import _RNFS from 'react-native-fs';

import { pathJoin } from './StringUtils';

export class RNFS {
  
  static async exists(path: string) {
    const exists = (Platform.select({
      android: await _RNFS.existsAssets(path),
      ios: await _RNFS.exists(path),
    })) ?? false;
    return exists;
  }
  
  static async readDir(path = '') {
    return (Platform.select({
      android: await _RNFS.readDirAssets(path),
      ios: await _RNFS.readDir(pathJoin(_RNFS.MainBundlePath, path)),
    })) ?? [];
  }
  
  static async readFile(path: string) {
    return Platform.select({
      android: await _RNFS.readFileAssets(path),
      ios: await _RNFS.readFile(path),
    }) || '';
  }
  
}
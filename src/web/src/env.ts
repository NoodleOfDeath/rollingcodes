
const APPLE_APP_STORE_URL = process.env.NEXT_PUBLIC_APPLE_APP_STORE_URL;
const GOOGLE_PLAY_STORE_URL = process.env.NEXT_PUBLIC_GOOGLE_PLAY_STORE_URL;
const IS_RELEASED_TO_IOS = !!APPLE_APP_STORE_URL;
const IS_RELEASED_TO_ANDROID = !!GOOGLE_PLAY_STORE_URL;
const IS_RELEASED = IS_RELEASED_TO_IOS || IS_RELEASED_TO_ANDROID;

const GOOGLE_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID;

export { 
  APPLE_APP_STORE_URL,
  GOOGLE_MEASUREMENT_ID,
  GOOGLE_PLAY_STORE_URL,
  IS_RELEASED_TO_IOS,
  IS_RELEASED_TO_ANDROID,
  IS_RELEASED,
};
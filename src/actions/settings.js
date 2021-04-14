import { NEW_SETTINGS } from './types';

const storeNewSettings = (settings) => ({
  type: NEW_SETTINGS,
  payload: settings,
});

export default storeNewSettings;

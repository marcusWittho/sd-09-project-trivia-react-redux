export const GRAVATAR = 'GRAVATAR';
export const REQ_TOKEN = 'REQ_TOKEN';
export const GET_TOKEN = 'GET_TOKEN';

export const gravatarHash = (gravatar) => ({
  type: GRAVATAR,
  gravatar,
});

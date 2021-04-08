export const USER_EMAIL = 'USER_EMAIL';
export const USER_NAME = 'USER_NAME';
export const USER_AVATAR = 'USER_AVATAR';

export const userEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const userName = (name) => ({
  type: USER_NAME,
  name,
});

export const userAvatar = (avatar) => ({
  type: USER_AVATAR,
  avatar,
});

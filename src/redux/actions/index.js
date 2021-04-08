export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';

export const handleToken = (data) => ({
  type: SET_TOKEN,
  data,
});

export const handleUserName = (nameInput) => ({
  type: SET_USER_NAME,
  nameInput,
});
export const handleUserEmail = (email) => ({
  type: SET_USER_EMAIL,
  email,
});

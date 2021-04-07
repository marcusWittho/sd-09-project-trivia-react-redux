const token = (state = '', { type, userToken }) => {
  switch (type) {
  case 'TOKEN':
    return { token: userToken };
  default:
    return state;
  }
};

export default token;

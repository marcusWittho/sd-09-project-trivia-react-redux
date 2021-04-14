import { MD5 } from 'crypto-js';

const generateGravatarUrl = (email) => {
  const hash = MD5(email);
  return `https://www.gravatar.com/avatar/${hash.toString()}`;
};
export default { generateGravatarUrl };

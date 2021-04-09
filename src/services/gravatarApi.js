export default gravatarAPi = async (emailCode) => {
  const endPoint = `https://www.gravatar.com/avatar/${emailCode}`;
  const response = await fetch(endPoint);
  const result = await response.json();
  return result;
};

const fetchGravatar = async (email) => {
  const response = await fetch(`https://br.gravatar.com/site/implement/${email}`);
  const json = await response.json();
  return json;
};

export default fetchGravatar;

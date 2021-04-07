const gravatarApi = async (hash) => {
  try {
    const endpoint = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    const promise = await endpoint.json();
    return promise;
  } catch (error) {
    return console.log(error);
  }
};

export default gravatarApi;

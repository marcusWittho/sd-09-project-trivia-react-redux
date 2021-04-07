export default function addStorage(name, token) {
  const player = { name };
  localStorage.setItem('state', JSON.stringify(player));
  localStorage.setItem('token', token);
}

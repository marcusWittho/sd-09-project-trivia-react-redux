import React from 'react';

export default class Login extends React.Component {
  render() {
    return (
      <main>
        <form>
          <label htmlFor="input-name">
            <input
              data-testid="input-player-name"
              id="input-name"
              type="text"
              placeholder="Nome"
            />
          </label>

          <label htmlFor="input-email">
            <input
              data-testid="input-gravatar-email"
              id="input-email"
              type="email"
              placeholder="Email"
            />
          </label>

          <button type="button">Jogar</button>
        </form>
      </main>
    );
  }
}

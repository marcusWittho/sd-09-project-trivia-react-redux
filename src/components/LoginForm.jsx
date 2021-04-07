import React, { Component } from 'react';

export default class LoginForm extends Component {
  render() {
    return (
      <form>
        <label htmlFor="name">
          Nome do jogador
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            id="name"
          />
        </label>
        <label htmlFor="email">
          Email do Gravatar
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            id="email"
          />
        </label>
        <button data-testid="btn-play" type="button">JOGAR</button>
      </form>
    );
  }
}

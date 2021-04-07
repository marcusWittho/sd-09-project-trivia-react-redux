import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <section>
        <label htmlFor="name">
          Nome
          <input type="text" data-testid="input-player-name" />
        </label>
        <label htmlFor="email">
          Email
          <input type="text" data-testid="input-gravatar-email" />
        </label>
        <button type="button" data-testid="btn-play">Jogar</button>
      </section>
    );
  }
}

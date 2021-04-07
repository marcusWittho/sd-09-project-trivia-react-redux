import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.inputsControl = this.inputsControl.bind(this);

    this.state = {
      playerNameField: '',
      playerEmailField: '',
      button: true,
    };
  }

  inputsControl({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateInputs());
  }

  validateInputs() {
    const { playerNameField, playerEmailField } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+.com$/i.test(playerEmailField);
    const name = playerNameField;
    if (regex && name !== '') {
      this.setState({
        button: false,
      });
    } else {
      this.setState({
        button: true,
      });
    }
  }

  render() {
    const { playerEmailField, playerNameField, button } = this.state;
    return (
      <section>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            name="playerNameField"
            value={ playerNameField }
            onChange={ this.inputsControl }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="text"
            name="playerEmailField"
            value={ playerEmailField }
            onChange={ this.inputsControl }
            data-testid="input-gravatar-email"
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ button }
        >
          Jogar
        </button>
      </section>
    );
  }
}

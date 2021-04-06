import React, { Component } from 'react';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.statusCheck = this.statusCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  statusCheck() {
    const { email, name } = this.state;
    const nameFormat = name.length >= 2;
    const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
    return !(emailFormat && nameFormat);
  }

  render() {
    const { email, name } = this.state;
    return (
      <form>
        <label htmlFor="name-input">
          Nome:
          <input
            id="name-input"
            name="name"
            value={ name }
            minLength="2"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email-input">
          Email:
          <input
            id="email-input"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          disabled={ this.statusCheck() }
          data-testid="btn-play"
        >
          Jogar
        </button>
      </form>
    );
  }
}

export default LoginForm;

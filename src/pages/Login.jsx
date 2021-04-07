import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };

    this.HandleValidation = this.HandleValidation.bind(this);
    this.HandleChange = this.HandleChange.bind(this);
  }

  HandleValidation() {
    const { name, email } = this.state;
    return !(name && email);
  }

  HandleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form>
        <h1>Login</h1>
        <label htmlFor="name">
          Nome
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Nome"
            data-testid="input-player-name"
            onChange={ this.HandleChange }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            data-testid="input-gravatar-email"
            onChange={ this.HandleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          disabled={ this.HandleValidation() }
        >
          entrar

        </button>
        <button
          data-testid="btn-settings"
          type="button"
        >
          <Link to="/settings">Configurações</Link>
        </button>
      </form>
    );
  }
}

export default Login;

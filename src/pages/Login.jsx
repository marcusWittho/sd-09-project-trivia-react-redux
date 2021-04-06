import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    const { name, email } = this.state;

    return (
      <div>
        <form action="">
          <label htmlFor="input-player-name">
            Nome:
            <input
              onChange={ this.handleChange }
              data-testid="input-player-name"
              type="text"
              name="name"
              value={ name }
              id="input-player-name"
            />
          </label>
          <label htmlFor="input-gravatar-email">
            Email:
            <input
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              value={ email }
              id="input-gravatar-email"
            />
          </label>
          <button data-testid="btn-play" type="button" disabled={ !name || !email }>
            Jogar
          </button>
        </form>
        <Link to="/settings">
          <button data-testid="btn-settings" type="button">Configurações</button>
        </Link>
      </div>
    );
  }
}

export default Login;

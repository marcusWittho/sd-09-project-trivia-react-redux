import React, { Component } from 'react';
import SettingsButton from '../Components/SettingsButton';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  validateLogin() {
    const { name, email } = this.state;
    const validateName = name.length > 1;
    const validateEmail = email.length > 1;
    return validateName && validateEmail;
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <SettingsButton />
        <h2>
          Trivia
        </h2>
        <input
          type="text"
          name="name"
          value={ name }
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
        <input
          name="email"
          type="text"
          value={ email }
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !this.validateLogin() }
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;

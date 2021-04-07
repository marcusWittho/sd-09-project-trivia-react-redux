import React from 'react';
import { Redirect } from 'react-router';
import * as api from '../services/fetchApi';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      loggedIn: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange({ target }) {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({ [name]: value });
  }

  validateFields(username, email) {
    const re = /[^@]+@[^.]+\..+/g;

    const emailTest = re.test(String(email).toLocaleLowerCase());
    const usernameTest = username.length > 0;

    return (emailTest && usernameTest);
  }

  handleClick() {
    api.fetchToken().then(({ token }) => localStorage
      .setItem('token', JSON.stringify(token)));
    this.setState({ loggedIn: true });
  }

  render() {
    const { username, email, loggedIn } = this.state;
    const isDisabled = !this.validateFields(username, email);
    return (
      <div>
        <label htmlFor="input-player-name">
          Nome:
          <input
            data-testid="input-player-name"
            id="input-player-name"
            name="username"
            type="text"
            onChange={ this.handleInputChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email:
          <input
            data-testid="input-gravatar-email"
            id="input-gravatar-email"
            name="email"
            type="email"
            onChange={ this.handleInputChange }
          />
        </label>
        {loggedIn ? <Redirect to="/dummy" />
          : (
            <button
              type="submit"
              data-testid="btn-play"
              onClick={ this.handleClick }
              disabled={ isDisabled }
            >
              Jogar
            </button>)}
      </div>
    );
  }
}

export default Login;

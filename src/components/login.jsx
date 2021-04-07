import React from 'react';
import { Redirect } from 'react-router-dom';
import getToken from '../services/gravatarApi';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      isDisabled: true,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    const { name, email } = this.state;
    const player = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: email,
    };

    localStorage.setItem('player', JSON.stringify(player));
    getToken();
    this.setState({ redirect: true });
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      const { email, name: userName } = this.state;
      const validateEmail = /\w+@\w+(.com)/;
      if (validateEmail.test(email) && userName) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  render() {
    const { isDisabled, redirect } = this.state;
    return (
      redirect
        ? (
          <Redirect to="/feedback" />
        ) : (
          <form>
            <input
              type="text"
              name="email"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
            <input
              type="text"
              name="name"
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
            <button
              type="button"
              data-testid="btn-play"
              disabled={ isDisabled }
              onClick={ this.handleLogin }
            >
              Jogar
            </button>
          </form>
        )
    );
  }
}

export default Login;

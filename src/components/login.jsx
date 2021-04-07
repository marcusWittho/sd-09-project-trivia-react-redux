import React from 'react';
import getToken from '../services/gravatarApi';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nome: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  async handleLogin() {
    const objeto = { gravatarEmail: 'teste@test.com' };
    localStorage.setItem('player', JSON.stringify(objeto));

    console.log(getToken());

    // getToken();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value }, () => {
      const { email, nome } = this.state;
      const validateEmail = /\w+@\w+(.com)/;
      if (validateEmail.test(email) && nome) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <form>
        <input
          type="text"
          name="email"
          onChange={ this.handleChange }
          data-testid="input-gravatar-email"
        />
        <input
          type="text"
          name="nome"
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
    );
  }
}

export default Login;

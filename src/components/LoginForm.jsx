import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick() {
    const { history } = this.props;
    history.push('/game');
    // Aqui deve entrar a requisição da API que retorna o token do jogador e o token deve ser salvo no localstorage
    const token = 'chamadaDaApi()';
    localStorage.setItem('token', token);
  }

  render() {
    const { name, email } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Nome do jogador
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            value={ name }
            id="name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email do Gravatar
          <input
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            value={ email }
            id="email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          disabled={ name === '' || email === '' }
          onClick={ this.handleClick }
        >
          JOGAR
        </button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

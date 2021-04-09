import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getToken } from '../services/Api';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

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

  async handleClick() {
    const { history } = this.props;
    const { name, email } = this.state;
    const token = await getToken();
    localStorage.setItem('token', token);
    localStorage.setItem('state', JSON.stringify({
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    }));
    history.push('/game');
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

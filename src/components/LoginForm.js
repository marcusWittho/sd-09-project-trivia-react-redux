import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLoginInfo, addToken } from '../actions';
import { fetchAndSaveToken } from '../services';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      redirectparaSettings: false,
      name: '',
      email: '',
      redirect: false,
    };
    this.statusCheck = this.statusCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.createUserStateLocalStorage = this.createUserStateLocalStorage.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
  }

  handleSettings() {
    this.setState({
      redirectparaSettings: true,
    });
  }

  async handleClick() {
    this.createUserStateLocalStorage();
    this.createRankingOnLocalStorage();
    const { addLoginInfoDispatch, addTokenDispatch } = this.props;
    const { name, email } = this.state;
    addLoginInfoDispatch({ email, name });
    const { token } = await fetchAndSaveToken(addTokenDispatch);
    addTokenDispatch(token);
    localStorage.setItem('token', token);
    this.setState({
      redirect: true,
    });
  }

  createUserStateLocalStorage() {
    const { name, email } = this.state;
    const playerState = {
      player: { name,
        assertions: 0,
        score: 0,
        gravatarEmail: email },
    };
    localStorage.setItem('state', JSON.stringify(playerState));
    console.log(playerState);
  }

  createRankingOnLocalStorage() {
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
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
    const { email, name, redirect, redirectparaSettings } = this.state;
    return (
      <form>
        <label htmlFor="name-input">
          Nome:
          <input
            id="name-input"
            name="name"
            value={ name }
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
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        {redirect && <Redirect to="/game-page" />}
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleSettings }
        >
          Configuração
        </button>
        {redirectparaSettings && <Redirect to="/settings" />}
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addLoginInfoDispatch: (info) => dispatch(addLoginInfo(info)),
  addTokenDispatch: (token) => dispatch(addToken(token)),
});

LoginForm.propTypes = {
  addLoginInfoDispatch: PropTypes.func.isRequired,
  addTokenDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(LoginForm);
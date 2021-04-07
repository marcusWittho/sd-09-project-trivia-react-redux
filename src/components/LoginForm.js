import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLoginInfo, addToken } from '../actions';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      redirect: false,
    };
    this.statusCheck = this.statusCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.fetchAndSaveToken = this.fetchAndSaveToken.bind(this);
  }

  async fetchAndSaveToken() {
    const { addTokenDispatch } = this.props;
    const responseApi = fetch('https://opentdb.com/api_token.php?command=request');
    const token = await (await responseApi).json();
    addTokenDispatch(token.token);
    localStorage.setItem('token', token.token);
  }

  handleClick() {
    const { addLoginInfoDispatch } = this.props;
    const { name, email } = this.state;
    addLoginInfoDispatch({ email, name });
    this.fetchAndSaveToken();
    this.setState({
      redirect: true,
    });
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
    const { email, name, redirect } = this.state;
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
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        {redirect && <Redirect to="/game-page" />}
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

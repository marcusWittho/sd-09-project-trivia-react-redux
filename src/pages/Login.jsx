import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

import { fetchAPI } from '../redux/action';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      submmit: false,
      settings: false,
    };

    this.handleValidation = this.handleValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLocalStorage = this.handleLocalStorage.bind(this);
    this.formFunction = this.formFunction.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
  }

  handleLocalStorage() {
    const { token } = this.props;
    localStorage.setItem('token', token);
    this.setState({
      submmit: true,
    });
  }

  handleSettings() {
    this.setState({
      settings: true,
    });
  }

  handleValidation() {
    const { name, email } = this.state;
    return !(name && email);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  formFunction() {
    const { getToken } = this.props;
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
            onChange={ this.handleChange }
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
            onChange={ this.handleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          disabled={ this.handleValidation() }
          onClick={ async () => {
            await getToken();
            this.handleLocalStorage();
          } }
        >
          Entrar
        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.handleSettings }
        >
          Configurações
        </button>
      </form>
    );
  }

  render() {
    const { submmit, settings } = this.state;

    if (settings) {
      return (
        <Redirect to="/settings" />
      );
    }

    if (submmit) {
      return (
        <Redirect to="/game" />
      );
    }

    return (
      this.formFunction()
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchAPI()),
});

Login.propTypes = {
  token: PropTypes.string.isRequired,
  getToken: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

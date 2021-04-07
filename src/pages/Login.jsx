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
    };

<<<<<<< HEAD
    this.HandleValidation = this.HandleValidation.bind(this);
    this.HandleChange = this.HandleChange.bind(this);
    this.saveLocal = this.saveLocal.bind(this);
=======
    this.handleValidation = this.handleValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLocalStorage = this.handleLocalStorage.bind(this);
    this.formFunction = this.formFunction.bind(this);
  }

  handleLocalStorage() {
    const { token } = this.props;
    localStorage.setItem('token', token);
    this.setState({
      submmit: true,
    });
>>>>>>> f2cd80e65a9d3494aa763a8566d71d54a91b7a89
  }

  handleValidation() {
    const { name, email } = this.state;
    return !(name && email);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

<<<<<<< HEAD
  saveLocal() {
    localStorage.setItem('token', '123123');
  }

  render() {
=======
  formFunction() {
    const { getToken } = this.props;
>>>>>>> f2cd80e65a9d3494aa763a8566d71d54a91b7a89
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
<<<<<<< HEAD
          disabled={ this.HandleValidation() }
          onClick={ this.saveLocal }
        >
          entrar
=======
          disabled={ this.handleValidation() }
          onClick={ async () => {
            await getToken();
            this.handleLocalStorage();
          } }
        >
          Entrar
>>>>>>> f2cd80e65a9d3494aa763a8566d71d54a91b7a89
        </button>
      </form>
    );
  }

  render() {
    const { submmit } = this.state;

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

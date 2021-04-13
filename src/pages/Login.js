import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { loginAction } from '../actions/playerAction';
import getTrivia from '../actions/triviaAction';
import logo from '../trivia.png';
import requestToken from '../services/tokenAPI';
import ConfigButton from '../components/configButton';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.inputsControl = this.inputsControl.bind(this);

    this.state = {
      playerNameField: '',
      playerEmailField: '',
      button: true,
      loginValidation: false,
    };

    this.getTrivia = this.getTrivia.bind(this);
  }

  async getTrivia() {
    const { triviaDispatch } = this.props;
    const token = await requestToken();

    localStorage.setItem('token', token);
    await triviaDispatch(token);

    this.setState({
      loginValidation: true,
    });
  }

  validateInputs() {
    const { playerNameField, playerEmailField } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+.com$/i;
    const name = playerNameField;
    if (regex.test(playerEmailField) && name !== '') {
      this.setState({
        button: false,
      });
    } else {
      this.setState({
        button: true,
      });
    }
  }

  inputsControl({ target }) {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => this.validateInputs(),
    );
  }

  render() {
    const { playerEmailField, playerNameField, button, loginValidation } = this.state;
    const { loginDispatch } = this.props;
    if (loginValidation) return <Redirect push to="/game" />;
    return (
      <div className="App">
        <header className="App-header">
          <ConfigButton />
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
          <section className="inputs-section">
            <label htmlFor="name">
              <input
                type="text"
                name="playerNameField"
                value={ playerNameField }
                onChange={ this.inputsControl }
                data-testid="input-player-name"
                placeholder="Nome"
              />
            </label>
            <label htmlFor="email">
              <input
                type="text"
                name="playerEmailField"
                value={ playerEmailField }
                onChange={ this.inputsControl }
                data-testid="input-gravatar-email"
                placeholder="Email"
              />
            </label>
            <button
              type="button"
              data-testid="btn-play"
              disabled={ button }
              onClick={ () => {
                loginDispatch(playerNameField, playerEmailField);
                this.getTrivia();
              } }
              className="play-button"
            >
              Jogar
            </button>
          </section>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (name, email) => dispatch(loginAction(name, email)),
  triviaDispatch: (token) => dispatch(getTrivia(token)),
});

export default connect(null, mapDispatchToProps)(Login);

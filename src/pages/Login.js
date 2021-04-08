import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import loginAction from '../actions/loginAction';
import logo from '../trivia.png';
import requestToken from '../services/tokenAPI';

class Login extends Component {
  constructor(props) {
    super(props);

    this.inputsControl = this.inputsControl.bind(this);

    this.state = {
      playerNameField: '',
      playerEmailField: '',
      button: true,
    };

    this.saveToken = this.saveToken.bind(this);
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

  async saveToken() {
    const token = await requestToken();

    localStorage.setItem('token', token);
  }

  render() {
    const { playerEmailField, playerNameField, button } = this.state;
    const { loginDispatch } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configuração
            </button>
          </Link>
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>

          <section>
            <label htmlFor="name">
              Nome
              <input
                type="text"
                name="playerNameField"
                value={ playerNameField }
                onChange={ this.inputsControl }
                data-testid="input-player-name"
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="text"
                name="playerEmailField"
                value={ playerEmailField }
                onChange={ this.inputsControl }
                data-testid="input-gravatar-email"
              />
            </label>
            <Link to="/jogo">
              <button
                type="button"
                data-testid="btn-play"
                disabled={ button }
                onClick={ () => {
                  loginDispatch(playerNameField, playerEmailField);
                  this.saveToken();
                } }
              >
                Jogar
              </button>
            </Link>
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
});

export default connect(null, mapDispatchToProps)(Login);
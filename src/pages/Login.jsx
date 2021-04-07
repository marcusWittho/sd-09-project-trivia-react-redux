import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import setLoginAction from '../redux/Actions/setLoginAction';
import getToken from '../services/apiRequests';
import logo from '../trivia.png';
import SettingsButton from '../components/SettingsButton';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.isNotValidated = this.isNotValidated.bind(this);
    this.toPlay = this.toPlay.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderImputUserName = this.renderImputUserName.bind(this);
    this.renderImputUserEmail = this.renderImputUserEmail.bind(this);
    this.renderButtonPlay = this.renderButtonPlay.bind(this);

    this.state = {
      userEmail: '',
      userName: '',
      isNotValidated: true,
      redirect: false,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.isNotValidated());
  }

  isNotValidated() {
    const { userEmail, userName } = this.state;
    const emailValidated = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(userEmail);
    const userNameValidated = /[0-9a-zA-Z$*&@#]{4}/.test(userName);

    if (emailValidated && userNameValidated) {
      this.setState({
        isNotValidated: false,
      });
    } else {
      this.setState({
        isNotValidated: true,
      });
    }
  }

  async toPlay() {
    const { userName, userEmail } = this.state;
    const { addLogin } = this.props;
    addLogin(userName, userEmail);

    try {
      localStorage.setItem('token', await getToken());
    } catch (error) {
      console.error(error);
    }

    this.setState({
      redirect: true,
    });
  }

  renderHeader() {
    const { isNotValidated, userName, userEmail } = this.state;
    return (
      <header className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
        { this.renderImputUserName(userName) }
        { this.renderImputUserEmail(userEmail) }
        { this.renderButtonPlay(isNotValidated) }
      </header>
    );
  }

  renderImputUserName(userName) {
    return (
      <label htmlFor="user-name">
        Nome:
        <input
          type="text"
          id="user-name"
          data-testid="input-player-name"
          name="userName"
          value={ userName }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderImputUserEmail(userEmail) {
    return (
      <label htmlFor="user-email">
        Email:
        <input
          type="email"
          id="user-email"
          data-testid="input-gravatar-email"
          name="userEmail"
          value={ userEmail }
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderButtonPlay(isNotValidated) {
    return (
      <div>
        <button
          disabled={ isNotValidated }
          data-testid="btn-play"
          type="button"
          onClick={ this.toPlay }
        >
          Play
        </button>
        <SettingsButton />
      </div>
    );
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/screen-game" />;
    }

    return (
      <>
        { this.renderHeader() }
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addLogin: (userName, userEmail) => dispatch(setLoginAction(userName, userEmail)),
});

Login.propTypes = {
  addLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

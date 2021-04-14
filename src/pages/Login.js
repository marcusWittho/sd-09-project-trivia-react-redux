import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { doLogin } from '../actions/index';
import { getToken } from '../services/api';
import localStorageService from '../services/localStorage';

import Header from '../components/Header';
import Footer from '../components/Footer';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidName: true,
      invalidEmail: true,
      loginReady: false,
      name: '',
      email: '',
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.validateBtnLogin = this.validateBtnLogin.bind(this);
    this.enableButton = this.enableButton.bind(this);
  }

  async getAndSaveToken() {
    const token = await getToken();
    const { email, name } = this.state;
    localStorageService.savePlayer(name, email);
    localStorage.setItem('token', token);
    this.setState({ loginReady: true });
  }

  validateBtnLogin() {
    const { name, email } = this.state;
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (email.match(regexEmail)) {
      this.setState({ invalidEmail: false });
    } else {
      this.setState({ invalidEmail: true });
    }

    if (name.length !== 0) {
      this.setState({ invalidName: false });
    } else {
      this.setState({ invalidName: true });
    }
  }

  changeHandler(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => { this.validateBtnLogin(); });
  }

  enableButton() {
    const { name, email, invalidEmail, invalidName } = this.state;
    if (name === '' && email === '') return true;
    return (invalidEmail || invalidName);
  }

  render() {
    const { name, email, loginReady } = this.state;
    const { doFormLogin } = this.props;
    if (loginReady) return <Redirect to="/trivia" />;
    return (
      <>
        <Header />
        <main>
          <section className="login-form-container">
            <input
              data-testid="input-player-name"
              id="input-name"
              type="text"
              value={ name }
              placeholder="Nome"
              name="name"
              onChange={ (e) => { this.changeHandler(e); } }
            />
            <input
              data-testid="input-gravatar-email"
              id="input-email"
              type="email"
              value={ email }
              placeholder="Email"
              name="email"
              onChange={ (e) => { this.changeHandler(e); } }
            />
            <button
              type="button"
              className="login-btns"
              data-testid="btn-play"
              disabled={ this.enableButton() }
              onClick={ () => { doFormLogin({ name, email }); this.getAndSaveToken(); } }
            >
              Jogar
            </button>
            <Link className="config-btn" to="/settings" data-testid="btn-settings">
              <button className="login-btns" type="button">Configurações do jogo</button>
            </Link>
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  doFormLogin: (obj) => dispatch(doLogin(obj)),
});

const mapStateToProps = (state) => ({
  loginName: state.login.name,
  loginEmail: state.login.Email,
});

Login.propTypes = {
  doFormLogin: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

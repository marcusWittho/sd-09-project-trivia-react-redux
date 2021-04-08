import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { doLogin, getQuestionsToStore } from '../actions/index';
import { getToken, getQuestions } from '../services/api';
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
    this.getAndSaveQuestions = this.getAndSaveQuestions.bind(this);
  }

  async getAndSaveQuestions() {
    const token = await getToken();
    localStorage.setItem('token', token);
    const { saveQuestions } = this.props;
    const API_RESULT = await getQuestions(token);
    console.log(API_RESULT);
    saveQuestions(API_RESULT);
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
    if (loginReady) {
      return <Redirect to="/trivia" />;
    }
    return (
      <main>
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
          data-testid="btn-play"
          disabled={ this.enableButton() }
          onClick={ () => {
            doFormLogin({ name, email });
            this.getAndSaveQuestions();
          } }
        >
          Jogar
        </button>
        <Link to="/settings" data-testid="btn-settings">
          <button type="button">Configurações do jogo</button>
        </Link>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  doFormLogin: (obj) => dispatch(doLogin(obj)),
  saveQuestions: (questions) => dispatch(getQuestionsToStore(questions)),
});

const mapStateToProps = (state) => ({
  loginName: state.login.name,
  loginEmail: state.login.Email,
});

Login.propTypes = {
  doFormLogin: PropTypes.func.isRequired,
  saveQuestions: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

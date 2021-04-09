import React from 'react';
import { func } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { getAnswer, getToken } from '../services/triviaApi';
import { dataGame, handleToken, handleUserName, handleUserEmail } from '../redux/actions';
import './css/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      email: '',
      disableButton: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.fetchAnswer = this.fetchAnswer.bind(this);
    this.updateGlobalStates = this.updateGlobalStates.bind(this);
  }

  /* componentDidMount() {
    this.fetchAnswer();
  } */

  async updateGlobalStates() {
    const { propHandleToken, propHandleUser, propHandleEmail } = this.props;
    const { user, email } = this.state;
    const token = await getToken();
    propHandleToken(token.token);
    localStorage.setItem('token', token.token);
    propHandleUser(user);
    propHandleEmail(md5(email).toString());
    this.fetchAnswer();
  }

  async fetchAnswer() {
    const localToken = localStorage.getItem('token');
    const numQuestion = 5;
    const answer = await getAnswer(numQuestion, localToken);
    const msg = 'Sessão expirada';
    const { propDataGame } = this.props;
    const status = 3;
    if (answer.response_code === status) return propDataGame(msg);
    propDataGame(answer.results);
  }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value }, () => {
      const { user, email } = this.state;
      const regex = /\S+@\S+\.\S+/;
      const min = 0;
      if (regex.test(email) && user.length > min) {
        this.setState({ disableButton: false });
      } else this.setState({ disableButton: true });
    });
  }

  render() {
    const { disableButton } = this.state;
    return (
      <div className="form-login">
        <form className="fieldset-login">
          <label htmlFor="enter-name">
            Nome:
            <input
              id="enter-name"
              data-testid="input-player-name"
              type="text"
              name="user"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="enter-email" className="label-login">
            E-mail:
            <input
              id="enter-email"
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/question">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ disableButton }
              onClick={ this.updateGlobalStates }
            >
              Jogar
            </button>
          </Link>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  propDataGame: (data) => dispatch(dataGame(data)),
  propHandleToken: (data) => dispatch(handleToken(data)),
  propHandleUser: (user) => dispatch(handleUserName(user)),
  propHandleEmail: (email) => dispatch(handleUserEmail(email)),
});

Login.propTypes = {
  propDataGame: func,
  propHandlePlayerData: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);

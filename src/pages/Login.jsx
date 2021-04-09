import React from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { Link } from 'react-router-dom';
import { saveUserToken, saveRequest, getQuestions } from '../actions';
import { REQUEST_TOKEN } from '../services';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: String(),
      email: String(),
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.requestUserToken = this.requestUserToken.bind(this);
    this.savePlayerInfo = this.savePlayerInfo.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
      disabled: true,
    }, () => this.validateLogin(this.state));
  }

  validateLogin({ name, email }) {
    if (email && name) {
      this.setState({
        disabled: false,
      });
    }
  }

  async requestUserToken() {
    const { getUserToken } = this.props;
    const token = await REQUEST_TOKEN();
    getUserToken(token);
  }

  savePlayerInfo({ name, email }) {
    const playerInfo = {
      name,
      gravatarEmail: email,
      assertions: 0,
      score: 0,
    };
    localStorage.setItem('player', JSON.stringify(playerInfo));
  }

  render() {
    const { email, name, disabled } = this.state;
    return (
      <section>
        <label htmlFor="userEmail">
          Email do Gravatar:
          <input
            data-testid="input-gravatar-email"
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="userName">
          Nome do Jogador:
          <input
            data-testid="input-player-name"
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/triviaGame">
          <button
            data-testid="btn-play"
            disabled={ disabled }
            type="button"
            onClick={ () => {
              this.requestUserToken();
              this.savePlayerInfo(this.state);
            } }
          >
            JOGAR!
          </button>
        </Link>
        <Link to="/Config">
          <button type="button" data-testid="btn-settings">Configurações</button>
        </Link>
        <Link to="/Rankings">
          <button type="button" data-testid="btn-ranking">Ver Ranking</button>
        </Link>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUserToken: (token) => {
    dispatch(saveRequest());
    dispatch(saveUserToken(token));
    dispatch(getQuestions(token));
  },
});

Login.propTypes = {
  getUserToken: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);

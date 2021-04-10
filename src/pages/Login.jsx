import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import { gravatarHash, fetchThunkToken } from '../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      buttonDisable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    }, () => this.validInput());
  }

  validInput() {
    const { name, email } = this.state;
    const validEmail = new RegExp(/[a-z0-9]+@[a-z]+.[a-z]{2,}$/g);
    const validName = new RegExp(/[A-Za-z0-9]{6,}$/);
    if (validEmail.test(email) && validName.test(name)) {
      this.setState({ buttonDisable: false });
    } else this.setState({ buttonDisable: true });
  }

  handleClick() {
    const { email, name } = this.state;
    const { getGravatar, fetchToken, config } = this.props;
    const hashEmail = md5(email).toString();
    getGravatar(hashEmail, name);
    this.savePlayerLocalStorage(hashEmail, name);
    fetchToken(config);
  }

  savePlayerLocalStorage(hashEmail, name) {
    const player = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail: hashEmail,
    };
    const state = { player };
    return localStorage.setItem('state', JSON.stringify(state));
  }

  render() {
    const { name, email, buttonDisable } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="input-player-name"
          value={ name }
          placeholder="Name"
          onChange={ this.handleChange }
          name="name"
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          value={ email }
          placeholder="email@email.com"
          onChange={ this.handleChange }
          name="email"
        />
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ buttonDisable }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </Link>
        <Link to="/settings" data-testid="btn-settings">Configurações</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  config: state.trivia.config,
});

const mapDispatchToPropos = (dispatch) => ({
  getGravatar: (hashEmail, name) => dispatch(gravatarHash(hashEmail, name)),
  fetchToken: (URL) => dispatch(fetchThunkToken(URL)),
});

Login.propTypes = {
  getGravatar: PropTypes.func,
  fetchToken: PropTypes.func,
}.isRequered;

export default connect(mapStateToProps, mapDispatchToPropos)(Login);

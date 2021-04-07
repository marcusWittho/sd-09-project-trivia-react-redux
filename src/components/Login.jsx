import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import logo from '../trivia.png';
import { fetchToken, setGravatarImage } from '../redux/actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      playButton: false,
    };

    this.startGame = this.startGame.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value }, () => this.validateFields());
  }

  saveToLocalStorage() {
    const { name, email: gravatarEmail } = this.state;
    const player = { name, gravatarEmail };
    localStorage.setItem('player', JSON.stringify(player));
  }

  async startGame() {
    const { setToken, dispatchSetGravatarImage } = this.props;
    const { email } = this.state;
    const emailHash = MD5(email).toString();
    await setToken();
    await dispatchSetGravatarImage(emailHash);
    this.saveToLocalStorage();
  }

  validateFields() {
    const { name, email } = this.state;
    const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const playButton = name.length > 0 && regex.test(email);
    this.setState({ playButton });
  }

  render() {
    const { playButton } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              data-testid="input-player-name"
              onChange={ this.onChange }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="text"
              id="email"
              data-testid="input-gravatar-email"
              onChange={ this.onChange }
            />
          </label>
          <Link to="/play">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ !playButton }
              onClick={ this.startGame }
            >
              Play!
            </button>
          </Link>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Settings
            </button>
          </Link>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  setToken: PropTypes.func,
  dispatchSetGravatarImage: PropTypes.func,
  token: PropTypes.shape(),
}.isRequired;

const mapStatetoProps = (state) => ({
  token: state.triviaReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  setToken: () => dispatch(fetchToken()),
  dispatchSetGravatarImage: (emailHash) => dispatch(setGravatarImage(emailHash)),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Login);

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchToken } from '../redux/actions';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: '',
      email: '',
      playButton: false,
    };

    this.startGame = this.startGame.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate() {
    this.saveToLocalStorage();
  }

  onChange({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value }, () => this.validateFields());
  }

  saveToLocalStorage() {
    const { token } = this.props;
    localStorage.setItem('token', token.token);
  }

  async startGame() {
    const { setToken } = this.props;
    await setToken();
  }

  validateFields() {
    const { player, email } = this.state;
    const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const playButton = player.length > 0 && regex.test(email);
    this.setState({ playButton });
    localStorage.setItem('player', player);
  }

  render() {
    const { playButton } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <label htmlFor="player">
            Name
            <input
              type="text"
              id="player"
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
  setToken: PropTypes.func.isRequired,
  token: PropTypes.shape().isRequired,
};

const mapStatetoProps = (state) => ({
  token: state.triviaReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  setToken: () => dispatch(fetchToken()),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Login);

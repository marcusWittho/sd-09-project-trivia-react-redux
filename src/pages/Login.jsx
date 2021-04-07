import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchNewGameToken, newPlayerInfo } from '../actions';

class Login extends Component {
  constructor(state) {
    super(state);
    this.state = {
      name: '',
      email: '',
      status: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({ status: false });
    }
    if (name.length === 0 && email.length === 0) {
      this.setState({ status: true });
    }
  }

  startNewGame() {
    const { name, email } = this.state;
    const { dispatchNewGame, dispatchPlayer } = this.props;
    dispatchPlayer(name, email);
    dispatchNewGame();
  }

  render() {
    const { name, email, status } = this.state;

    return (
      <div>
        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Configuração
          </button>
        </Link>
        <div>SUA VEZ</div>
        <input
          type="text"
          data-testid="input-player-name"
          name="name"
          placeholder="Place your name here"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          name="email"
          placeholder="Place your email here"
          value={ email }
          onChange={ this.handleChange }
        />

        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ status }
            onClick={ this.startNewGame }
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  dispatchNewGame: PropTypes.func,
  dispatchPlayer: PropTypes.func,
};

Login.defaultProps = {
  dispatchNewGame: PropTypes.func,
  dispatchPlayer: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchNewGame: () => dispatch(fetchNewGameToken()),
  dispatchPlayer: (name, email) => dispatch(newPlayerInfo(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);

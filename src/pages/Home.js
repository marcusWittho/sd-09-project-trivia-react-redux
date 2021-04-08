import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import { asyncToken, loginAction } from '../actions';
import logo from '../trivia.png';
import { createPlayerInRanking } from '../services/localStorage';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { username, email } = this.state;
    const { loginActionFunc, saveToken } = this.props;
    const emailHash = md5(email).toString();
    const requestHash = `https://www.gravatar.com/avatar/${emailHash}`;
    saveToken();
    loginActionFunc(username, email);
    const objPlayer = {
      player: {
        name: username,
        assertions: '',
        score: 0,
        gravatarEmail: email,
      },
    };
    const rankingInfos = {
      name: username,
      userEmail: email,
      score: 0,
      picture: requestHash,
    };
    createPlayerInRanking(rankingInfos);
    localStorage.setItem('state', JSON.stringify(objPlayer));
  }

  disableButton(username, email) {
    return username.length === 0 || email.length === 0;
  }

  render() {
    const { username, email } = this.state;
    return (
      <div>
        <img src={ logo } alt="Trivia Logo" className="image-trivia" />
        <form>
          <label htmlFor="player-name">
            Player Name:
            <input
              id="player-name"
              name="username"
              data-testid="input-player-name"
              onChange={ this.handleChange }
              value={ username }
            />
          </label>
          <label htmlFor="gravatar-email">
            Gravatar E-mail:
            <input
              id="gravatar-email"
              name="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <Link to="/play">
            <button
              type="submit"
              data-testid="btn-play"
              disabled={ this.disableButton(username, email) }
              onClick={ () => this.handleClick() }
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

Home.propTypes = {
  saveToken: PropTypes.func.isRequired,
  loginActionFunc: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  saveToken: () => dispatch(asyncToken()),
  loginActionFunc: (username, email) => dispatch(loginAction(username, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

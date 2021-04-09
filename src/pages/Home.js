import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncToken, loginAction } from '../actions';
import logo from '../trivia.png';
import { createRanking } from '../services/localStorage';
import { getGravatar } from '../serviceAPI';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
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
    saveToken();
    loginActionFunc(username, email);
    getGravatar(email).then((response) => {
      const player = {
        player: {
          name: username,
          assertions: 0,
          score: 0,
          gravatarEmail: response.url,
        },
      };
      localStorage.setItem('state', JSON.stringify(player));
    });
    createRanking();
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
              disabled={ (!email || !username) }
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

const mapDispatchToProps = (dispatch) => ({
  saveToken: () => dispatch(asyncToken()),
  loginActionFunc: (username, email) => dispatch(loginAction(username, email)),
});

export default connect(null, mapDispatchToProps)(Home);

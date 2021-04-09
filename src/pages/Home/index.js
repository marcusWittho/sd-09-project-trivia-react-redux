import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncToken, loginAction } from '../../actions';
import logo from '../../trivia.png';
import { createRanking } from '../../services/localStorage';
import { getGravatar } from '../../serviceAPI';
import './styles.css';

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
      <div className="container-page-login">
        <img src={ logo } alt="Trivia Logo" className="image-trivia" />
        <form className="form-login">
          <label htmlFor="player-name">
            <input
              placeholder="Username"
              id="player-name"
              name="username"
              data-testid="input-player-name"
              onChange={ this.handleChange }
              value={ username }
            />
          </label>
          <label htmlFor="gravatar-email">
            <input
              placeholder="Email"
              id="gravatar-email"
              name="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <Link to="/play" className="link-btn">
            <button
              className="play-btn"
              type="submit"
              data-testid="btn-play"
              disabled={ (!email || !username) }
              onClick={ () => this.handleClick() }
            >
              Jogar
            </button>
          </Link>
          <Link to="/settings" className="link-btn">
            <button
              className="config-btn"
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

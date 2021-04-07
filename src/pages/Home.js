import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncToken, loginAction } from '../actions';
import logo from '../trivia.png';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      score: 0,
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
    const { username, email, score } = this.state;
    const { loginActionFunc, saveToken } = this.props;
    saveToken();
    loginActionFunc(username, email, score);
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

const mapDispatchToProps = (dispatch) => ({
  saveToken: () => dispatch(asyncToken()),
  loginActionFunc:
    (username, email, score) => dispatch(loginAction(username, email, score)),
});

export default connect(null, mapDispatchToProps)(Home);

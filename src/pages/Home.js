import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncToken } from '../actions';
import logo from '../trivia.png';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  disableButton(username, email) {
    return username.length === 0 || email.length === 0;
  }

  render() {
    const { username, email } = this.state;
    const { saveToken } = this.props;
    return (
      <div>
        <form>
          <img src={ logo } alt="Trivia Logo" />
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
              onClick={ () => saveToken() }
            >
              Jogar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

Home.propTypes = {
  saveToken: PropTypes.func.isRequired,
};

const mapStateToProps = (dispatch) => ({
  saveToken: () => dispatch(asyncToken()),
});

export default connect(null, mapStateToProps)(Home);

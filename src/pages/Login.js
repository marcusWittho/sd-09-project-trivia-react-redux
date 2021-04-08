import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import triviaTokenRequest from '../services/api';
import { updateToken } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, () => {
      const { name, email } = this.state;
      if (name && email) {
        this.setState({ buttonDisabled: false });
      } else {
        this.setState({ buttonDisabled: true });
      }
    });
  }

  async handleClick() {
    const { fetchToken } = this.props;
    const token = await triviaTokenRequest();
    console.log(token);
    fetchToken(token);
    localStorage.setItem('token', token);
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            id="name"
            type="text"
            name="name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            id="email"
            type="text"
            name="email"
            onChange={ this.handleChange }
          />
        </label>

        <Link to="/game">
          <button
            data-testid="btn-play"
            type="button"
            onClick={ this.handleClick }
            disabled={ buttonDisabled }
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  fetchToken: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchToken: (token) => dispatch(updateToken(token)),
});

const mapStateToProps = (state) => ({
  token: state.player.player.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

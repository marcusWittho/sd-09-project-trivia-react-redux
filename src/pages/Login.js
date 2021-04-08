import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import triviaTokenRequest from '../services/api';
import { updatePlayerName, updatePlayerEmail, updateToken } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);

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
    const { storeName, storeEmail, storeToken } = this.props;
    const { name, email } = this.state;
    const token = await triviaTokenRequest();
    storeToken(token);
    storeName(name);
    storeEmail(email);
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
        <Link to="/settings">
          <button
            data-testid="btn-settings"
            type="button"
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  storeToken: PropTypes.func.isRequired,
  storeName: PropTypes.func.isRequired,
  storeEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  storeToken: (token) => dispatch(updateToken(token)),
  storeName: (name) => dispatch(updatePlayerName(name)),
  storeEmail: (email) => dispatch(updatePlayerEmail(email)),
});

const mapStateToProps = (state) => ({
  token: state.player.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

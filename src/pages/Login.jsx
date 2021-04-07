import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchNewGameToken } from '../actions';

class Login extends Component {
  constructor(state) {
    super(state);
    this.state = {
      name: '',
      email: '',
      status: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
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

  handleStatus() {

  }

  render() {
    const { name, email, status } = this.state;
    const { dispatchNewGame } = this.props;
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
            onClick={ dispatchNewGame }
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
};

Login.defaultProps = {
  dispatchNewGame: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchNewGame: () => dispatch(fetchNewGameToken()),
});

export default connect(null, mapDispatchToProps)(Login);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTokenThunk } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    const { name, email } = this.state;
    const { getToken } = this.props;

    return (
      <form action="">
        <label htmlFor="input-player-name">
          Nome:
          <input
            onChange={ this.handleChange }
            data-testid="input-player-name"
            type="text"
            name="name"
            value={ name }
            id="input-player-name"
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email:
          <input
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            value={ email }
            id="input-gravatar-email"
          />
        </label>
        <button
          onClick={ () => getToken() }
          data-testid="btn-play"
          type="button"
          disabled={ !name || !email }
        >
          Jogar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(getTokenThunk()),
});

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

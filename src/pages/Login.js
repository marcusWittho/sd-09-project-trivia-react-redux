import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveLoginInfo } from '../actions';
import tokenAPI from '../services/api';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nickname: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  }

  async fetchToken() {
    const token = await tokenAPI();
    console.log(token);
    localStorage.setItem('token', token);
  }

  handleClick() {
    const { email, nickname } = this.state;
    const { loginData } = this.props;
    loginData(email, nickname);
    this.fetchToken();
  }

  render() {
    const { email, nickname } = this.state;
    const patternEmail = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    return (
      <div>
        <form>
          <label htmlFor="input-email">
            Email:
            <input
              type="email"
              name="email"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
              pattern={ patternEmail }
            />
          </label>
          <label htmlFor="input-name">
            Nome:
            <input
              type="text"
              name="nickname"
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.handleClick }
            disabled={ !((patternEmail.test(email)) && (nickname.length > 0)) }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginData: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loginData: (email, nickname) => dispatch(saveLoginInfo(email, nickname)),
});

export default connect(null, mapDispatchToProps)(Login);

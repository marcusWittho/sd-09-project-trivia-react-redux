import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../Styles/Login.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { setUser } from '../Actions';
import { setToken } from '../Actions/setLogin';
import SettingsButton from '../Components/SettingsButton';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  validateLogin() {
    const { name, email } = this.state;
    const validateName = name.length > 1;
    const validateEmail = email.length > 1;
    return validateName && validateEmail;
  }

  handleClick() {
    const { saveUser, setLogin } = this.props;
    const { email, name } = this.state;
    saveUser(email, name);
    setLogin();
  }

  render() {
    const { name, email } = this.state;
    return (
      <div className="container">
        <h2 className="title">
          Trivia
        </h2>
        <div className="insert-login">
          <input
            type="text"
            name="name"
            value={ name }
            className="input-login"
            placeholder="Name"
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
          <input
            name="email"
            type="text"
            value={ email }
            className="input-login"
            placeholder="E-mail"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />

          <Link to="/trivia">
            <button
              type="button"
              data-testid="btn-play"
              className="btn-play"
              disabled={ !this.validateLogin() }
              onClick={ this.handleClick }
            >
              Play
            </button>
          </Link>
          <SettingsButton />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (email, name) => dispatch(setUser(email, name)),
  setLogin: () => dispatch(setToken()),
});

Login.propTypes = {
  saveUser: PropTypes.func.isRequired,
  setLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

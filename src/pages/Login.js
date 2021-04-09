import React from 'react';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';
import { StartGameButton, SettingsButton } from '../components';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.submitLogin = this.submitLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.buttonStatus = this.buttonStatus.bind(this);
    this.state = { userName: '', email: '' };
  }

  componentDidUpdate() {
    this.submitLogin();
  }

  submitLogin() {
    const { submit } = this.props;
    const { userName, email } = this.state;
    submit(userName, email);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  buttonStatus() {
    const { userName, email } = this.state;
    return !((userName !== '') && (email !== ''));
  }

  render() {
    const { userName, email } = this.state;
    return (
      <form>
        <label htmlFor="name-input">
          Name:
          <input
            data-testid="input-player-name"
            id="name-input"
            name="userName"
            value={ userName }
            type="text"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email-input">
          Email:
          <input
            data-testid="input-gravatar-email"
            id="email-input"
            name="email"
            value={ email }
            type="text"
            onChange={ this.handleChange }
          />
        </label>
        <Link to="/question">
          <StartGameButton buttonStatus={ this.buttonStatus() } />
        </Link>
        <SettingsButton />
      </form>
    );
  }
}

Login.propTypes = { submit: func }.isRequired;

const mapDispatchToProps = (dispatch) => ({
  submit: (name, email) => dispatch(login(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);

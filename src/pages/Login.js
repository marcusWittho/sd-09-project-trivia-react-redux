import React from 'react';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { WelcomeScreen } from '../components';
import { login, setAssertions } from '../actions';
import { getToken } from '../services/api';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.submitLogin = this.submitLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.buttonStatus = this.buttonStatus.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = { userName: '', email: '' };
  }

  componentDidMount() {
    const { clearAssertions } = this.props;
    clearAssertions();
  }

  componentDidUpdate() {
    this.submitLogin();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  buttonStatus() {
    const { userName, email } = this.state;
    return !((userName !== '') && (email !== ''));
  }

  submitLogin() {
    const { submit } = this.props;
    const { userName, email } = this.state;
    submit(userName, email);
  }

  async handleClick() {
    this.submitLogin();
    const token = await getToken();
    localStorage.token = `${token}`;
  }

  render() {
    const { userName, email } = this.state;
    return (
      <section className="login-header">
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
          <Link to="/trivia">
            <button
              type="button"
              data-testid="btn-play"
              onClick={ this.handleClick }
              disabled={ this.buttonStatus() }
            >
              Start Game
            </button>
          </Link>
          <Link to="/settings">
            <button data-testid="btn-settings" type="button" onClick={ this.redirect }>
              Settings
            </button>
          </Link>
        </form>
        <WelcomeScreen />
      </section>
    );
  }
}

Login.propTypes = { submit: func }.isRequired;

const mapDispatchToProps = (dispatch) => ({
  submit: (name, email) => dispatch(login(name, email)),
  clearAssertions: () => dispatch(setAssertions()),
});

export default connect(null, mapDispatchToProps)(Login);

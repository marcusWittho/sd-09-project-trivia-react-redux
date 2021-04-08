import React from 'react';
import { func } from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { getToken } from '../services/triviaApi';
import { handleToken, handleUserName, handleUserEmail } from '../redux/actions';
import './css/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      email: '',
      disableButton: true,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateGlobalStates = this.updateGlobalStates.bind(this);
    // this.redirect = this.redirect.bind(this);
  }

  async updateGlobalStates() {
    const { propHandleToken, propHandleUser, propHandleEmail } = this.props;
    const { user, email } = this.state;
    const token = await getToken();
    propHandleToken(token.token);
    localStorage.setItem('token', token.token);
    propHandleUser(user);
    propHandleEmail(md5(email).toString());
    // redirect();
  }

  // redirect() {
  //   const { emailDispatcher } = this.props;
  //   const { email } = this.state;
  //   this.setState({ redirect: true });
  //   emailDispatcher(email);
  // }

  handleChange({ target: { value, name } }) {
    this.setState({ [name]: value }, () => {
      const { user, email } = this.state;
      const regex = /\S+@\S+\.\S+/;
      const min = 0;
      if (regex.test(email) && user.length > min) {
        this.setState({ disableButton: false });
      } else this.setState({ disableButton: true });
    });
  }

  render() {
    const { disableButton, redirect } = this.state;
    // if (redirect) return (<Redirect to="/question" />);
    return (
      <div className="form-login">
        <form className="fieldset-login">
          <label htmlFor="enter-name">
            Nome:
            <input
              id="enter-name"
              data-testid="input-player-name"
              type="text"
              name="user"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="enter-email" className="label-login">
            E-mail:
            <input
              id="enter-email"
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <Link to="/jogo">
            <button
              type="button"
              data-testid="btn-play"
              disabled={ disableButton }
              onClick={ this.updateGlobalStates }
            >
              Jogar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  propHandleToken: (data) => dispatch(handleToken(data)),
  propHandleUser: (user) => dispatch(handleUserName(user)),
  propHandleEmail: (email) => dispatch(handleUserEmail(email)),
});

Login.propTypes = {
  propHandlePlayerData: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);

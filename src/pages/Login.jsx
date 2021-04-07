import React from 'react';
import { func } from 'prop-types';
// import { handleEmail } from '../actions';
import './css/login.css';

class Login extends React.Component {
  // handleValidateLogin() {
  //   const { email, password } = this.state;
  //   const validateEmail = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
  //   const passwordLength = password.length;
  //   const minPasswordLength = 1;
  //   if (validateEmail.test(email) && passwordLength >= minPasswordLength) {
  //     this.setState({ desactivatedButton: false });
  //   } else {
  //     this.setState({ desactivatedButton: true });
  //   }
  // }

  render() {
    return (
      <div className="form-login">
        <h2 className="title">Login</h2>
        <form className="fieldset-login">
          <label htmlFor="email-input" className="label-login">
            E-mail:
            <input
              id="email-input"
              data-testid="input-gravatar-email"
              type="email"
              name="email"
              // onChange={ ({ target }) => this.handleInputChange(target) }
            />
          </label>
          <label htmlFor="input-player-name">
            Nome:
            <input
              id="input-player-name"
              data-testid="name-input"
              type="text"
              name="name-input"
              // onChange={ ({ target }) => this.handleInputChange(target) }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            // disabled={ desactivatedButton }
            // onClick={ this.redirect }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  emailDispatcher: func,
}.isRequired;

export default Login;

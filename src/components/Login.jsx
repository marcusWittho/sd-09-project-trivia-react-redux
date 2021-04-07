import React from 'react';
import '../App.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      name: '',
      isDisabled: true,
      validatedEmail: false,
      validatedPassword: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.credentialValidation = this.credentialValidation.bind(this);
    this.enableLoginBtn = this.enableLoginBtn.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      isDisabled: true,
    });
    this.credentialValidation(target);
    this.setState({ [target.name]: target.value }, () => this.enableLoginBtn());
  }

  credentialValidation(target) {
    const validated = new RegExp(/^[\w.]+/g);
    if (target.name === 'email') {
      this.setState({ validatedEmail: validated.test(target.value) });
    }
    if (target.name === 'name') {
      this.setState({ validatedPassword: validated.test(target.value) });
    }
  }

  enableLoginBtn() {
    const { validatedEmail, validatedPassword } = this.state;
    if (validatedEmail === true && validatedPassword === true) {
      this.setState({ isDisabled: false });
    }
  }

  render() {
    const { email, name, isDisabled } = this.state;
    return (
      <div>
        <input
          name="email"
          type="text"
          value={ email }
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="name"
          value={ name }
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisabled }
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;

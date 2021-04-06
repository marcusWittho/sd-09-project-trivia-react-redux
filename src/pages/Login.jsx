import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyTextInputs = this.verifyTextInputs.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  verifyTextInputs() {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      return false;
    }
    return true;
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form>
          <label
            htmlFor="name-input"
          >
            Nome:
            <input
              type="text"
              itemID="name-input"
              data-testid="input-player-name"
              name="name"
              value={ name }
              onChange={ this.handleChange }
              required
            />
          </label>
          <label
            htmlFor="email-input"
          >
            E-mail:
            <input
              type="email"
              itemID="email-input"
              data-testid="input-gravatar-email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              required
            />
          </label>
        </form>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ this.verifyTextInputs() }
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;

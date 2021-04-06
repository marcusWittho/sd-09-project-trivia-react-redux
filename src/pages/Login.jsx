import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      disabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  verifyTextInputs() {

  }

  render() {
    const { name, email, disabled } = this.state;
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
          disabled={ disabled }
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;

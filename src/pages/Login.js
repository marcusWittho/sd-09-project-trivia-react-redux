import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState(() => ({
      [name]: value,
    }), () => {
      const { name: nameInput, email } = this.state;
      if ((email.length > 0)
        && (nameInput.length > 0)
        && (/\S+@\S+\.\S+/.test(email))) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  }

  handleClick() {

  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div>
        <form>
          <h1>Login</h1>
          <label htmlFor="name-input">
            Nome
            <input
              id="name-input"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="email-input">
            Email
            <input
              id="email-input"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            onClick={ this.handleClick }
            disabled={ isDisabled }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;

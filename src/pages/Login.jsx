import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };

    this.HandleValidation = this.HandleValidation.bind(this);
    this.HandleChange = this.HandleChange.bind(this);
  }

  HandleValidation() {
    const { name, email } = this.state;
    const testValidation = /[a-z|0-9|._]*@[a-z|0-9]*[.][a-z]/;
    return !(email.match(testValidation) && name.length > 0);
  }

  HandleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form
        className="
        bg-success
        p-5 m-auto
        d-flex
        flex-column
        align-items-center
        justify-content-center"
      >
        <h1>Login</h1>
        <label htmlFor="name">
          Nome
          <input
            id="name"
            name="name"
            className="m-3 form-control"
            type="text"
            placeholder="Nome"
            data-testid="input-player-name"
            onChange={ this.HandleChange }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            className="m-3 form-control"
            type="text"
            placeholder="Email"
            data-testid="input-gravatar-email"
            onChange={ this.HandleChange }
          />
        </label>
        <button
          data-testid="btn-play"
          className="btn btn-warning"
          type="button"
          disabled={ this.HandleValidation() }
        >
          entrar

        </button>
      </form>
    );
  }
}

export default Login;

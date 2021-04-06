import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  handleInputChange({ target }) {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({ [name]: value });
  }

  validateFields(username, email) {
    const re = /[^@]+@[^.]+\..+/g;

    const emailTest = re.test(String(email).toLocaleLowerCase());
    const usernameTest = username.length > 0;

    return (emailTest && usernameTest);
  }

  render() {
    const { username, email } = this.state;
    const isDisabled = !this.validateFields(username, email);
    return (
      <div>
        <label htmlFor="input-player-name">
          Nome:
          <input
            data-testid="input-player-name"
            id="input-player-name"
            name="username"
            type="text"
            onChange={ this.handleInputChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email:
          <input
            data-testid="input-gravatar-email"
            id="input-gravatar-email"
            name="email"
            type="email"
            onChange={ this.handleInputChange }
          />
        </label>
        <button
          type="submit"
          data-testid="btn-play"
          onClick={ this.handleClick }
          disabled={ isDisabled }
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default Login;

import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      email: '',
      name: '',
    };
    this.formGenerator = this.formGenerator.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inputsValidator = this.inputsValidator.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.inputsValidator());
  }

  inputsValidator() {
    const { email, name } = this.state;
    const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
    if (emailRegex.test(email) && name.length > 0) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  formGenerator() {
    const { isDisabled } = this.state;
    return (
      <div>
        <label htmlFor="input-player-name">
          Nome:
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            id="input-player-name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email:
          <input
            type="text"
            name="email"
            data-testid="input-gravatar-email"
            id="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ isDisabled }
          onClick={ () => console.log('clicou!') }
        >
          Jogar
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.formGenerator() }
      </div>
    );
  }
}

export default Login;

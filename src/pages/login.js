import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      submitButtonEnabled: false,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.validateFields.bind(this).call();
    });
  }

  validateFields() {
    const { name, email } = this.state;
    const regexCheck = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    this.setState({
      submitButtonEnabled: regexCheck.test(email) && name.length > 0,
    });
  }

  render() {
    const { name, email, submitButtonEnabled } = this.state;
    return (
      <form>
        <label htmlFor="name">
          User Name
          <input
            type="text"
            name="name"
            data-testid="input-player-name"
            id="name"
            value={ name }
            onChange={ this.handleChange.bind(this) }
          />
        </label>
        <br />
        <label htmlFor="email">
          Gravatar Email
          <input
            type="text"
            name="email"
            data-testid="input-gravatar-email"
            id="email"
            value={ email }
            onChange={ this.handleChange.bind(this) }
          />
        </label>
        <br />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !submitButtonEnabled }
        >
          Começar a Jogar
        </button>
      </form>
    );
  }
}

export default Login;

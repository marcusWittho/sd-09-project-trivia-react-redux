import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  handleEmail(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    const { name, email } = this.state;
    const enabled = email.length > 0
    && name.length > 0;
    return (
      <form onSubmit={ this.handleSubmit }>

        <p>Nome:</p>
        <input
          type="text"
          name="name"
          data-testid="input-player-name"
          onChange={ this.handleName }
        />

        <p>Email:</p>
        <input
          type="text"
          name="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleEmail }
        />

        <button
          disabled={ !enabled }
          type="button"
          data-testid="btn-play"

        >
          Jogar

        </button>
      </form>

    );
  }
}

export default Login;

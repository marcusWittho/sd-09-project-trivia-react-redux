import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
    };
    this.getValue = this.getValue.bind(this);
  }

  getValue({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { name, email } = this.state;
    const disableButton = name === '' || email === '';

    return (
      <section>
        <input
          name="name"
          data-testid="input-player-name"
          type="text"
          onChange={ this.getValue }
        />
        <input
          name="email"
          data-testid="input-gravatar-email"
          type="email"
          onChange={ this.getValue }
        />
        <input
          data-testid="btn-play"
          type="button"
          disabled={ disableButton }
          value="Jogar"
        />
      </section>
    );
  }
}

export default Login;

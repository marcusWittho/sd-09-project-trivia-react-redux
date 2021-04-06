import React, { Component } from 'react';

export default class Login extends Component {
  constructor(state) {
    super(state);
    this.state = {
      name: '',
      email: '',
      status: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value.length > 0) {
      this.setState({ status: false });
    }
    if (e.target.value.length === 0) {
      this.setState({ status: true });
    }
  }

  handleStatus() {

  }

  render() {
    const { name, email, status } = this.state;
    return (

      <div>
        <div>SUA VEZ</div>
        <input
          type="text"
          data-testid="input-player-name"
          name="name"
          value={ name }
          onChange={ this.handleChange }
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />

        <button type="button" disabled={ status }>Jogar</button>
      </div>
    );
  }
}

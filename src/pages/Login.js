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
        {/* // A pessoa que joga deve conseguir escrever seu nome no input de texto */}
        <input
          type="text"
          data-testid="input-player-name"
          name="name"
          value={ name }
          onChange={ this.handleChange }
        />
        {/* // A pessoa que joga deve conseguir escrever seu email no input de email */}
        <input
          type="email"
          data-testid="input-gravatar-email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
        />
        {/* // O botão "Jogar" deve ser desabilitado caso
        email e/ou nome não estejam preenchidos */}
        <button type="button" disabled={ status }>Jogar</button>
      </div>
    );
  }
}

// O campo de texto para o nome deve possuir o atributo data-testid com o valor input-player-name
// O campo de texto para o email deve possuir o atributo data-testid com o valor input-gravatar-email
// O botão "Jogar" que leva a pessoa ao jogo deve possuir o atributo data-testid com o valor btn-play

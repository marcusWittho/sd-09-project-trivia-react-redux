import React from 'react';

class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
    };
  }

  handleClick() {

  }

  render() {
    return (
      <div>
        <p>Login</p>
        <div>
          <input name="nome" type="text" placeholder="Nome: " onChange={ this.handleChange } />
          <input name="email" type="email" placeholder="Email: " />
        </div>
        <br />
        <button type="button" onClick={ this.handleClick }>Entrar</button>
      </div>
    );
  }
}

export default login;

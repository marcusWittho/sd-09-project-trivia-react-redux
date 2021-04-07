import React from 'react';
import { Redirect } from 'react-router';
import logo from '../trivia.png';
// import '../App.css';

class loginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      login: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleValidateEmail = this.handleValidateEmail.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    this.setState({
      login: true,
    });
  }

  handleValidateEmail() {
    const { email } = this.state;
    return (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email));
  }

  render() {
    const { nome, email, login } = this.state;
    if (login) return <Redirect to="/trivia" />;
    return (
      <div className="App">
        <div>
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <p>
              SUA VEZ
            </p>
          </header>
        </div>
        <p>Login</p>
        <div>
          <input
            data-testid="input-player-name"
            name="nome"
            type="text"
            value={ nome }
            placeholder="Nome:"
            onChange={ this.handleChange }
          />
          <input
            data-testid="input-gravatar-email"
            name="email"
            type="email"
            value={ email }
            placeholder="Email:"
            onChange={ this.handleChange }
          />
        </div>
        <br />
        <button
          data-testid="btn-play"
          type="button"
          onClick={ this.handleClick }
          disabled={ !(this.handleValidateEmail() && email) }
        >
          Jogar
        </button>
      </div>
    );
  }
}

export default loginScreen;

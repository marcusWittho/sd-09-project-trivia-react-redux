import React from 'react';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameInput: '',
      emailInput: '',
      disabledButton: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { nameInput, emailInput } = this.state;
      if (nameInput.length > 0 && emailInput.length > 0) {
        this.setState({
          disabledButton: false,
        });
      } else {
        this.setState({
          disabledButton: true,
        });
      }
    });
  }

  render() {
    const { nameInput, emailInput, disabledButton } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <main>
          <h1>Login</h1>
          <label htmlFor="name-input">
            Nome:
            <input
              data-testid="input-player-name"
              type="text"
              id="name-input"
              name="nameInput"
              value={ nameInput }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email-input">
            Email:
            <input
              data-testid="input-gravatar-email"
              type="email"
              id="email-input"
              name="emailInput"
              value={ emailInput }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ disabledButton }
          >
            Jogar
          </button>
        </main>
      </div>
    );
  }
}

export default Login;

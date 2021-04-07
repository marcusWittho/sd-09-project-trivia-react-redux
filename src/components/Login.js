import React from 'react';
import { Link } from 'react-router-dom';
import triviaRequest from '../services/api';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, () => {
      const { name, email } = this.state;
      if (name && email) {
        this.setState({ buttonDisabled: false });
      } else {
        this.setState({ buttonDisabled: true });
      }
    });
  }

  async handleClick() {
    const token = await triviaRequest();
    localStorage.setItem('token', token);
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            id="name"
            type="text"
            name="name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            id="email"
            type="text"
            name="email"
            onChange={ this.handleChange }
            onClick={ this.handleClick }
          />
        </label>

        <Link to="/game">
          <button data-testid="btn-play" type="button" disabled={ buttonDisabled }>
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;

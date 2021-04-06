import React from 'react';
import { Link } from 'react-router-dom';
import fetchAPIToken from '../../services/apiToken';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkStatusButton = this.checkStatusButton.bind(this);

    this.state = {
      isDisable: true,
      name: '',
      email: '',
    };
  }

  checkStatusButton() {
    const { name, email } = this.state;
    const minCharacters = 2;
    if (name.length > minCharacters && email.length > minCharacters) {
      this.setState({
        isDisable: false,
      });
    } else {
      this.setState({
        isDisable: true,
      });
    }
  }

  async handleClick() {
    const response = await fetchAPIToken();
    localStorage.setItem('token', response.token);
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
    this.checkStatusButton();
  }

  render() {
    const { isDisable } = this.state;
    return (
      <div className="login-container">
        <input
          type="text"
          name="name"
          placeholder="Nome"
          data-testid="input-player-name"
          onChange={ this.handleChange }
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
        />
        <Link to="/game">
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisable }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;

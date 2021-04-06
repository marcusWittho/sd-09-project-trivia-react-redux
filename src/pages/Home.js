import React from 'react';
import logo from '../trivia.png';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.disableButton = this.disableButton.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  disableButton(username, email) {
    return username.length === 0 || email.length === 0;
  }

  render() {
    const { username, email } = this.state;
    return (
      <div>
        <form>
          <img src={ logo } alt="Trivia Logo" />
          <label htmlFor="player-name">
            Player Name:
            <input
              id="player-name"
              name="username"
              data-testid="input-player-name"
              onChange={ this.handleChange }
              value={ username }
            />
          </label>
          <label htmlFor="gravatar-email">
            Gravatar E-mail:
            <input
              id="gravatar-email"
              name="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ this.disableButton(username, email) }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

export default Home;

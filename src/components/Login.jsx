import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: '',
      email: '',
      playButton: false,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange({ target }) {
    const { id, value } = target;
    this.setState({ [id]: value }, () => this.validateFields());
  }

  validateFields() {
    const { player, email } = this.state;
    const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const playButton = player.length > 0 && regex.test(email);
    this.setState({ playButton });
  }

  render() {
    const { playButton } = this.state;
    return (
      <div>
        <label htmlFor="player">
          Name
          <input
            type="text"
            id="player"
            data-testid="input-player-name"
            onChange={ this.onChange }
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="text"
            id="email"
            data-testid="input-gravatar-email"
            onChange={ this.onChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !playButton }
        >
          Play!
        </button>
      </div>
    );
  }
}

export default Login;

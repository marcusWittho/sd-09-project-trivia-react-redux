import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: '',
      email: '',
    }
    
    this.onChange = this.onChange.bind(this);
  }

  onChange({ target }) {
    this.setState({  })
  }

  render() {
    return (
      <div>
        <label htmlFor="player">Name</label>
        <input type="text" id="player" data-testid="input-player-name" onChange={() => this.onChange('player')} />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" data-testid="input-gravatar-email" onChange={this.onChange} />
        <button type="button" data-testid="btn-play">Play!</button>
      </div>
    );
  }
}

export default Login;

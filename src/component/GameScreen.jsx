import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class GameScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.recoveringLocalStorage = this.recoveringLocalStorage.bind(this);
  }

  componentDidMount() {
    this.recoveringLocalStorage();
  }

  recoveringLocalStorage() {
    const storage = JSON.parse(localStorage.getItem('state'));
    console.log(storage);
    this.setState({
      name: storage.player.name,
      gravatarEmail: storage.player.gravatarEmail,
    });
  }

  render() {
    const { name, gravatarEmail } = this.state;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
            alt="Gravatar"
          />
          <p data-testid="header-player-name">
            Jogador:
            { name }
          </p>
          <p data-testid="header-score">Placar: 0</p>
        </header>
      </div>
    );
  }
}

export default GameScreen;

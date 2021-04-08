import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerImage: '',
      playerName: '',
      score: 0,
    };
  }

  render() {
    const { playerImage, playerName, score } = this.state;
    return (
      <header>
        <div>
          <img src={ playerImage } alt="player" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{ playerName }</p>
          <p data-testid="header-score">
            Pontos:
            { score }
          </p>
        </div>
      </header>
    );
  }
}

export default Header;

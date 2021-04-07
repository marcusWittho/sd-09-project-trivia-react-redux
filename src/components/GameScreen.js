import React from 'react';
import HomeButton from './HomeButton';

class GameScreen extends React.Component {
  render() {
    const url = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50';
    return (
      <div>
        <header>
          <img src={ url } alt="avatar" data-testid="header-profile-picture" />
          <span data-testid="header-player-name">{ player.name }</span>
          <span data-testid="header-score">{ player.score }</span>
        </header>
        <HomeButton />
      </div>
    );
  }
}

export default GameScreen;

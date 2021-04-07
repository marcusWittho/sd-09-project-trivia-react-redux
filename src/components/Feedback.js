import React from 'react';

class Feedback extends React.Component {
  render() {
    const url = 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50';
    return (
      <header>
        <img src={ url } alt="imagem avatar" data-testid="header-profile-picture" />
        <span data-testid="header-player-name">{ player.nome }</span>
        <span data-testid="header-score">{ player.score }</span>
      </header>
    );
  }
}

export default Feedback;

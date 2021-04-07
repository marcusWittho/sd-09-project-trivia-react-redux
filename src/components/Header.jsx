import React, { Component } from 'react';

class Header extends Component {
  render() {
    const player = JSON.parse(localStorage.getItem('player'));
    return (
      <header>
        <div className="header">
          <img
            src={ `https://www.gravatar.com/avatar/${player.gravatarEmail}` }
            alt="Player"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">{ player.name }</h3>
          <h2 data-testid="header-score" id="data-testid">{ player.score }</h2>
        </div>
      </header>
    );
  }
}

export default Header;

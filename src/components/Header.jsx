import React, { Component } from 'react';
import logo from '../trivia.png';

class Header extends Component {
  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    return (
      <header className="stats">
        <img
          src={ logo }
          alt="trivia logo"
          width="100px"
          style={ { margin: '1em auto', display: 'block' } }
        />
        <img
          src={ `https://www.gravatar.com/avatar/${player.gravatarEmail}` }
          alt="Player"
          data-testid="header-profile-picture"
          className="profile"
        />
        <h2 data-testid="header-player-name">{ player.name }</h2>
        <h3
          data-testid="header-score"
          id="data-testid"
        >
          { Number(player.score) }
        </h3>
      </header>
    );
  }
}

export default Header;

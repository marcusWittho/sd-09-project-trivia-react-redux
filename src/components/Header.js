import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const myURL = localStorage.getItem('gravatarURL');
    return (
      <header>
        <img
          src={ myURL }
          alt="my avatar"
          data-testid="header-profile-picture"
        />
        <p
          data-testid="header-player-name"
        >
          { player.name }
        </p>
        <p>
          Score:
          <span
            data-testid="header-score"
          >
            { player.score }
          </span>
        </p>
      </header>
    );
  }
}

export default Header;

import React, { Component } from 'react';
import { REQUEST_GRAVATAR_IMG } from '../services';

class Header extends Component {
  getPlayerInfo(key) {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const playerProperty = player[key];
    return playerProperty;
  }

  render() {
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ REQUEST_GRAVATAR_IMG(this.getPlayerInfo('gravatarEmail')) }
          alt="kappa"
        />
        <span data-testid="header-player-name">{this.getPlayerInfo('name')}</span>
        <span data-testid="header-score">{this.getPlayerInfo('score')}</span>
      </div>
    );
  }
}

export default Header;

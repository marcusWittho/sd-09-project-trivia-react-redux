import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor(props) {
    super(props);

    this.getGravatar = this.getGravatar.bind(this);
  }

  getGravatar(email) {
    const hash = md5(email).toString();
    const emailHash = `https://www.gravatar.com/avatar/${hash}`;
    localStorage.setItem('picture', emailHash);
    return emailHash;
  }

  render() {
    const email = localStorage.getItem('gravatarEmail');
    const playerName = localStorage.getItem('name');
    const score = localStorage.getItem('score');
    return (
      <>
        <img
          data-testid="header-profile-picture"
          src={ this.getGravatar(email) }
          alt="Imagem do Jogador"
        />
        <h3 data-testid="header-player-name">{ playerName }</h3>
        <p data-testid="header-score">{ score }</p>
      </>
    );
  }
}

export default Header;

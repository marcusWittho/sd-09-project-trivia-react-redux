import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <>
        <img data-testid="header-profile-picture" src="" alt="" />
        <h3 data-testid="header-player-name">Nome da Pessoa</h3>
        <p data-testid="header-score">Placar</p>
      </>
    );
  }
}

export default Header
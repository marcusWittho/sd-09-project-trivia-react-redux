import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header>
        <img src="https://via.placeholder.com/80" alt="avatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">nome</p>
        <p data-testid="header-score">placar</p>
      </header>
    );
  }
}

export default Header;

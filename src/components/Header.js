import React from 'react';

class Header extends React.Component {
  render() {
    const player = JSON.parse(localStorage.getItem('state'));
    const { name, gravatarEmail, score } = player;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
          alt="user-gravatar"
        />
        <h2 data-testid="header-player-name">{name}</h2>
        <div data-testid="header-score">{score}</div>
      </header>
    );
  }
}

export default Header;

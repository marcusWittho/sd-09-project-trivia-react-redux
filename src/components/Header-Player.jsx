import React from 'react';

class Header extends React.Component {
  render() {
    const playerGravatar = localStorage.getItem('token');
    const player = localStorage.getItem('player');
    return (
      <header className="header-player">
        <img
          src={ `https://www.gravatar.com/avatar/${playerGravatar}` }
          alt="gravatar"
          data-testid="header-profile-picture"
          className="gravatar"
        />
        <div className="header-title">
          Player:
          { player }
        </div>
        <div className="header-title">
          Points: 0
        </div>
      </header>
    );
  }
}

export default Header;

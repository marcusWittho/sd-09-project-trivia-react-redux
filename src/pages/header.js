import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import '../css/header.css';

class Header extends Component {
  render() {
    const { profile, player, score } = this.props;
    return (
      <div className="header">
        <div>
          <img
            src={ profile }
            alt={ `${player} profile` }
            data-testid="header-profile-picture"
          />
        </div>
        <div>
          <h1 data-testid="header-player-name">{ player }</h1>
        </div>
        <div>
          <p data-testid="header-score">{ score }</p>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  profile: PropTypes.string,
  player: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default Header;

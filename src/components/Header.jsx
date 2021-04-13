import React, { Component } from 'react';
import './Header.css';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;
    const emailHash = md5(email).toString();

    return (
      <header>
        <div className="header">
          <img
            src={ `https://www.gravatar.com/avatar/${emailHash} ` }
            alt="player"
            data-testid="header-profile-picture"
            className="player-image"
          />
          <p className="player-name" data-testid="header-player-name">
            {' '}
            Jogador:
            {' '}
            { name }
          </p>
          <p className="score">Score:</p>
          <span className="score-value" data-testid="header-score">{ score }</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

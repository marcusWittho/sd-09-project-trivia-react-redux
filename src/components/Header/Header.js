import React, { Component } from 'react';
import { shape } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    const { player } = this.props;
    return (
      <header>
        <img
          src={ player.gravatarEmail }
          alt={ `Avatar ${player.name}` }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ player.name }</p>
        <p>
          Pontuação:
          <span data-testid="header-score">{ player.score }</span>
        </p>
        <Link exact to="/">
          <button type="button" data-testid="btn-go-home">
            Inicio
          </button>
        </Link>
      </header>
    );
  }
}

const mapStateToProps = ({ playerReducer }) => ({
  player: playerReducer.player,
});

Header.propTypes = {
  player: shape().isRequired,
};

export default connect(mapStateToProps)(Header);

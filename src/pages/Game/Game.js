import React from 'react';
import { connect } from 'react-redux';
import { string, shape } from 'prop-types';

class Game extends React.Component {
  render() {
    const { player } = this.props;
    localStorage.setItem('state', JSON.stringify(player));
    return (
      <section className="game-container">
        <header>
          <img
            src={ player.gravatarEmail }
            alt={ `Avatar ${player.name}` }
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ player.name }</p>
          <p data-testid="header-score">0</p>
        </header>
      </section>
    );
  }
}

const mapStateToProps = ({ playerReducer }) => ({
  player: playerReducer.player,
});

Game.propTypes = {
  player: shape({
    name: string,
    gravatarEmail: string,
    assertions: string,
    score: string,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);

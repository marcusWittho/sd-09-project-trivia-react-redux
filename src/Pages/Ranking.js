import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    const players = JSON.parse(localStorage.getItem('ranking')) || [];
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { players.sort((player1, player2) => {
          const um = 1;
          const menosUm = -1;
          const zero = 0;
          if (player1.score > player2.score) {
            return menosUm;
          }
          if (player1.score < player2.score) {
            return um;
          }
          return zero;
        }).map((player, index) => (
          <div key={ player.name }>
            <img src={ player.picture } alt="player" />
            <p data-testid={ `player-name-${index}` }>{ player.name }</p>
            <p data-testid={ `player-score-${index}` }>{ player.score }</p>
          </div>
        ))}
        <Link to="/">
          <button type="button" data-testid="btn-go-home">
            BACK TO HOME
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  players: player.player,
});

Ranking.propTypes = {
  players: PropTypes.shape({
    name: PropTypes.string,
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(Ranking);

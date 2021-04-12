import React, { Component } from 'react';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  render() {
    const recoverRanking = JSON.parse(localStorage.getItem('ranking'));
    return (
      recoverRanking.map((player, index) => (
        <div data-testid="ranking-title" key={ index }>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(player.picture).toString()}` }
            alt="Avatar do jogador"
          />
          <p data-testid={ `player-name-${index}` }>{ player.name }</p>
          <p data-testid={ `player-score-${index}` }>{ player.score }</p>
        </div>
      ))
    );
  }
}

export default Ranking;

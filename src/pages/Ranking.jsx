import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const orderedRanking = JSON.parse(localStorage.getItem('ranking'))
      .sort((playerA, playerB) => playerB.score - playerA.score)
      // Caso seja necessário tirar as replicações de jogadores com o mesmo nome
      // .reduce((acc, currentPlayer) => {
      //   if (!acc.find((player) => player.name === currentPlayer.name)) {
      //     return [...acc, currentPlayer];
      //   }

      //   return acc;
      // }, [])
      .map((player, index) => (
        <li key={ index }>
          <ul>
            <li data-testid={ `player-name-${index}` }>
              {player.name}
            </li>
            <li data-testid={ `player-score-${index}` }>
              {player.score}
            </li>
          </ul>
        </li>
      ));

    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          { orderedRanking }
        </ol>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Home</button>
        </Link>
      </>
    );
  }
}

export default Ranking;

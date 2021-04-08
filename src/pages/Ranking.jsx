import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const orderedRanking = JSON.parse(localStorage.getItem('ranking'))
      .sort((playerA, playerB) => playerA.score - playerB.score)
      .map((player, index) => (
        <li key={ index }>
          <ul>
            <li data-testid={ `${player.name}-${index}` }>{`Jogador: ${player.name}`}</li>
            <li data-testid={ `${player.score}-${index}` }>{`Potuação: ${player.score}`}</li>
          </ul>
        </li>
      ));

    return (
      <>
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

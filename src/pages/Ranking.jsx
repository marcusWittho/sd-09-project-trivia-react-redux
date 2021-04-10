import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const rankingList = ranking
      .sort((x, y) => y.score - x.score)
      .map((gamer, index) => (
        <li key="index">
          <img src={ gamer.picture } alt="Imagem do Jogador" />
          <h3 data-testid={ `player-name${index}` }>{ gamer.name }</h3>
          <p data-testid={ `player-score-${index}` }>{ gamer.score }</p>
        </li>
      ));

    return (
      <section data-testid="ranking-title">
        <h1>Ranking</h1>
        <ul>
          { rankingList }
        </ul>
      </section>
    );
  }
}

export default Ranking;

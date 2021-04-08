import React, { Component } from 'react';
import Header from '../components/Header';

export default class Ranking extends Component {
  renderRankingList() {
    const ranking = localStorage.getItem('ranking');
    // criei esse pseudo-mock para quem quiser testar, mas tá sem imaginação pra salvar um ranking no localStorage kk
    // faça bom uso ^^
    // para rodar o teste, comente as duas 3 próxima linhas e descomente a linha acima
    // const placeholder = 'https://via.placeholder.com/50';
    // const mockedRanking = [
    //   { name: 'player564651', score: 10, picture: placeholder },
    //   { name: 'player514351', score: 100, picture: placeholder },
    //   { name: 'player743215', score: 88, picture: placeholder },
    //   { name: 'player654633', score: 23, picture: placeholder },
    //   { name: 'player135465', score: 57, picture: placeholder },
    // ];
    // const ranking = mockedRanking;

    return ranking.sort(({ score: score1 }, { score: score2 }) => score2 - score1)
      .map(({ name, score, picture }, index) => (
        <li key={ name }>
          <img src={ picture } alt={ `${name} gravatar` } />
          <span data-testid={ `player-name-${index}` }>{ name }</span>
          <span data-testid={ `player-score-${index}` }>{ score }</span>
        </li>
      ));
  }

  render() {
    return (
      <>
        <Header />
        <main>
          <h1>Ranking</h1>
          <ol>
            { this.renderRankingList() }
          </ol>
        </main>
      </>
    );
  }
}

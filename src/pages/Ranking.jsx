import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  sortRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return ranking.sort((a, b) => b.score - a.score);
  }

  render() {
    const sortedRanking = this.sortRanking();
    return (
      <>
        <h1 data-testid="ranking-title">Página de Ranking</h1>
        <ol>
          {sortedRanking.map(({ name, picture, score }, index) => (
            <li key={ name }>
              <img src={ picture } alt={ `${name} avatar` } />
              <span data-testid={ `player-name-${index}` }>{name}</span>
              <span data-testid={ `player-score-${index}` }>{`Pontuação: ${score}`}</span>
            </li>
          ))}
        </ol>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Voltar para o início</button>
        </Link>
      </>
    );
  }
}

export default Ranking;

import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking);
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <ul>
          { ranking.map((person) => (
            <li key={ person.name }>
              <img src={ person.picture } alt="Player" />
              <span data-testid="player-name">{ person.name }</span>
              <span data-testid="player-score">{ person.score }</span>
            </li>
          )) }
        </ul>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Voltar
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;

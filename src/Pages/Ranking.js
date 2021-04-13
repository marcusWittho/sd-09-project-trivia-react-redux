import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  personRankingList() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <ul>
        { ranking.sort((a, b) => b.score - a.score).map((person, index) => (
          <li key={ person.name }>
            <img src={ person.picture } alt="Player" />
            <span data-testid={ `player-name-${index}` }>{ person.name }</span>
            <span data-testid={ `player-score-${index}` }>{ person.score }</span>
          </li>
        )) }
      </ul>
    );
  }

  render() {
    return (
      <div>
        {this.personRankingList()}
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

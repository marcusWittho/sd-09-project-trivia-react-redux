import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking);
    return (
      <div>
        <h2 data-testid="ranking-title">
          Ranking
        </h2>
        <ul>
          { ranking.map(({ name, score, picture }, index) => (
            <li key={ name }>
              <img src={ picture } alt="User Avatar" />
              <p data-testid={ `player-name-${index}` }>{ name }</p>
              <p data-testid={ `player-score-${index}` }>{ score }</p>
            </li>
          ))}
        </ul>
        <button type="button" data-testid="btn-go-home">
          <Link to="/">
            Home
          </Link>
        </button>
      </div>
    );
  }
}

export default Ranking;

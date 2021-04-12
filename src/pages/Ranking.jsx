import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.getRanking = this.getRanking.bind(this);
    this.buttonGenerator = this.buttonGenerator.bind(this);
  }

  getRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const ordenedRanking = ranking.sort((a, b) => b.score - a.score);
    return (
      ordenedRanking.map(({ score, name, gravatarEmail }, index) => (
        <div key={ index }>
          <img src={ gravatarEmail } alt="player gravatar" />
          <p data-testid={ `player-name-${index}` }>{ name }</p>
          <p data-testid={ `player-score-${index}` }>{ score }</p>
        </div>
      ))
    );
  }

  buttonGenerator() {
    return (
      <Link to="/">
        <button
          type="button"
          data-testid="btn-go-home"
        >
          Jogar novamente
        </button>
      </Link>
    );
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { this.getRanking() }
        { this.buttonGenerator() }
      </div>
    );
  }
}

export default Ranking;

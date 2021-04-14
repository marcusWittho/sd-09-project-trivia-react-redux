import React from 'react';

import localStorageService from '../services/localStorage';

class Rank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    this.getRanking();
  }

  getRanking() {
    const ranking = localStorageService.getRanking();
    const sortFunction = ({ score: first }, { score: second }) => first > second;
    const orderedRanking = ranking.sort(sortFunction);
    this.setState({ ranking: orderedRanking });
  }

  render() {
    const { ranking } = this.state;

    return (
      <main>
        <h3 data-testid="ranking-title">Ranking</h3>
        <ul>
          {ranking.map(({ name, score, picture }, key) => (
            <li key={ key }>
              <img width="20px" src={ picture } alt="Imagem do jogador" />
              <span data-testid={ `player-name-${key}` }>{name}</span>
              <span>
                <strong data-testid={ `player-score-${key}` }>{score}</strong>
                - pontos
              </span>
            </li>
          ))}
        </ul>
      </main>
    );
  }
}

export default Rank;

import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.renderRankingList = this.renderRankingList.bind(this);
  }

  renderRankingList() {
    const rankingList = [
      { name: 'Felipe', score: 10, picture: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg' },
      { name: 'Nanda', score: 30, picture: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/54.svg' },
      { name: 'Deretti', score: 40, picture: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/134.svg' },
      { name: 'Paranauê', score: 20, picture: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/237.svg' },
    ]; // array de teste enquanto não tem o LocalStorage definido
    return (
      <ul>
        { rankingList.sort((a, b) => b.score - a.score).map((user, index) => (
          <li key={ index }>
            <img src={ user.picture } alt={ user.name } />
            <span data-testid={ `player-name-${index}` }>{ user.name }</span>
            <span data-testid={ `player-score-${index}` }>{ user.score }</span>
          </li>
        )) }
      </ul>
    );
  }

  render() {
    return (
      <div>
        { this.renderRankingList() }
        <Link to="/" data-testid="btn-go-home">Voltar para a tela inicial</Link>
      </div>
    );
  }
}

export default Ranking;

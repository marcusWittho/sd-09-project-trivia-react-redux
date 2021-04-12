import React from 'react';
import HomeButton from '../Componentes/HomeButton';

class Ranking extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('state'));
    console.log(ranking);
    // Ordena a lista
    const ordenedRanking = ranking.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">Tela do ranking</h1>
        <ul>
          {/* // Localiza as informações pra renderizar */}
          {ordenedRanking.map((player, index) => (
            <li key={ index }>
              <p data-testid={ `player-name-${index}` }>{`${player.name}`}</p>
              <p data-testid={ `player-score-${index}` }>{`${player.score}`}</p>
            </li>
          ))}
        </ul>
        <HomeButton />
      </div>
    );
  }
}

export default Ranking;

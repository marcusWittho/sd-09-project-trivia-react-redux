import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RankingPage.css';

//  Dados para fazer teste
// const rankingTest = [
//   { name: 'nome-da-pessoa 1', score: 50, picture: 'https://www.gravatar.com/avatar/9e34f9c6d60b08c3049a260331c827f9' },
//   { name: 'nome-da-pessoa 2', score: 40, picture: 'https://www.gravatar.com/avatar/9e34f9c6d60b08c3049a260331c827f9' },
// ];

class RankingPage extends React.Component {
  getRankingOrderedByScore() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => b.score - a.score);
    return ranking;
  }

  createParticipantList(participant, index) {
    const { name, score, picture } = participant;
    return (
      <tr className="ranking-list">
        <td>
          <img src={ picture } alt="user" />
        </td>
        <td>
          <p data-testid={ `player-name-${index}` }>{name}</p>
        </td>
        <td>
          <p data-testid={ `player-score-${index}` }>{score}</p>
        </td>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <table>
          <tr>
            <th>Imagem</th>
            <th>Nome do participante</th>
            <th>Pontuação</th>
          </tr>
          {this.getRankingOrderedByScore().map(
            (participant, index) => this.createParticipantList(participant, index),
          )}
        </table>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Volta para a tela inicial
          </button>
        </Link>
      </div>
    );
  }
}

export default RankingPage;

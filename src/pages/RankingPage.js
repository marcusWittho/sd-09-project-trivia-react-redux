import React from 'react';
import '../styles/RankingPage.css';

const rankingTest = [
  { name: 'nome-da-pessoa 1', score: 30, picture: 'https://www.gravatar.com/avatar/9e34f9c6d60b08c3049a260331c827f9' },
  { name: 'nome-da-pessoa 2', score: 40, picture: 'https://www.gravatar.com/avatar/9e34f9c6d60b08c3049a260331c827f9' },
];

class RankingPage extends React.Component {
  getRankingOrderedByScore() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    ranking.sort((a, b) => {
      if (a.score < b.score) {
        const minus1 = -1;
        return minus1;
      }
      if (a.score > b.score) {
        return 1;
      }
      return 0;
    });
    return ranking;
  }

  createParticipantList(participant, index) {
    this.getRankingOrderedByScore();
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
    localStorage.setItem('ranking', JSON.stringify(rankingTest));
    return (
      <div>
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
      </div>
    );
  }
}

export default RankingPage;

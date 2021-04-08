import React from 'react';

const rankingTest = [
  { name: 'nome-da-pessoa 1', score: 10, picture: 'url-da-foto-no-gravatar' },
  { name: 'nome-da-pessoa 2', score: 20, picture: 'url-da-foto-no-gravatar' },
];

class RankingPage extends React.Component {
  createParticipantList(participant, index) {
    const { name, score, picture } = participant;
    return (
      <li>
        <img src={ picture } alt="user" />
        <p data-testid={ `player-name-${index}` }>{name}</p>
        <p data-testid={ `player-score-${index}` }>{score}</p>
      </li>
    );
  }

  render() {
    return (
      <ul>
        {rankingTest.map(
          (participant, index) => this.createParticipantList(participant, index),
        )}
      </ul>
    );
  }
}

export default RankingPage;

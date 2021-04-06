import React from 'react';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.getScore = this.getScore.bind(this);
    this.getRanking = this.getRanking.bind(this);
  }

  getRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return ranking;
  }

  getScore() {
    const state = JSON.parse(localStorage.getItem('state'));
    return state;
  }

  render() {
    const { player } = this.getScore();
    const ranking = this.getRanking();
    return (
      <header>
        <img data-testid="header-profile-picture" src={ ranking[0].picture } alt="" />
        <h1 data-testid="header-player-name">{player.name}</h1>
        <h2 data-test-id="header-score">{player.score}</h2>
      </header>
    );
  }
}

export default Feedback;

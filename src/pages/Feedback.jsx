import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.getFeedback = this.getFeedback.bind(this);
    this.makeRanking = this.makeRanking.bind(this);
  }

  componentDidMount() {
    this.makeRanking();
  }

  getFeedback(assertions) {
    const medianScore = 3;
    const bellowThree = assertions < medianScore;
    switch (bellowThree) {
    case true:
      return 'Podia ser melhor...';
    default:
      return 'Mandou bem!';
    }
  }

  makeRanking() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    let ranking = JSON.parse(localStorage.getItem('ranking'));
    if (!ranking) ranking = [];
    const scoreToRanking = {
      name: player.name,
      score: player.score,
      picture: `https://www.gravatar.com/avatar/${player.gravatarEmail}`,
    };
    ranking.push(scoreToRanking);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    return (
      <main className="App App-header">
        <Header />
        <section>
          <h3 data-testid="feedback-text">
            {this.getFeedback(Number(player.assertions))}
          </h3>
          <h2 data-testid="feedback-total-score">{Number(player.score)}</h2>
          <h3 data-testid="feedback-total-question">{Number(player.assertions)}</h3>
        </section>
        <section>
          <button type="button" data-testid="btn-ranking" className="App-link">
            <Link to="/ranking">Ranking de jogadores</Link>
          </button>
          <button type="button" data-testid="btn-play-again" className="App-link">
            <Link to="/">Jogar novamente</Link>
          </button>
        </section>
      </main>
    );
  }
}

export default (Feedback);

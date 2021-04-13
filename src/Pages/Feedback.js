import React from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  feedbackMessege() {
    const toCompare = 3;
    const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));
    if (assertions < toCompare) {
      return <p data-testid="feedback-text">Podia ser melhor...</p>;
    }
    if (assertions >= toCompare) {
      return <p data-testid="feedback-text">Mandou bem!</p>;
    }
  }

  order(a, b) {
    return b.score - a.score;
  }

  rankingSave(data) {
    const { name, score, gravatarEmail } = data;
    const rankingStore = {
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`,
    };
    if (localStorage.getItem('ranking')) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      ranking.push(...[rankingStore]);
      ranking.sort(this.order);
      localStorage.setItem('ranking', JSON.stringify(ranking));
    } else {
      const arrRanking = [rankingStore];
      const strRanking = JSON.stringify(arrRanking);
      localStorage.setItem('ranking', strRanking);
    }
  }

  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    this.rankingSave(player);
    return (
      <div>
        <p>Feedback</p>
        <Header />
        <p data-testid="feedback-total-score">{player.score}</p>
        <p data-testid="feedback-total-question">{player.assertions}</p>

        <Link to="/">
          <button data-testid="btn-play-again" type="button">
            Jogar novamente
          </button>
        </Link>
        {this.feedbackMessege()}
      </div>
    );
  }
}

export default Feedback;

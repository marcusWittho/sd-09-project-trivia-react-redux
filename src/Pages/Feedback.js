import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import UserData from '../Component/UserData';

class Feedback extends Component {
  orderScore(a, b) {
    return b.score - a.score;
  }

  saveRanking(data) {
    const { name, score, gravatarEmail } = data;
    const rankingStorage = {
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`,
    };
    if (localStorage.getItem('ranking')) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      ranking.push(...[rankingStorage]);
      ranking.sort(this.orderScore);
      localStorage.setItem('ranking', JSON.stringify(ranking));
    } else {
      const rankingArray = [rankingStorage];
      const rankingString = JSON.stringify(rankingArray);
      localStorage.setItem('ranking', rankingString);
    }
  }

  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    this.saveRanking(player);
    let feedback = '';
    const assert = 3;
    if (player.assertions < assert) {
      feedback = 'Podia ser melhor...';
    }
    if (player.assertions >= assert) {
      feedback = 'Mandou bem!';
    }
    return (
      <div>
        <UserData />
        <p data-testid="feedback-text">
          { feedback }
        </p>
        <p data-testid="feedback-total-score">
          { player.score }
          points
        </p>
        <p data-testid="feedback-total-question">
          { player.assertions }
          acertos
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>

      </div>
    );
  }
}

export default Feedback;

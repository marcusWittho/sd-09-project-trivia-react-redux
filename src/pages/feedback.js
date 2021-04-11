import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/header';

class feedback extends React.Component {
  mandouBem() {
    return (
      <h1>Mandou bem!</h1>
    );
  }

  podiaSerMelhor() {
    return (
      <h1>Podia ser melhor...</h1>
    );
  }

  saveRanking() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const rankingStorage = {
      name: player.name,
      score: player.score,
      picture: player.gravatarEmail,
    };
    if (!localStorage.getItem('ranking')) {
      const rankingArrStorage = [rankingStorage];
      const rankingArrStorageString = JSON.stringify(rankingArrStorage);
      localStorage.setItem('ranking', rankingArrStorageString);
    } else {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      ranking.push(...[rankingStorage]);
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
  }

  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    this.saveRanking();
    // const { assertions } = this.props;
    const score = 3;
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">
          { player.assertions < score
            ? this.podiaSerMelhor()
            : this.mandouBem() }
        </span>
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

feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

export default feedback;

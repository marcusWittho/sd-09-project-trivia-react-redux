import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class FeedBack extends Component {
  componentDidMount() {
    const state = JSON.parse(localStorage.getItem('state'));
    const currentGame = [{
      name: state.player.name,
      score: state.player.score,
      picture: state.player.gravatarEmail,
    }];

    const rankinglist = JSON.parse(localStorage.getItem('ranking'));
    const ranking = [rankinglist];
    console.log(ranking);
    if (ranking) {
      const newRanking = [...ranking, currentGame];
      localStorage.setItem('ranking', JSON.stringify({ newRanking }));
    } else {
      localStorage.setItem('ranking', JSON.stringify({ currentGame }));
    }
  }

  render() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    const condicionNumber = 3;
    const feedbackText = player.assertions < condicionNumber
      ? 'Podia ser melhor...' : 'Mandou bem!';
    return (
      <section>
        <Header />
        <p data-testid="feedback-text">{feedbackText}</p>
        <div>
          Você acertou
          <span data-testid="feedback-total-question">{player.assertions}</span>
          questões!
        </div>
        <div>
          Um total de
          <span data-testid="feedback-total-score">{player.score}</span>
          pontos
        </div>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar Novamente
          </button>
        </Link>
      </section>
    );
  }
}

export default FeedBack;

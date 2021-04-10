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
    const state = localStorage.getItem('state');
    const { player } = JSON.parse(state);
    const { assertions } = player;
    const numberOfAssertions = parseInt(assertions, 10);
    const condicionNumber = 3;
    return (
      <section>
        <Header />
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
        {numberOfAssertions < condicionNumber
          ? <p data-testid="feedback-text">Podia ser melhor...</p>
          : <p data-testid="feedback-text">Mandou bem!</p>}
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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class FeedBack extends Component {
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
      </section>
    );
  }
}

export default FeedBack;

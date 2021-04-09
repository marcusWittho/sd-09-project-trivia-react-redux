import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    const state = localStorage.getItem('state');
    const { player } = JSON.parse(state);
    const { assertions } = player;
    const condicionNumber = 3;
    return (
      <section>
        <Header />
        { assertions < condicionNumber
          ? <p data-testid="feedback-text">Podia ser melhor...</p>
          : <p data-testid="feedback-text">Mandou bem!</p> }
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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <header>
        <h2 data-testid="feedback-text">Feedback</h2>
        <Header />
        <Link to="/Rankings">
          <button type="button" data-testid="btn-ranking">Ver Ranking</button>
        </Link>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar Novamente</button>
        </Link>
      </header>
    );
  }
}

export default Feedback;

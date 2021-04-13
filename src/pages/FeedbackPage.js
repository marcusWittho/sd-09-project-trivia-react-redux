import React from 'react';
import '../CSS/feedbackPage.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class feedbackPage extends React.Component {
  getStateLocalStorage() {
    const state = JSON.parse(localStorage.getItem('state'));
    return state;
  }

  feedBackMessage(assertions) {
    const numberGoodQuestions = 3;
    let message = 'Mandou bem!';
    if (assertions < numberGoodQuestions) {
      message = 'Podia ser melhor...';
    }
    return (
      <p data-testid="feedback-text">{ message }</p>
    );
  }

  render() {
    const { player: { assertions } } = this.getStateLocalStorage();
    return (
      <div>
        <Header />
        { this.feedBackMessage(assertions) }
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
            Volta para a tela inicial
          </button>
        </Link>
      </div>
    );
  }
}

export default feedbackPage;

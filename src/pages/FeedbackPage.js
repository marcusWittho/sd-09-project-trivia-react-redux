import React from 'react';
import '../CSS/feedbackPage.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class feedbackPage extends React.Component {
  getStateLocalStorage() {
    const state = JSON.parse(localStorage.getItem('state'));
    return state;
  }

  feedbackMessage(assertions) {
    const numberGoodQuestions = 3;
    let message = 'Mandou bem!';
    if (assertions < numberGoodQuestions) {
      message = 'Podia ser melhor...';
    }
    return (
      <p data-testid="feedback-text">{ message }</p>
    );
  }

  feedbackScore(assertions, score) {
    let message = `Acertou ${assertions} perguntas`;
    if (assertions < 1) {
      message = 'Não acertou nenhuma pergunta';
    } else if (assertions === 1) {
      message = 'Acertou 1 pergunta';
    }
    return (
      <>
        <p data-testid="feedback-total-question">{ message }</p>
        <p data-testid="feedback-total-score">{`A sua pontuação foi de: ${score}`}</p>
      </>
    );
  }

  render() {
    const { player: { assertions, score } } = this.getStateLocalStorage();
    return (
      <div>
        <Header />
        { this.feedbackMessage(assertions) }
        { this.feedbackScore(assertions, score) }
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

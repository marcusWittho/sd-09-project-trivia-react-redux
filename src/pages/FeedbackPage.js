import React from 'react';
import '../CSS/feedbackPage.css';
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
      </div>
    );
  }
}

export default feedbackPage;

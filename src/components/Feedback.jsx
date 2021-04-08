import React from 'react';
import FeedbackHeader from './FeedbackHeader';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.getFeedbackMessage = this.getFeedbackMessage.bind(this);
  }

  getFeedbackMessage() {
    // const { score } = this.props;
    const score = 3;
    const goodScore = 3;
    return score < goodScore
      ? 'Podia ser melhor...'
      : 'Mandou bem!';
  }

  render() {
    const feedbackText = this.getFeedbackMessage();
    const questions = 2;
    const points = 20;
    return (
      <div>
        <FeedbackHeader />
        <h1 data-testid="feedback-text">{ feedbackText }</h1>
        <h3 data-testid="feedback-total-question">
          { `Você acertou ${questions} questões!` }
        </h3>
        <h3 data-testid="feedback-total-score">{ `Um total de ${points} pontos` }</h3>

      </div>
    );
  }
}

export default Feedback;

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
    return (
      <div>
        <FeedbackHeader />
        <h2 data-testid="feedback-text">{ feedbackText }</h2>
      </div>
    );
  }
}

export default Feedback;

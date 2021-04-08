import React from 'react';
import HeaderFeedback from '../components/HeaderFeedback';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <HeaderFeedback />
        <p data-testid="feedback-text">Parabéns ou Náo KKKKK</p>
      </div>
    );
  }
}

export default Feedback;

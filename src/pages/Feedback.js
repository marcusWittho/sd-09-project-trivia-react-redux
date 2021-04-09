import React from 'react';
import { FeedbackHeader } from '../components';

export default class Feedback extends React.Component {
  render() {
    return (
      <div>
        <FeedbackHeader />
        <p data-testid="feedback-text">Texto de Feedback</p>
      </div>
    );
  }
}

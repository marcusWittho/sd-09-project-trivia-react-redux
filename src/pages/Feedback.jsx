import React from 'react';
import PropTypes from 'prop-types';
import { FeedbackHeader } from '../components';

export default class Feedback extends React.Component {
  constructor() {
    super();
    this.playAgain = this.playAgain.bind(this);
    this.goToRanking = this.goToRanking.bind(this);
  }

  playAgain() {
    const { history } = this.props;
    history.push('/');
  }

  goToRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <div>
        <FeedbackHeader />
        <p data-testid="feedback-text">Texto de Feedback</p>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.playAgain }
        >
          Jogar Novamente
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.goToRanking }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

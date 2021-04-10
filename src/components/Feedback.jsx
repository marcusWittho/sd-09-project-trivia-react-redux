import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeedbackHeader from './FeedbackHeader';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.getFeedbackMessage = this.getFeedbackMessage.bind(this);
  }

  getFeedbackMessage() {
    const { assertions } = this.props;
    const averageAssertions = 3;
    return assertions < averageAssertions
      ? 'Podia ser melhor...'
      : 'Mandou bem!';
  }

  render() {
    const { score, assertions } = this.props;
    const feedbackText = this.getFeedbackMessage();
    return (
      <div>
        <FeedbackHeader />
        <h1 data-testid="feedback-text">{ feedbackText }</h1>
        <h3 data-testid="feedback-total-question">
          { assertions }
        </h3>
        <h3 data-testid="feedback-total-score">{ score }</h3>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">
            Ver ranking
          </button>
        </Link>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.triviaReducer.player.assertions,
  score: state.triviaReducer.player.score,
});

export default connect(mapStateToProps)(Feedback);

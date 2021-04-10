import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FeedHeader from '../Components/FeedHeader';
import './answers.css';

class Feedback extends Component {
  constructor() {
    super();
    this.message = this.message.bind(this);
  }

  message() {
    const { rightAnswers, score } = this.props;
    return (
      <div>
        <p data-testid="feedback-total-score">
          TOTAL SCORE:
          { score }
        </p>
        <p data-testid="feedback-total-question">
          HITS:
          { rightAnswers }
        </p>
      </div>
    );
  }

  score() {
    const { rightAnswers } = this.props;
    const tres = 3;
    if (rightAnswers >= tres) {
      return <p data-testid="feedback-text">Mandou bem!</p>;
    }
    return <p data-testid="feedback-text">Podia ser melhor...</p>;
  }

  render() {
    return (
      <div>
        <FeedHeader />
        { this.message() }
        { this.score() }
        <Link to="/">
          <button type="button" data-testid="btn-play-again">
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  rightAnswers: player.rightAnswers,
  score: player.score,
});

Feedback.propTypes = {
  rightAnswers: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { number } from 'prop-types';
import { Header } from '../components';
import './Feedback.css';

class FeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.getFeedback = this.getFeedback.bind(this);
  }

  getFeedback() {
    const { correct } = this.props;
    const minScore = 3;
    if (correct >= minScore) return 'Mandou bem!';
    return 'Podia ser melhor...';
  }

  render() {
    const { score, correct } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">{ this.getFeedback() }</p>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ correct }</p>
        <Link to="/">
          <button data-testid="btn-play-again" type="button">
            Play Again
          </button>
        </Link>
        <Link to="ranking">
          <button data-testid="btn-ranking" type="button">
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}

FeedBack.propTypes = { score: number, correct: number }.isRequired;

const mapStateToProps = ({ user: { score, correct } }) => ({ score, correct });

export default connect(mapStateToProps)(FeedBack);

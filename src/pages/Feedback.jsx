import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const MAGIC_NUMBER = 3;

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        <h3 data-testid="feedback-text">
          { assertions >= MAGIC_NUMBER ? 'Mandou bem!' : 'Podia ser melhor...' }
        </h3>
        <h4>
          Placar total:
          <span data-testid="feedback-total-score">{score}</span>
        </h4>
        <h4>
          Você acertou:
          <span data-testid="feedback-total-question">{assertions}</span>
        </h4>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.scoreReducer.assertions,
  score: state.scoreReducer.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);

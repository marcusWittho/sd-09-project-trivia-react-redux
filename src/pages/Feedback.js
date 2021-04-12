import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../Componentes/Header';
import { resetPlayer, resetRequest } from '../actions';

class Feedback extends React.Component {
  constructor() {
    super();

    this.resetScore = this.resetScore.bind(this);
  }

  resetScore() {
    const { resetPlayerStore, resetRequestStore } = this.props;
    resetPlayerStore();
    resetRequestStore();
  }

  render() {
    const { assertions, score } = this.props;
    const three = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertions >= three
            ? 'Mandou bem!'
            : 'Podia ser melhor...'}
        </p>
        <h1>Pontuação: </h1>
        <p data-testid="feedback-total-score">{score}</p>
        <h4> Perguntas acertadas: </h4>
        <p data-testid="feedback-total-question">{assertions}</p>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ranking</button>
        </Link>
        <Link to="/">
          <button type="button" data-testid="btn-play-again" onClick={ this.resetScore }>
            Jogar Novamente
          </button>
        </Link>

      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  resetPlayerStore: PropTypes.func.isRequired,
  resetRequestStore: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  ranking: state.ranking,
});

const mapDispatchToProps = (dispatch) => ({
  resetPlayerStore: () => dispatch(resetPlayer()),
  resetRequestStore: () => dispatch(resetRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

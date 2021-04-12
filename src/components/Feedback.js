import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { rankingAction } from '../actions/rankingAction';

class Feedback extends React.Component {
  render() {
    const { score, assertions, setPlayer, player } = this.props;
    const magicNumber = 3;

    return (
      <div>
        <h1 data-testid="feedback-text">FEEDBACK</h1>
        <div>
          { assertions < magicNumber
          && <h3 data-testid="feedback-text">Podia ser melhor...</h3> }
          { assertions >= magicNumber
          && <h3 data-testid="feedback-text">Mandou bem!</h3> }
        </div>
        <p data-testid="feedback-total-question">{assertions}</p>
        <p data-testid="feedback-total-score">{score}</p>
        <div>
          <Link to="/">
            <button type="button" data-testid="btn-play-again">
              Jogar novamente
            </button>
          </Link>
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ () => setPlayer(player) }
            >
              Ver Ranking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.gameReducer.player.name,
  gravatar: state.gameReducer.player.gravatar,
  score: state.gameReducer.player.score,
  assertions: state.gameReducer.player.assertions,
  player: state.gameReducer.player,
});

const mapDispatchToProps = (dispatch) => ({
  setPlayer: (player) => dispatch(rankingAction(player)),
});

Feedback.propTypes = {
  gravatar: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
  assertions: PropTypes.number,
  setPlayer: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

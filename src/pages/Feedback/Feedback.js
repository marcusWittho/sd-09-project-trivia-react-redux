import React from 'react';
import { connect } from 'react-redux';
import { number, shape, func } from 'prop-types';
import { Redirect } from 'react-router-dom';
import actionNewGame from '../../redux/actions/actionNewGame';
import actionResetCounter from '../../redux/actions/actionResetCounter';
import actionCleanOptionAnswers from '../../redux/actions/actionCleanOptionAnswers';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isNewGame: false,
    };
  }

  handleClick() {
    const { startNewGame, resetTimer, cleanOptionAnswers } = this.props;
    startNewGame();
    resetTimer();
    cleanOptionAnswers();
    this.setState({
      isNewGame: true,
    });
  }

  render() {
    const { player } = this.props;
    const { isNewGame } = this.state;
    const { assertions, name, score, gravatarEmail, validLogin } = player;
    if (!validLogin) return <Redirect exact to="/" />;
    if (isNewGame) return <Redirect to="/" />;
    return (
      <div>
        <header>
          <p data-testid="header-player-name">{ name }</p>
          <img
            data-testid="header-profile-picture"
            src={ gravatarEmail }
            alt={ `Avatar de ${name}` }
          />
          <p data-testid="header-score">{ score }</p>
        </header>
        <p data-testid="feedback-text">
          { assertions > 2 ? 'Mandou bem!' : 'Podia ser melhor...' }
        </p>
        <p>
          Você acertou
          <span data-testid="feedback-total-question">
            { assertions }
          </span>
          questões!
        </p>
        <p>
          Um total de
          <span data-testid="feedback-total-score">
            { score }
          </span>
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Jogar Novamente
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  player: shape({
    assertions: number,
  }).isRequired,
  startNewGame: func.isRequired,
  resetTimer: func.isRequired,
  cleanOptionAnswers: func.isRequired,
};

const mapStateToProps = (state) => ({
  player: state.playerReducer.player,
});

const mapDispatchToProps = (dispatch) => ({
  startNewGame: () => dispatch(actionNewGame()),
  resetTimer: () => dispatch(actionResetCounter()),
  cleanOptionAnswers: () => dispatch(actionCleanOptionAnswers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);

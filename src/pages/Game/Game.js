import React from 'react';
import { connect } from 'react-redux';
import { string, shape, arrayOf, bool, number } from 'prop-types';
import { Redirect } from 'react-router';
import actionAddQuestions from '../../redux/actions/actionAddQuestion';
import actionDecreaseTime from '../../redux/actions/actionDecreaseTime';
import actionResetCounter from '../../redux/actions/actionResetCounter';
import MultipleAnswers from '../../components/MultipleAnswers';
import BooleanAnswers from '../../components/BooleanAnswers';
import Loading from '../../components/Loading/Loading';
import actionDisableButton from '../../redux/actions/actionDisableButton';
import ShowButton from '../../redux/actions/actionShowButton';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  componentDidMount() {
    console.log('did mount');
    this.counterTimer();
  }

  // Fazer a verificação, se a questão foi marcada então passe para a próxima
  handleNextQuestion() {
    const { ResetCounter, DisableButton, StateShowButton } = this.props;
    ResetCounter();
    DisableButton(false);
    StateShowButton(false);
    this.setState((previousState) => ({
      counter: previousState.counter + 1,
    }));
  }

  counterTimer() {
    const mileseconds = 1000;
    setInterval(() => {
      const { time, decreaseTime, stateDisableButton, stateShowButton } = this.props;
      if (time !== 0) {
        decreaseTime();
      } else {
        stateDisableButton(true);
        stateShowButton(true);
      }
    }, mileseconds);
  }

  render() {
    const { player, questions, isFetching, showButton, time } = this.props;
    const { validLogin } = player;
    const { counter } = this.state;
    if (!validLogin) return <Redirect exact to="/" />;
    if (isFetching || !questions) return <Loading />;
    return (
      <section className="game-container">
        <header>
          <img
            src={ player.gravatarEmail }
            alt={ `Avatar ${player.name}` }
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ player.name }</p>
          <p data-testid="header-score">Score: 0</p>
        </header>
        <main className="main-container">
          <div className="answers">
            <p>{ `Tempo: ${time}` }</p>
            { (questions) && questions.map((question) => (
              (question.type === 'multiple')
                ? <MultipleAnswers question={ question } />
                : <BooleanAnswers question={ question } />
            ))[counter] }
            {(showButton) && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ () => this.handleNextQuestion() }
              >
                Próxima
              </button>
            )}

          </div>
        </main>
      </section>
    );
  }
}

const mapStateToProps = ({ playerReducer, questionsReducer }) => ({
  player: playerReducer.player,
  questions: questionsReducer.questions,
  isFetching: questionsReducer.isFetching,
  showButton: questionsReducer.showButtonNextQuestion,
  time: questionsReducer.timer,
});

const mapDispatchToProps = (dispatch) => ({
  ResetCounter: () => dispatch(actionResetCounter()),
  DisableButton: (value) => dispatch(actionDisableButton(value)),
  StateShowButton: (value) => dispatch(ShowButton(value)),
  decreaseTime: () => dispatch(actionDecreaseTime()),
  stateDisableButton: (value) => dispatch(actionDisableButton(value)),
  stateShowButton: (value) => dispatch(ShowButton(value)),
});

Game.propTypes = {
  player: shape({
    name: string,
    gravatarEmail: string,
    assertions: string,
    score: string,
  }).isRequired,
  questions: arrayOf(shape()).isRequired,
  time: number.isRequired,
  isFetching: bool.isRequired,
  showButton: bool.isRequired,
  ResetCounter: number.isRequired,
  DisableButton: bool.isRequired,
  StateShowButton: bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

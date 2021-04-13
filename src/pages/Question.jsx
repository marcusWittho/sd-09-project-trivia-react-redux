import React from 'react';
import { string, objectOf } from 'prop-types';
import { connect } from 'react-redux';
import { handleAssertions, resetTimer, startTimer,
  tick, wasAnsweredAction } from '../redux/actions';
import './css/question.css';
import CountdownTimer from './components/CountdownTimer';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.createHeader = this.createHeader.bind(this);
    this.inQuestion = this.inQuestion.bind(this);
    this.testId = this.testId.bind(this);
    this.multiQuestion = this.multiQuestion.bind(this);
    this.verifyAnswers = this.verifyAnswers.bind(this);
    this.handleIndex = this.handleIndex.bind(this);
    this.stopWatch = this.stopWatch.bind(this);

    this.state = {
      indexQuestion: 0,
      numQuestion: 4,
      TIMER_RESET_CHECK: 30,
    };
  }

  // componentDidMount() {
  //   const { propStartTimer } = this.props;
  //   propStartTimer();
  // }

  createHeader() {
    const { playerState: { name, score, gravatarEmail } } = this.props;
    return (
      <header className="header">
        <img
          src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
          alt="imagem do Gravatar"
          data-testid="header-profile-picture"
        />
        <h4 data-testid="header-player-name">{ name }</h4>
        <h4 data-testid="header-score">{ score }</h4>
      </header>
    );
  }

  testId(element, index) {
    return ((element)
      ? 'data-testid="correct_answer"'
      : `data-testid=wrong-answer-${index}`
    );
  }

  stopWatch() {
    const { propWasAnswered, timerId } = this.props;
    clearInterval(timerId);
    propWasAnswered();
  }

  verifyAnswers(value, correct) {
    const { propHandleAssertions } = this.props;
    this.stopWatch();
    if (value === correct) {
      propHandleAssertions(1);
    }
  }

  handleIndex() {
    const { indexQuestion, numQuestion } = this.state;
    const { propResetTimer } = this.props;
    propResetTimer();
    if (indexQuestion < numQuestion) {
      this.setState((prev) => ({ indexQuestion: prev.indexQuestion + 1 }));
    }
  }

  multiQuestion({ correct_answer: correctAnswer, sortedOptions,
    incorrect_answers: incorrectAnswers, category, question }) {
    const options = [...incorrectAnswers, correctAnswer];
    const { wasAnswered } = this.props;
    return (
      <div className="mult-answer">
        <div className="mult-container">
          <CountdownTimer />
          <section className="mult-question">
            <h3 data-testid="question-category">{ category }</h3>
            <p data-testid="question-text">{ question }</p>
          </section>
          <aside className="mult-aside">
            { [...sortedOptions].map((btn, index) => (
              <button
                type="button"
                key={ index }
                disabled={ wasAnswered }
                onClick={ () => this.verifyAnswers(btn, correctAnswer) }
                data-testid={ btn === correctAnswer
                  ? 'correct-answer'
                  : `wrong-answer-${options.indexOf(btn)}` }
              >
                { btn }
              </button>
            )) }
          </aside>
        </div>
        { wasAnswered
          ? <button type="button" datatest-id="btn-next" onClick={ this.handleIndex }>PRÓXIMO</button>
          : <div /> }
      </div>
    );
  }

  inQuestion() {
    const { dataAnswer, propStartTimer, timer, wasAnswered } = this.props;
    const { multiQuestion, stopWatch } = this;
    const { indexQuestion, TIMER_RESET_CHECK } = this.state;
    console.log(dataAnswer[indexQuestion]);
    if (timer === TIMER_RESET_CHECK && wasAnswered === true) { propStartTimer(); }
    if (timer === 0 && wasAnswered === false) { stopWatch(); }
    if (dataAnswer[indexQuestion].type === 'boolean') {
      const {
        category, question, correct_answer: correctAnswer,
      } = dataAnswer[indexQuestion];
      return (
        <div className="boll-answer">
          <CountdownTimer />
          <section className="bool-question">
            <h3 data-testid="question-category">{ category }</h3>
            <p data-testid="question-text">{ question }</p>
          </section>
          <aside className="bool-aside">
            <button
              type="button"
              onClick={ () => this.verifyAnswers('True', correctAnswer) }
              disabled={ wasAnswered }
            >
              Verdadeiro
            </button>
            <button
              type="button"
              onClick={ () => this.verifyAnswers('False', correctAnswer) }
              disabled={ wasAnswered }
            >
              Falso
            </button>
          </aside>
          { wasAnswered
            ? <button type="button" datatest-id="btn-next" onClick={ this.handleIndex }>PRÓXIMO</button>
            : <div /> }
        </div>
      );
    }
    return multiQuestion(dataAnswer[indexQuestion]);
  }

  render() {
    const { dataAnswer } = this.props;
    return (
      <div className="question">
        { this.createHeader() }
        <h1>Game</h1>
        { dataAnswer ? this.inQuestion() : 'Carregando' }
      </div>
    );
  }
}

const mapStateToProps = ((state) => ({
  dataAnswer: state.dataGame.data.results,
  playerState: state.player,
  timer: state.timer.timer,
  wasAnswered: state.timer.wasAnswered,
  timerId: state.timer.timerId,
}));

const mapDispatchToProps = (dispatch) => ({
  propHandleAssertions: (assertions) => dispatch(handleAssertions(assertions)),
  propStartTimer: () => {
    const INTERVAL = 1000;
    const timerId = setInterval(() => { dispatch(tick()); }, INTERVAL);
    dispatch(startTimer(timerId));
  },
  propResetTimer: () => dispatch(resetTimer()),
  propWasAnswered: () => dispatch(wasAnsweredAction()),
});

Question.propTypes = {
  dataAnswer: string,
  playerState: objectOf({
    name: string,
    gravatarEmail: string,
  }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Question);

import React from 'react';
import { string, shape, arrayOf, number, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import actionAddScore from '../redux/actions/actionAddScore';
import actionDecreaseTime from '../redux/actions/actionDecreaseTime';
import actionDisableButton from '../redux/actions/actionDisableButton';
import ShowButton from '../redux/actions/actionShowButton';
import actionResetFunction from '../redux/actions/actionResetFunction';

const correctAnswer = 'correct-answer';
class MultipleAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.randomAnswer = this.randomAnswer.bind(this);
    this.selectDataTest = this.selectDataTest.bind(this);

    this.handleClcik = this.handleClcik.bind(this);
    this.setScoreInGloblaState = this.setScoreInGloblaState.bind(this);
    this.state = {
      optionAnswers: [],
      correctClass: '',
      wrongClass: '',
      // disableButtons: false,
    };
  }

  componentDidMount() {
    this.randomAnswer();
  }

  setScoreInGloblaState() {
    const { question, time, addScore } = this.props;
    const hardPoints = 3;
    const constant = 10;
    let difficultyNumber;
    if (question.difficulty === 'hard') difficultyNumber = hardPoints;
    if (question.difficulty === 'medium') difficultyNumber = 2;
    if (question.difficulty === 'easy') difficultyNumber = 1;
    const points = (constant + (time * difficultyNumber));
    addScore(points);
  }

  handleClcik({ target }) {
    const { stateDisableButton, stateShowButton } = this.props;
    const { id } = target;
    if (id === correctAnswer) {
      this.setScoreInGloblaState();
    }
    this.setState({
      correctClass: 'correct-answer',
      wrongClass: 'wrong-answer',
    });
    stateDisableButton(true);
    stateShowButton(true);
  }

  selectDataTest(option, index) {
    const { question } = this.props;
    if (question.correct_answer !== option) {
      return `wrong-answer-${index}`;
    }
    return correctAnswer;
  }

  randomAnswer() {
    const { question } = this.props;
    const optionAnswers = question.incorrect_answers;
    const maxNumber = 4;
    optionAnswers
      .splice(Math.floor(Math.random() * maxNumber), 0, question.correct_answer);
    this.setState({
      optionAnswers,
    });
  }

  render() {
    const { optionAnswers, correctClass, wrongClass } = this.state;
    const { question, disableButton } = this.props;
    let index = 0;
    return (
      <div>
        <div className="question-container">
          <h3 className="question-category" data-testid="question-category">
            { question.category }
          </h3>
          <p data-testid="question-text">{ question.question }</p>
        </div>
        {optionAnswers.map((option) => {
          const dataTestId = this.selectDataTest(option, index);
          if (dataTestId !== correctAnswer) index += 1;
          return (
            <button
              id={ dataTestId }
              className={ dataTestId === correctAnswer ? correctClass : wrongClass }
              type="button"
              key={ option }
              data-testid={ dataTestId }
              disabled={ disableButton }
              onClick={ this.handleClcik }
            >
              { option }
            </button>);
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  time: state.questionsReducer.timer,
  disableButton: state.questionsReducer.disableButton,
  player: state.playerReducer.player
});

const mapDispatchToProps = (dispatch) => ({
  decreaseTime: () => dispatch(actionDecreaseTime()),
  stateDisableButton: (value) => dispatch(actionDisableButton(value)),
  stateShowButton: (value) => dispatch(ShowButton(value)),
  resetFunctions: () => dispatch(actionResetFunction()),
  addScore: (points) => dispatch(actionAddScore(points)),
});

MultipleAnswers.propTypes = {
  question: shape({
    correct_answer: string,
    incorrect_answers: arrayOf(string),
  }).isRequired,
  addScore: func.isRequired,
  time: number.isRequired,
  decreaseTime: func.isRequired,
  resetFunctions: func.isRequired,
  stateDisableButton: bool.isRequired,
  stateShowButton: bool.isRequired,
  disableButton: bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipleAnswers);

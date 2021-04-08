import React from 'react';
import { string, shape, arrayOf, func, number, bool } from 'prop-types';
import { connect } from 'react-redux';
import actionDecreaseTime from '../redux/actions/actionDecreaseTime';
<<<<<<< HEAD
import actionDisableButton from '../redux/actions/actionDisableButton';
import ShowButton from '../redux/actions/actionShowButton';
import actionResetFunction from '../redux/actions/actionResetFunction';
=======
import actionAddScore from '../redux/actions/actionAddScore';
>>>>>>> 285e531722e4a890fa02ab62959934cb60fba019

const correctAnswer = 'correct-answer';
class BooleanAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.selectDataTest = this.selectDataTest.bind(this);
    this.handleClcik = this.handleClcik.bind(this);
<<<<<<< HEAD
=======
    this.counterTimer = this.counterTimer.bind(this);
    this.setScoreInGloblaState = this.setScoreInGloblaState.bind(this);
>>>>>>> 285e531722e4a890fa02ab62959934cb60fba019

    this.state = {
      correctClass: '',
      wrongClass: '',
      // disableButtons: false,
    };
  }

<<<<<<< HEAD
  handleClcik() {
=======
  componentDidMount() {
    this.counterTimer();
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

  counterTimer() {
    const mileseconds = 1000;
    setInterval(() => {
      const { time, decreaseTime } = this.props;
      return (time > 0) ? decreaseTime() : this.setState({ disableButtons: true });
    }, mileseconds);
  }

  handleClcik({ target }) {
    const { id } = target;
    if (id === correctAnswer) {
      this.setScoreInGloblaState();
    }
>>>>>>> 285e531722e4a890fa02ab62959934cb60fba019
    this.setState({
      correctClass: 'correct-answer',
      wrongClass: 'wrong-answer',
    });
  }

  selectDataTest(option, index) {
    const { question } = this.props;
    if (question.correct_answer !== option) {
      return `wrong-answer-${index}`;
    }
    return correctAnswer;
  }

  render() {
    const { question, time, disableButton } = this.props;
    const { correctClass, wrongClass } = this.state;
    const answers = ['True', 'False'];
    const index = 0;
    return (
      <div>
        <div className="question-container">
          <h3 className="question-category" data-testid="question-category">
            { question.category }
          </h3>
          <p data-testid="question-text">{ question.question }</p>
        </div>
        { answers.map((option) => {
          const dataTestId = this.selectDataTest(option, index);
          return (
            <button
              id={ dataTestId }
              className={ dataTestId === correctAnswer ? correctClass : wrongClass }
              type="button"
              key={ option }
              data-testid={ dataTestId }
              onClick={ this.handleClcik }
              disabled={ disableButton }
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
});

const mapDispatchToProps = (dispatch) => ({
  decreaseTime: () => dispatch(actionDecreaseTime()),
<<<<<<< HEAD
  stateDisableButton: (value) => dispatch(actionDisableButton(value)),
  stateShowButton: (value) => dispatch(ShowButton(value)),
  resetFunctions: () => dispatch(actionResetFunction()),
=======
  addScore: (points) => dispatch(actionAddScore(points)),
>>>>>>> 285e531722e4a890fa02ab62959934cb60fba019
});

BooleanAnswers.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(BooleanAnswers);

import React from 'react';
import { string, shape, arrayOf, number, func } from 'prop-types';
import { connect } from 'react-redux';
import actionAddScore from '../redux/actions/actionAddScore';
import actionDecreaseTime from '../redux/actions/actionDecreaseTime';

const correctAnswer = 'correct-answer';
class MultipleAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.randomAnswer = this.randomAnswer.bind(this);
    this.selectDataTest = this.selectDataTest.bind(this);
    this.counterTimer = this.counterTimer.bind(this);

    this.handleClcik = this.handleClcik.bind(this);
    this.setInLocalStorage = this.setInLocalStorage.bind(this);
    this.state = {
      optionAnswers: [],
      correctClass: '',
      wrongClass: '',
      disableButtons: false,
    };
  }

  componentDidMount() {
    this.randomAnswer();
    this.counterTimer();
  }

  setInLocalStorage(points) {
    const { addScore } = this.props;
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
    const { question } = this.props;
    const { id } = target;
    const hardPoints = 3;
    const time = 17;
    let difficultyNumber;
    if (question.difficulty === 'hard') difficultyNumber = hardPoints;
    if (question.difficulty === 'medium') difficultyNumber = 2;
    if (question.difficulty === 'easy') difficultyNumber = 1;
    if (id === correctAnswer) {
      const constant = 10;
      const points = constant + (time * difficultyNumber);
      this.setInLocalStorage(points);
    }
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

  randomAnswer() {
    const { question } = this.props;
    const optionAnswers = question.incorrect_answers;
    const maxNumber = 4;
    if (optionAnswers.length < maxNumber) {
      optionAnswers
        .splice(Math.floor(Math.random() * maxNumber), 0, question.correct_answer);
      this.setState({
        optionAnswers,
      });
    } else {
      this.setState({
        optionAnswers,
      });
    }
  }

  render() {
    const { optionAnswers, correctClass, wrongClass, disableButtons } = this.state;
    const { question, time } = this.props;
    let index = 0;
    return (
      <div>
        <div className="question-container">
          <p>{ `Tempo: ${time}` }</p>
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
              disabled={ disableButtons }
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
});

const mapDispatchToProps = (dispatch) => ({
  decreaseTime: () => dispatch(actionDecreaseTime()),
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
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipleAnswers);

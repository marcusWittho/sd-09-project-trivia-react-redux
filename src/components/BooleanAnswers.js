import React from 'react';
import { string, shape, arrayOf, func, number } from 'prop-types';
import { connect } from 'react-redux';
import actionDecreaseTime from '../redux/actions/actionDecreaseTime';

const correctAnswer = 'correct-answer';
class BooleanAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.selectDataTest = this.selectDataTest.bind(this);
    this.handleClcik = this.handleClcik.bind(this);
    this.counterTimer = this.counterTimer.bind(this);

    this.state = {
      correctClass: '',
      wrongClass: '',
      disableButtons: false,
    };
  }

  componentDidMount() {
    this.counterTimer();
  }

  counterTimer() {
    const mileseconds = 1000;
    setInterval(() => {
      const { time, decreaseTime } = this.props;
      return (time > 0) ? decreaseTime() : this.setState({ disableButtons: true });
    }, mileseconds);
  }

  handleClcik() {
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
    const { question, time } = this.props;
    const { correctClass, wrongClass, disableButtons } = this.state;
    const answers = ['True', 'False'];
    const index = 0;
    return (
      <div>
        <div className="question-container">
          <p>{ `Tempo: ${time}` }</p>
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
              disabled={ disableButtons }
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
});

BooleanAnswers.propTypes = {
  question: shape({
    correct_answer: string,
    incorrect_answers: arrayOf(string),
  }).isRequired,
  time: number.isRequired,
  decreaseTime: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooleanAnswers);

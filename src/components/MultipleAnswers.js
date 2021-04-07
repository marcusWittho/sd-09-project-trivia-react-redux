import React from 'react';
import { string, shape, arrayOf } from 'prop-types';
import { connect } from 'react-redux';
import actionDecreaseTime from '../redux/actions/actionDecreaseTime';

class MultipleAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.randomAnswer = this.randomAnswer.bind(this);
    this.selectDataTest = this.selectDataTest.bind(this);
    this.counterTimer = this.counterTimer.bind(this);

    this.state = {
      optionAnswers: [],
      disableButtons: false,
    };
  }

  componentDidMount() {
    this.randomAnswer();
  }

  counterTimer() {
    const mileseconds = 1000;
    setInterval(() => {
      const { time, decreaseTime } = this.props;
      return (time > 0) ? decreaseTime() : this.setState({ disableButtons: true });
    }, mileseconds);
  }

  selectDataTest(option, index) {
    const { question } = this.props;
    if (question.correct_answer !== option) {
      return `wrong-answer-${index}`;
    }
    return 'correct-answer';
  }

  randomAnswer() {
    const { disableButtons } = this.state;
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
    setTimeout(() => this.counterTimer(), 1000);
  }

  render() {
    const { optionAnswers, disableButtons } = this.state;
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
          if (dataTestId !== 'correct-answer') index += 1;
          return (
            <button
              type="button"
              key={ option }
              data-testid={ dataTestId }
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
  decreaseTime: () => dispatch(actionDecreaseTime())
});

MultipleAnswers.propTypes = {
  question: shape({
    correct_answer: string,
    incorrect_answers: arrayOf(string),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipleAnswers);

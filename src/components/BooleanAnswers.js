import React from 'react';
import { string, shape, arrayOf, func, number, bool } from 'prop-types';
import { connect } from 'react-redux';
import actionDecreaseTime from '../redux/actions/actionDecreaseTime';
import actionDisableButton from '../redux/actions/actionDisableButton';
import ShowButton from '../redux/actions/actionShowButton';
import actionResetFunction from '../redux/actions/actionResetFunction';

const correctAnswer = 'correct-answer';
class BooleanAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.selectDataTest = this.selectDataTest.bind(this);
    this.handleClcik = this.handleClcik.bind(this);

    this.state = {
      correctClass: '',
      wrongClass: '',
      // disableButtons: false,
    };
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
  stateDisableButton: (value) => dispatch(actionDisableButton(value)),
  stateShowButton: (value) => dispatch(ShowButton(value)),
  resetFunctions: () => dispatch(actionResetFunction()),
});

BooleanAnswers.propTypes = {
  question: shape({
    correct_answer: string,
    incorrect_answers: arrayOf(string),
  }).isRequired,
  time: number.isRequired,
  decreaseTime: func.isRequired,
  resetFunctions: func.isRequired,
  stateDisableButton: bool.isRequired,
  stateShowButton: bool.isRequired,
  disableButton: bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooleanAnswers);

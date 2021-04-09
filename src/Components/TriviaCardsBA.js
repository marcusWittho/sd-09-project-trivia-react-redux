import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateIndex } from '../redux/actions';

class BooleanAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // choice: [],
      rightAnswerClass: '',
      wrongAnswerClass: '',
      nextButton: true,
      correctAnswer: 'correct-answer',
    };
    this.validateAnswers = this.validateAnswers.bind(this);
    this.updateQuestIndex = this.updateQuestIndex.bind(this);
    this.answerCheck = this.answerCheck.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidUpdate() {
    // this.updateQuestIndex();
  }

  validateAnswers(option, index) {
    const { question } = this.props;
    if (question.correct_answer !== option) {
      return `wrong-answer-${index}`;
    }
    return 'correct-answer';
  }

  updateQuestIndex() {
    const { questIndex, dispatchIndex } = this.props;
    let newIndex = questIndex;
    newIndex += 1;
    dispatchIndex(newIndex);
  }

  answerCheck() {
    this.setState({
      nextButton: false,
      rightAnswerClass: 'rightAnswer',
      wrongAnswerClass: 'wrongAnswer',
    });
  }

  nextQuestion() {
    this.updateQuestIndex();
    // nos teste ele nao mudou nada que percebi
    // this.createChoices();
    this.setState({ rightAnswerClass: '',
      wrongAnswerClass: '',
      nextButton: true,
    });
  }

  render() {
    const { rightAnswerClass, wrongAnswerClass, nextButton, correctAnswer } = this.state;
    const { question } = this.props;
    const answers = ['True', 'False'];
    const index = 0;
    return (
      <div>
        <div>
          <h3 data-testid="question-category">
            { question.category }
          </h3>
          <p data-testid="question-text">{ question.question }</p>
        </div>
        { answers.map((option) => {
          const dataTestId = this.validateAnswers(option, index);
          return (
            <button
              className={ dataTestId === correctAnswer ? rightAnswerClass
                : wrongAnswerClass }
              type="button"
              key={ option }
              data-testid={ dataTestId }
              onClick={ this.answerCheck }
            >
              { option }
            </button>);
        })}
        <button
          data-testid="btn-next"
          type="button"
          onClick={ this.nextQuestion }
          disabled={ nextButton }
        >
          next
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  questIndex: game.index,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchIndex: (index) => dispatch(updateIndex(index)),
});

BooleanAnswers.propTypes = {
  questIndex: PropTypes.number.isRequired,
  dispatchIndex: PropTypes.func.isRequired,
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooleanAnswers);

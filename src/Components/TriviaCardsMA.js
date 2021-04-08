import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateIndex } from '../redux/actions';

class MultipleAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: [],
    };
    this.validateAnswers = this.validateAnswers.bind(this);
    this.createChoices = this.createChoices.bind(this);
    this.updateQuestIndex = this.updateQuestIndex.bind(this);
  }

  componentDidMount() {
    this.createChoices();
  }

  updateQuestIndex() {
    const { questIndex, dispatchIndex } = this.props;
    let newIndex = questIndex;
    newIndex += 1;
    dispatchIndex(newIndex);
  }

  createChoices() {
    const { question } = this.props;
    const choice = question.incorrect_answers;
    const choices = 4;
    if (choice.length < choices) {
      choice.splice(Math.floor(Math.random() * choices),
        0, question.correct_answer);
      this.setState({ choice });
    } else {
      this.setState({ choice });
    }
  }

  validateAnswers(answer, index) {
    const { question } = this.props;
    if (question.correct_answer !== answer) {
      return `wrong-answer-${index}`;
    }
    return 'correct-answer';
  }

  render() {
    const { choice } = this.state;
    const { question } = this.props;
    let index = 0;
    return (
      <div>
        <h3 data-testid="question-category">
          { question.category }
        </h3>
        <p data-testid="question-text">{ question.question }</p>
        {choice.map((answer) => {
          const dataTestId = this.validateAnswers(answer, index);
          if (dataTestId !== 'correct-answer') index += 1;
          return (
            <button
              type="button"
              key={ answer }
              data-testid={ dataTestId }
              onClick={ this.updateQuestIndex }
            >
              { answer }
            </button>);
        })}
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

MultipleAnswers.propTypes = {
  questIndex: PropTypes.number.isRequired,
  dispatchIndex: PropTypes.func.isRequired,
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipleAnswers);

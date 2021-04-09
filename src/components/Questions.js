import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions/game';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
    };
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  render() {
    const { questions } = this.props;
    const { questionIndex } = this.state;

    if (questions.length === 0) {
      return (
        <>
          <h1>Loading...</h1>
          <p data-testid="question-category" />
          <p data-testid="question-text" />
          <p data-testid="correct-answer" />
          <p data-testid="wrong-answer" />
        </>
      );
    }
    return (
      <main>
        <p
          data-testid="question-category"
        >
          Categoria:
          { questions[questionIndex].category }
        </p>
        <p data-testid="question-text">{ questions[0].question }</p>
        <button type="button" data-testid="correct-answer">
          { questions[questionIndex].correct_answer }
        </button>
        <button type="button" data-testid="wrong-answer-0">
          { questions[questionIndex].incorrect_answers[0] }
        </button>
        <button type="button" data-testid="wrong-answer-1">
          { questions[questionIndex].incorrect_answers[1] }
        </button>
        <button type="button" data-testid="wrong-answer-2">
          { questions[questionIndex].incorrect_answers[2] }
        </button>
      </main>
    );
  }
}

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  isLoading: state.game.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

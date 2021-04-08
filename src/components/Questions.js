import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions/game';

class Questions extends React.Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions();
  }

  render() {
    const { questions } = this.props;
    if (questions.length === 0) return <div />;
    return (
      <main>
        <p
          data-testid="question-category"
        >
          Categoria:
          { questions[1].category }
        </p>
        <p data-testid="question-text">{ questions[1].question }</p>
        <button type="button" data-testid="wrong-answer-0">
          { questions[1].correct_answer }
        </button>
        <button type="button" data-testid="wrong-answer-1">
          { questions[1].incorrect_answers[0] }
        </button>
        <button type="button" data-testid="wrong-answer-2">
          { questions[1].incorrect_answers[1] }
        </button>
        <button type="button" data-testid="wrong-answer-2">
          { questions[1].incorrect_answers[2] }
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
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

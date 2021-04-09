import React from 'react';
import { connect } from 'react-redux';
import { string, objectOf } from 'prop-types';
import { fetchQuestions } from '../actions';

class MainBody extends React.Component {
  render() {
    const { loading, questions } = this.props;
    if (loading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        {questions.results.map((question, index) => (
          <div key={ index }>
            <p data-testid="question-category">{ question.category }</p>
            <p data-testid="question-text">{ question.question }</p>
            <button
              type="button"
              data-testid="correct-answer"
            >
              { question.correct_answer }
            </button>
            { question.incorrect_answers.map((incorrectAnswer) => (
              <button
                type="button"
                key={ incorrectAnswer }
                data-testid="wrong-answer"
              >
                { incorrectAnswer }
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.loginReducer.token.token,
  questions: state.loginReducer.questions,
  loading: state.loginReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  requestQuestions: (token) => dispatch(fetchQuestions(token)),
});

MainBody.propTypes = {
  loading: string,
  questions: objectOf,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(MainBody);

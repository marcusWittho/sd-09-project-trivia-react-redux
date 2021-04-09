import React from 'react';
import { connect } from 'react-redux';
import { string, objectOf } from 'prop-types';
import { fetchQuestions } from '../actions';

class MainBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getQuestions: true,
      category: '',
      question: '',
      correctAnswer: '',
      incorrectAnswers: '',
    };
  }

  componentDidUpdate() {
    const { questions, loading } = this.props;
    const { getQuestions } = this.state;
    if (getQuestions) {
      this.setQuestionsToEstate();
    }
  }

  setQuestionsToEstate() {
    const { questions: { results } } = this.props;
    this.setState({
      getQuestions: false,
      category: results[0].category,
      question: results[0].question,
      correctAnswer: results[0].correct_answer,
      incorrectAnswers: results[0].incorrect_answers,
    });
  }

  renderQuestion(question) {
    
  }

  render() {
    const { loading } = this.props;
    const { category, question, correctAnswer, incorrectAnswers } = this.state;
    if (loading) {
      return <p>Loading...</p>;
    }
    return (
      // <div></div>
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <button
          type="button"
          data-testid="correct-answer"
        >
          { correctAnswer }
        </button>
        {/* { console.log(incorrectAnswers)} */}
        {incorrectAnswers && incorrectAnswers.map((incorrectAnswer) => (
          <button
            type="button"
            key={ incorrectAnswer }
            data-testid="wrong-answer"
          >
            { incorrectAnswer }
          </button>
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

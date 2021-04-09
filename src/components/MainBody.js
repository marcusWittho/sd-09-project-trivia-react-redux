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
      styleObj: {},
    };

    this.showAnswers = this.showAnswers.bind(this);
  }

  componentDidUpdate() {
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

  // renderQuestion(question) {
  // }

  showAnswers() {
    this.setState({
      styleObj: {
        correct: {
          border: '3px solid',
          borderColor: 'rgb(6, 240, 15)' },
        incorrect: {
          border: '3px solid',
          borderColor: 'rgb(255, 0, 0)' },
      },
    });
  }

  render() {
    const { loading } = this.props;
    const { category, question, correctAnswer, incorrectAnswers, styleObj } = this.state;
    if (loading) {
      return <p>Loading...</p>;
    }
    return (
      // <div></div>
      <div>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <button
          style={ styleObj.correct }
          onClick={ this.showAnswers }
          type="button"
          data-testid="correct-answer"
        >
          { correctAnswer }
        </button>
        {incorrectAnswers && incorrectAnswers.map((incorrectAnswer) => (
          <button
            style={ styleObj.incorrect }
            onClick={ this.showAnswers }
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

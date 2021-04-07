import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../services';

class Gameplay extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      questionList: {},
      questionIndex: 0,
    };
    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.testeSetState = this.testeSetState.bind(this);
  }

  async componentDidMount() {
    const { tokenState } = this.props;
    const questionList = await fetchQuestions(tokenState);
    this.testeSetState(questionList);
  }

  testeSetState(questionList) {
    this.setState({
      questionList,
      loading: false,
    });
  }

  renderQuestion() {
    const { questionList, questionIndex } = this.state;
    const currentQuestionInfo = questionList.results[questionIndex];
    return (
      <section>
        <h1 data-testid="question-category">
          { currentQuestionInfo.category}
        </h1>
        <p data-testid="question-text">{currentQuestionInfo.question}</p>
      </section>
    );
  }

  renderAnswers() {
    const { questionList, questionIndex } = this.state;
    const currentQuestionInfo = questionList.results[questionIndex];
    if (currentQuestionInfo.type === 'multiple') {
      return (
        <section>
          <button type="button" data-testid="correct-answer">
            {currentQuestionInfo.correct_answer}
          </button>
          <button type="button" data-testid="wrong-answer-0">
            {currentQuestionInfo.incorrect_answers[0]}
          </button>
          <button type="button" data-testid="wrong-answer-1">
            {currentQuestionInfo.incorrect_answers[1]}
          </button>
          <button type="button" data-testid="wrong-answer-2">
            {currentQuestionInfo.incorrect_answers[2]}
          </button>
        </section>
      );
    }
    return (
      <section>
        <button type="button" data-testid="correct-answer">
          {currentQuestionInfo.correct_answer}
        </button>
        <button type="button" data-testid="wrong-answer-0">
          {currentQuestionInfo.incorrect_answers[0]}
        </button>
      </section>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <main>
        { !loading && this.renderQuestion()}
        { !loading && this.renderAnswers()}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  tokenState: state.user.token,
});

Gameplay.propTypes = {
  tokenState: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Gameplay);

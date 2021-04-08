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
    this.randomAnswersOrder = this.randomAnswersOrder.bind(this);
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

  randomAnswersOrder() {
    const { questionList, questionIndex } = this.state;
    const currentQuestionInfo = questionList.results[questionIndex];
    const answersList = currentQuestionInfo.incorrect_answers;
    const correctAnswer = currentQuestionInfo.correct_answer;
    console.log(correctAnswer);
    const randomIndex = Math.floor(Math.random() * (answersList.length + 1));
    const newAnswersList = [...answersList];
    newAnswersList.splice(randomIndex, 0, correctAnswer);
    const answersAndPosition = {
      newAnswersList,
      randomIndex,
    };
    return answersAndPosition;
  }

  renderQuestion() {
    const { questionList, questionIndex } = this.state;
    const currentQuestionInfo = questionList.results[questionIndex];
    this.randomAnswersOrder();
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
    const answersAndPos = this.randomAnswersOrder();
    return (
      <section>
        { answersAndPos.newAnswersList.map((answer, index) => {
          if (answersAndPos.randomIndex === index) {
            return (
              <button data-testid="correct-answer" type="button">
                {answer}
              </button>);
          }
          return (
            <button data-testid={ `wrong-answer-${index}` } key={ index } type="button">
              {answer}
            </button>
          );
        })}
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

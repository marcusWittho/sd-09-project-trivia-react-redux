import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../services';
import '../CSS/gameplay.css';

class Gameplay extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      questionList: {},
      questionIndex: 0,
      correct: '',
      incorrect: '',
    };
    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.randomAnswersOrder = this.randomAnswersOrder.bind(this);
    this.chooseAnswer = this.chooseAnswer.bind(this);
  }

  async componentDidMount() {
    const { tokenState } = this.props;
    const questionList = await fetchQuestions(tokenState);
    this.randomAnswersOrder(questionList);
  }

  chooseAnswer() {
    this.setState({
      correct: 'correct',
      incorrect: 'incorrect',
    });
  }

  randomAnswersOrder(questionList) {
    const { questionIndex } = this.state;
    console.log(questionList);
    const questions = { ...questionList };
    const currentQuestionInfo = questions.results[questionIndex];
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
    this.setState({
      answersAndPosition,
      questionList: questions,
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
    const { answersAndPosition } = this.state;
    const { correct, incorrect } = this.state;
    return (
      <section>
        { answersAndPosition.newAnswersList.map((answer, index) => {
          if (answersAndPosition.randomIndex === index) {
            return (
              <button
                data-testid="correct-answer"
                onClick={ this.chooseAnswer }
                name="correct"
                className={ correct }
                type="button"
              >
                {answer}
              </button>);
          }
          return (
            <button
              data-testid={ `wrong-answer-${index}` }
              onClick={ this.chooseAnswer }
              name="incorrect"
              className={ incorrect }
              key={ index }
              type="button"
            >
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

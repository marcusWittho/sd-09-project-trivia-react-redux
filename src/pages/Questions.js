import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestionsToStore, timeRunOut } from '../actions/index';
import Timer from '../components/Timer';
import { getQuestions } from '../services/api';
import localStorageService from '../services/localStorage';

import './Questions.css';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNum: 0,
      questionTime: 30,
      buttonClicked: false,
    };

    this.renderQuestion = this.renderQuestion.bind(this);
    this.randomizedAnswers = this.randomizedAnswers.bind(this);
    this.hadleAnswerClick = this.hadleAnswerClick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  async componentDidMount() {
    const { saveQuestions } = this.props;
    const token = localStorageService.getToken();
    const API_RESULT = await getQuestions(token);
    saveQuestions(API_RESULT);
  }

  randomizedAnswers(question) {
    const { buttonClicked } = this.state;
    const { outaTime } = this.props;
    const SEED_TO_RANDOM = 0.5;
    const ANSWERS = [
      ...question.incorrect_answers.map((item, index) => (
        <button
          type="button"
          className={ buttonClicked || outaTime ? 'incorrect-answers' : 'answer-button' }
          key={ index + 1 }
          data-testid={ `wrong-answer-${index}` }
          onClick={ this.hadleAnswerClick }
          disabled={ outaTime }
        >
          {item}
        </button>)),
      (
        <button
          type="button"
          className={ buttonClicked || outaTime ? 'correct-answers' : 'answer-button' }
          key="0"
          data-testid="correct-answer"
          onClick={ this.hadleAnswerClick }
          disabled={ outaTime }
        >
          {question.correct_answer}
        </button>
      ),
    ];
    const RANDOMIZED = ANSWERS.sort(() => Math.random() - SEED_TO_RANDOM);
    return RANDOMIZED;
  }

  hadleAnswerClick() {
    this.setState({ buttonClicked: true });
  }

  nextQuestion() {
    const { resetTimer } = this.props;
    this.setState(({ questionNum }) => ({
      questionNum: questionNum + 1,
      buttonClicked: false,
    }));
    resetTimer(false);
  }

  renderQuestion(question) {
    const { buttonClicked } = this.state;
    const { outaTime } = this.props;
    return (
      <section>
        <p data-testid="question-category">{ question.category }</p>
        <p data-testid="question-text">{ question.question }</p>
        <div className="answer-options">
          {this.randomizedAnswers(question)}
        </div>
        <button
          className={ buttonClicked || outaTime ? 'next-enabled' : 'next-hidden' }
          type="button"
          data-testid="btn-next"
          onClick={ this.nextQuestion }
        >
          Next
        </button>
      </section>
    );
  }

  render() {
    const { questionNum, questionTime } = this.state;
    const { questions, outaTime } = this.props;
    const currentQuestion = questions[questionNum];
    return (
      <div>
        { !outaTime ? <Timer timeInterval={ questionTime } /> : <span>Time is up</span>}
        { currentQuestion && this.renderQuestion(currentQuestion) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.getQuestions.questions,
  outaTime: state.ranOutaTime.ranOutOfTime,
});

const mapDispatchToProps = (dispatch) => ({
  resetTimer: (bool) => dispatch(timeRunOut(bool)),
  saveQuestions: (questions) => dispatch(getQuestionsToStore(questions)),
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(Object).isRequired,
  outaTime: PropTypes.bool.isRequired,
  resetTimer: PropTypes.func.isRequired,
  saveQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getQuestionsToStore } from '../actions/index';
import Timer from '../components/Timer';
import { getQuestions } from '../services/api';
import localStorageService from '../services/localStorage';

import './Questions.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNum: 0,
      randomizedAnswers: [],
      showAnswers: false,

    };
    this.timer = React.createRef();
    this.renderQuestion = this.renderQuestion.bind(this);
    this.randomizedAnswers = this.randomizeAnswers.bind(this);
    this.hadleAnswerClick = this.hadleAnswerClick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.handleTimeUp = this.handleTimeUp.bind(this);
  }

  async componentDidMount() {
    const { saveQuestions } = this.props;
    const { questionNum } = this.state;
    const token = localStorageService.getToken();
    const API_RESULT = await getQuestions(token);
    saveQuestions(API_RESULT);
    this.randomizeAnswers(API_RESULT[questionNum]);
    this.timer.current.start();
  }

  handleTimeUp() {
    this.setState({ showAnswers: true });
  }

  randomizeAnswers(question) {
    const SEED_TO_RANDOM = 0.5;
    const ANSWERS = [
      ...question.incorrect_answers.map((item) => ({ answer: item, isCorrect: false }
      )),
      { answer: question.correct_answer, isCorrect: true },
    ];
    const RANDOMIZED = ANSWERS.sort(() => Math.random() - SEED_TO_RANDOM);
    this.setState({ randomizedAnswers: RANDOMIZED });
  }

  hadleAnswerClick(isCorrect) {
    this.setState({ showAnswers: true });
    this.timer.current.pause();
    if (isCorrect) {
      const responseTime = this.timer.current.getTime();
      localStorageService.addPointsToScore(responseTime, 1);
    }
  }

  nextQuestion() {
    const { questionNum } = this.state;
    const { questions } = this.props;
    const currentIndex = questionNum + 1;
    const currentQuestion = questions[currentIndex];

    if (currentQuestion) {
      this.randomizeAnswers(currentQuestion);
      this.setState(() => ({
        questionNum: currentIndex,
        showAnswers: false,
      }));
      this.timer.current.reset();
      this.timer.current.start();
    } else {
      this.setState(() => ({
        questionNum: currentIndex,
      }));
    }
  }

  renderAnswers() {
    const { randomizedAnswers, showAnswers } = this.state;
    return randomizedAnswers.map(({ answer, isCorrect }, key) => (
      <button
        type="button"
        className={ `answer-button
         ${showAnswers && (isCorrect ? 'correct-answers' : 'incorrect-answers')}` }
        key={ answer }
        data-testid={ isCorrect ? 'correct-answer' : `wrong-answer-${key}` }
        onClick={ () => this.hadleAnswerClick(isCorrect) }
        disabled={ showAnswers }
      >
        {answer}
      </button>
    ));
  }

  renderQuestion(question) {
    const { showAnswers } = this.state;
    return (
      <section>
        <p data-testid="question-category">{ question.category }</p>
        <p data-testid="question-text">{ question.question }</p>
        <div className="answer-options">
          {this.renderAnswers()}
        </div>
        <button
          className={ showAnswers ? 'next-enabled' : 'next-hidden' }
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
    const { questionNum } = this.state;
    const { questions } = this.props;
    const currentQuestion = questions[questionNum];
    const endArray = questionNum >= questions.length;
    if (questionNum !== 0 && endArray) return <Redirect to="/feedback" />;
    return (
      <>
        <Header />
        <section className="questions-container">
          <p data-testid="header-score">Score: 0</p>
          <Timer ref={ this.timer } timeUp={ this.handleTimeUp } />
          { currentQuestion && this.renderQuestion(currentQuestion) }
        </section>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.getQuestions.questions,
});

const mapDispatchToProps = (dispatch) => ({
  saveQuestions: (questions) => dispatch(getQuestionsToStore(questions)),
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(Object).isRequired,
  saveQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

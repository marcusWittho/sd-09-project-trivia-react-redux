import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import getQuestionsApiAction from '../redux/Actions/getRequestQuestionsApiAction';
import Header from '../components/Header';
import NextQuestionButton from '../components/NextQuestionButton';
import Timer from '../components/Timer';
import '../styles/styleButonsAnswers.css';

class ScreenGame extends React.Component {
  constructor(props) {
    super(props);
    const { userName, userEmail } = props;
    this.state = {
      correct: '',
      allAnswers: [],
      showNextQuestion: false,
      difficulty: '',
      player: {
        name: userName,
        assertions: 0,
        score: 0,
        gravatarEmail: userEmail,
      },
      category: '',
      question: '',
      timer: 30,
      restartTime: false,
      changeClass: false,
      indexQuestion: 0,
      redirect: false,
    };
    this.updateState = this.updateState.bind(this);
    this.changeClassAnswer = this.changeClassAnswer.bind(this);
    this.changeClassCorrectAnswer = this.changeClassCorrectAnswer.bind(this);
    this.addScore = this.addScore.bind(this);
    this.difficultScore = this.difficultScore.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.setIndexQuestion = this.setIndexQuestion.bind(this);
    this.attQuestions = this.attQuestions.bind(this);
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    const token = localStorage.getItem('token');
    getQuestions(token);
    const { player } = this.state;
    localStorage.setItem('state', JSON.stringify(player));
  }

  componentDidUpdate(props) {
    if (props !== this.props) {
      this.attQuestions();
      this.addScore();
    }
  }

  setIndexQuestion() {
    const { indexQuestion } = this.state;
    const four = 4;
    if (indexQuestion < four) {
      this.setState((prevState) => ({
        indexQuestion: prevState.indexQuestion + 1,
        showNextQuestion: false,
        changeClass: false,
        restartTime: false,
      }));
      this.attQuestions();
    } else {
      this.setState({
        redirect: true,
      });
    }
  }

  updateState(objQuestions) {
    const { correct, allAnswers, category, question, difficulty } = objQuestions;
    this.setState({
      correct,
      allAnswers,
      category,
      question,
      difficulty,
    });
  }

  attQuestions() {
    const { indexQuestion } = this.state;
    const { questions } = this.props;
    const { results } = questions;
    const { difficulty } = results[indexQuestion];
    const { category } = results[indexQuestion];
    const { question } = results[indexQuestion];
    const correctAnswer = results[indexQuestion].correct_answer;
    const incorrectAnswer = results[indexQuestion].incorrect_answers
      .map((answer) => answer);
    const concatAllAnswers = [...incorrectAnswer, correctAnswer];
    const mixTheAnswers = concatAllAnswers
      .map((asnwer) => ({ sort: Math.random(), value: asnwer }))
      .sort((a, b) => a.sort - b.sort)
      .map((answer) => answer.value);
    const objQuestions = {
      correct: correctAnswer,
      allAnswers: mixTheAnswers,
      category,
      question,
      difficulty,
    };
    this.updateState(objQuestions);
  }

  difficultScore(difficulty) {
    const three = 3;
    switch (difficulty) {
    case 'easy':
      return 1;
    case 'medium':
      return 2;
    default:
      return three;
    }
  }

  addScore() {
    const getLocalStorage = JSON.parse(localStorage.getItem('state'));
    const { timer, difficulty, player } = this.state;
    const correctAnswer = 10;
    const difficultyScore = this.difficultScore(difficulty);

    const calculateScore = (
      correctAnswer + (timer * difficultyScore) + getLocalStorage.score
    );

    const { userName, userEmail } = this.props;
    this.setState(({ player: { score, assertions } }) => ({
      player: {
        name: userName,
        assertions: assertions + 1,
        score: score + calculateScore,
        gravatarEmail: userEmail,
      },
    }));

    localStorage.setItem('state', JSON.stringify({ player }));
  }

  changeClassAnswer() {
    this.setState({
      changeClass: true,
    });
    this.submitAnswer();
  }

  changeClassCorrectAnswer() {
    this.setState({
      changeClass: true,
      restartTime: true,
    });

    this.addScore();
    this.submitAnswer();
  }

  submitAnswer() {
    this.setState({
      showNextQuestion: true,
      restartTime: true,
    });
  }

  render() {
    const { correct, allAnswers, timer, category,
      question, changeClass, showNextQuestion, redirect, restartTime } = this.state;
    const { btnState } = this.props;
    if (redirect) { return <Redirect to="/feedback" />; }
    return (
      <section>
        <Header />

        <div>
          <h3 data-testid="question-category">{category}</h3>
          <p data-testid="question-text">{question}</p>
        </div>

        {allAnswers.map((answer, index) => {
          if (answer === correct) {
            return (
              <button
                key={ Math.random() }
                type="button"
                data-testid="correct-answer"
                onClick={ this.changeClassCorrectAnswer }
                disabled={ btnState }
                className={ (changeClass) ? 'correct' : null }
              >
                {answer}
              </button>);
          }
          return (
            <button
              key={ Math.random() }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              disabled={ btnState }
              className={ (changeClass) ? 'incorrect' : null }
              onClick={ this.changeClassAnswer }
            >
              {answer}
            </button>
          );
        })}
        { showNextQuestion
          && <NextQuestionButton setIndexQuestion={ this.setIndexQuestion } /> }
        <Timer restartTime={ restartTime } timer={ timer } />
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch((getQuestionsApiAction(token))),
});

const mapStateToProps = (state) => ({
  userName: state.loginReducer.userName,
  userEmail: state.loginReducer.userEmail,
  questions: state.questionsReducer.questions,
  btnState: state.btnState.btnState,
});

ScreenGame.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.shape().isRequired,
  btnState: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenGame);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getQuestionsApiAction from '../redux/Actions/getRequestQuestionsApiAction';
import Header from '../components/Header';

class ScreenGame extends React.Component {
  constructor(props) {
    super(props);
    const { userName, userEmail } = props;

    this.addScore = this.addScore.bind(this);
    this.difficultScore = this.difficultScore.bind(this);

    this.state = {
      correct: '',
      allAnswers: [],
      timer: 30,
      difficulty: '',
      player: {
        name: userName,
        assertions: 0,
        score: 0,
        gravatarEmail: userEmail,
      },
    };
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    const token = localStorage.getItem('token');
    getQuestions(token);

    const { player } = this.state;
    localStorage.setItem('state', JSON.stringify(player));
  }

  componentDidUpdate(props) {
    const { questions } = this.props;
    const { results } = questions;
    if (props !== this.props) {
      const { difficulty } = results[0];
      const correctAnswer = results[0].correct_answer;
      const incorrectAnswer = results[0].incorrect_answers.map((answer) => answer);
      const array = [...incorrectAnswer, correctAnswer];

      const newArray = array
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
      this.updateState(correctAnswer, newArray, difficulty);
    }
  }

  updateState(correctAnswer, array, difficulty) {
    this.setState({
      correct: correctAnswer,
      allAnswers: array,
      difficulty,
    });
  }

  randomArray() {
    const random = [];
    const { questions } = this.props;
    const { results } = questions;
    if (results) {
      const index = Math.floor(Math.random() * results.length);
      random.push(results[index]);
      results.splice(index, 1);
    }
    return random;
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
    }), () => console.log(player));

    localStorage.setItem('state', JSON.stringify(player));
  }

  render() {
    const { correct, allAnswers } = this.state;
    const results = this.randomArray();
    return (
      <section>
        <Header />
        {
          results && (
            results.map(({
              category,
              question,
            }) => (
              <div key={ Math.random() }>
                <h3 data-testid="question-category">{category}</h3>
                <p data-testid="question-text">{question}</p>
              </div>
            )))
        }
        {allAnswers.map((answer, index) => {
          if (answer === correct) {
            return (
              <button
                key={ Math.random() }
                type="button"
                data-testid="correct-answer"
                onClick={ this.addScore }
              >
                {answer}
              </button>);
          }
          return (
            <button
              key={ Math.random() }
              type="button"
              data-testid={ `wrong-answer-${index}` }
            >
              {answer}
            </button>
          );
        })}
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
});

ScreenGame.propTypes = {
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.shape().isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ScreenGame);

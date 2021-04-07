import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getQuestionsApiAction from '../redux/Actions/getRequestQuestionsApiAction';
import Header from '../components/Header';

class ScreenGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: '',
      allAnswers: [],
    };
  }

  componentDidMount() {
    const { getQuestions } = this.props;
    getQuestions('00f98abdead84f858aad0bf0c4b531c2eb3b6b8d1ce49249f25398e5f2d08b9b');
    // Depois getQuestions irá receber o token do jogador
  }

  componentDidUpdate(props) {
    const { questions } = this.props;
    const { results } = questions;
    if (props !== this.props) {
      const correctAnswer = results[0].correct_answer;
      const incorrectAnswer = results[0].incorrect_answers.map((answer) => answer);
      const array = [...incorrectAnswer, correctAnswer];

      const newArray = array
        .map((question) => ({ sort: Math.random(), value: question }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
      this.updateState(correctAnswer, newArray);
    }
  }

  updateState(correctAnswer, array) {
    this.setState({
      correct: correctAnswer,
      allAnswers: array,
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
  questions: state.questionsReducer.questions,
});

ScreenGame.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.shape().isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ScreenGame);

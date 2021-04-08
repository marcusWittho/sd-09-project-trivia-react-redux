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
    const token = localStorage.getItem('token');
    getQuestions(token);
  }

  componentDidUpdate(props) {
    const { questions } = this.props;
    const { results } = questions;
    if (props !== this.props) {
      const correctAnswer = results[0].correct_answer;
      const incorrectAnswer = results[0].incorrect_answers.map((answer) => answer);
      const array = [...incorrectAnswer, correctAnswer];

      const newArray = array
        .map((a) => ({ sort: Math.random(), value: a }))
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
                style={ { border: '3px solid rgb(6, 240, 15)' } }
              >
                {answer}
              </button>);
          }
          return (
            <button
              key={ Math.random() }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              style={ { border: '3px solid rgb(255, 0, 0)' } }
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

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getQuestionsApiAction from '../redux/Actions/getRequestQuestionsApiAction';
import Header from '../components/Header';
import Timer from '../components/Timer';

class ScreenGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correct: '',
      allAnswers: [],
      category: '',
      question: '',
      timer: 30,
    };
    this.updateState = this.updateState.bind(this);
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
      const { category } = results[0];
      const { question } = results[0];
      const correctAnswer = results[0].correct_answer;
      const incorrectAnswer = results[0].incorrect_answers.map((answer) => answer);
      const array = [...incorrectAnswer, correctAnswer];

      const newArray = array
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
      this.updateState(correctAnswer, newArray, category, question);
    }
  }

  updateState(correctAnswer, answersAsrray, filteredCategory, filteredQuestion) {
    this.setState({
      correct: correctAnswer,
      allAnswers: answersAsrray,
      category: filteredCategory,
      question: filteredQuestion,
    });
  }

  render() {
    const { correct, allAnswers, timer, category, question } = this.state;
    const { btnState } = this.props;
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
                disabled={ btnState }
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
              disabled={ btnState }
              style={ { border: '3px solid rgb(255, 0, 0)' } }
            >
              {answer}
            </button>
          );
        })}
        <Timer timer={ timer } />
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch((getQuestionsApiAction(token))),
});

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
  btnState: state.btnState.btnState,
});

ScreenGame.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  questions: PropTypes.shape().isRequired,
  btnState: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScreenGame);

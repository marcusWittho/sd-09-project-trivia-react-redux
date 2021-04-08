import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getQuestions } from '../redux/action';

class GameScreen extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      numberOFQuestion: 0,
      loading: true,
      timer: 30,
      disabled: false,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.loadingQuestions = this.loadingQuestions.bind(this);
    this.decreaseTime = this.decreaseTime.bind(this);
  }

  componentDidMount() {
    this.loadingQuestions();
  }

  decreaseTime() {
    const counter = 1000;
    setInterval(() => {
      const { timer } = this.state;
      this.setState({
        timer: timer - 1,
      });
      if (timer === 0) {
        this.nextQuestion();
        this.setState({
          disabled: true,
        });
      }
    }, counter);
  }

  nextQuestion() {
    const { questions, numberOFQuestion } = this.state;
    const count = numberOFQuestion;

    if (numberOFQuestion < questions.length - 1) {
      this.setState({
        numberOFQuestion: count + 1,
        timer: 30,
      });
    } else {
      this.setState({
        // disabled: true,
        numberOFQuestion: count + 0,
      });
    }
  }

  async loadingQuestions() {
    this.setState(
      { loading: true },
      async () => {
        const { getQuestionsAPI } = this.props;
        const response = await getQuestionsAPI(localStorage.getItem('token'));
        this.setState({
          questions: response.questions.results,
          loading: false,
        });
      },
    );
    this.decreaseTime();
  }

  render() {
    const { questions, numberOFQuestion, loading, timer, disabled } = this.state;
    const orderQuestions = questions[numberOFQuestion];

    if (loading) return <h1>Loading...</h1>;

    return (
      <>
        <h3 data-testid="question-category">{ orderQuestions.type }</h3>
        <p data-testid="question-text">{ orderQuestions.question }</p>
        <button
          data-testid="correct-answer"
          type="button"
          disabled={ disabled }
          onClick={ () => {} }
        >
          { orderQuestions.correct_answer }
        </button>
        <div>
          {orderQuestions.incorrect_answers.map((answer, index) => (
            <button
              key={ index }
              data-testid={ `wrong-answer-${index}` }
              type="button"
              disabled={ disabled }
              onClick={ () => {} }
            >
              { answer }
            </button>
          ))}
        </div>
        <p>{ timer }</p>
        <button
          data-testid="btn-next"
          type="button"
          disabled={ disabled }
          onClick={ this.nextQuestion }
        >
          Próxima
        </button>
      </>
    );
  }
}

GameScreen.propTypes = {
  getQuestionsAPI: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getQuestionsAPI: (token) => dispatch(getQuestions(token)),
});

export default connect(null, mapDispatchToProps)(GameScreen);

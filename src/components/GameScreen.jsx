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
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.loadingQuestions = this.loadingQuestions.bind(this);
  }

  componentDidMount() {
    this.loadingQuestions();
  }

  nextQuestion() {
    const { numberOFQuestion } = this.state;
    const count = numberOFQuestion;
    this.setState({
      numberOFQuestion: count + 1,
    });
  }

  async loadingQuestions() {
    this.setState(
      { loading: true },
      async () => {
        const { getQuestionsAPI } = this.props;
        const test = await getQuestionsAPI(localStorage.getItem('token'));
        this.setState({
          questions: test.questions.results,
          loading: false,
        });
      },
    );
  }

  render() {
    const { questions, numberOFQuestion, loading } = this.state;
    const orderQuestions = questions[numberOFQuestion];

    if (loading) return <h1>Loading</h1>;

    return (
      <>
        <h3 data-testid="question-category">{ orderQuestions.type }</h3>
        <p data-testid="question-text">{ orderQuestions.question }</p>
        <button
          data-testid="correct-answer"
          type="button"
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
              onClick={ () => {} }
            >
              { answer }
            </button>
          ))}
        </div>
        <button
          data-testid="btn-next"
          type="button"
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

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncAsks } from '../actions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerIndex: 0,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentDidMount() {
    const { getAsks, token } = this.props;
    getAsks(token);
  }

  formatAnswers(obj) {
    return [
      { correct: true, value: obj.correct_answer },
      ...obj.incorrect_answers
        .map((item, index) => ({ correct: false, index, value: item })),
    ];
  }

  shuffleAnswers(array) {
    const HALF = 0.5;
    array.sort(() => HALF - Math.random());
  }

  nextQuestion() {
    const { answerIndex } = this.state;
    this.setState({ answerIndex: answerIndex + 1 });
  }

  elementAnswer(answer, testid, index) {
    return (
      <button
        key={ index }
        type="button"
        data-testid={ testid }
        onClick={ this.nextQuestion }
      >
        { answer }
      </button>
    );
  }

  render() {
    const { answerIndex } = this.state;
    const { asks } = this.props;
    if (!asks.length) return <p>Carregando...</p>;
    const { category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: wrongAnswers } = asks[answerIndex];
    const allAnswers = [correctAnswer, ...wrongAnswers];
    const array = [];
    allAnswers.map(
      (answer, index) => (answer === correctAnswer
        ? array.push(this.elementAnswer(answer, 'correct-answer', index))
        : array.push(this.elementAnswer(answer, `wrong-answer-${index - 1}`, index))),
    );
    return (
      <div className="ask-container">
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <p>
          { this.shuffleAnswers(array) }
          { array.map(((element, index) => (
            <div key={ index }>
              { element }
            </div>
          )))}
        </p>
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  asks: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAsks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  asks: state.askAndAnswersReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getAsks: (token) => dispatch(asyncAsks(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncAsks } from '../actions';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerIndex: 0,
      answerSelected: false,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.styleAnswer = this.styleAnswer.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
  }

  componentDidMount() {
    const { getAsks, token } = this.props;
    getAsks(token);
  }

  styleAnswer(answer, correctAnswer) {
    const { answerSelected } = this.state;
    if (answerSelected) {
      if (answer === correctAnswer) {
        return { border: '3px solid rgb(6, 240, 15)' };
      }
      if (answer !== correctAnswer) {
        return { border: '3px solid rgb(255, 0, 0)' };
      }
    }
    return { border: null };
  }

  answerSelected() {
    this.setState({ answerSelected: true });
  }

  shuffleAnswers(array) {
    const HALF = 0.5;
    array.sort(() => HALF - Math.random());
  }

  nextQuestion() {
    const { answerIndex } = this.state;
    this.setState({
      answerIndex: answerIndex + 1,
      answerSelected: false,
    });
  }

  elementAnswer(answer, testid, index, correctAnswer) {
    return (
      <button
        key={ index }
        type="button"
        data-testid={ testid }
        style={ this.styleAnswer(answer, correctAnswer) }
        onClick={ this.answerSelected }
      >
        { answer }
      </button>
    );
  }

  render() {
    const MAX_QUESTIONS = 4;
    const { answerIndex, answerSelected } = this.state;
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
        ? array.push(this.elementAnswer(answer, 'correct-answer', index, correctAnswer))
        : array.push(this
          .elementAnswer(answer, `wrong-answer-${index - 1}`, index, correctAnswer))),
    );
    return (
      <div className="ask-container">
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <p>
          { !answerSelected && this.shuffleAnswers(array) }
          { array.map(((element, index) => (
            <div key={ index }>
              { element }
            </div>
          )))}
        </p>
        {(answerSelected && answerIndex < MAX_QUESTIONS)
        && <button type="button" onClick={ this.nextQuestion }>Próxima</button>}

        {(answerSelected && answerIndex === MAX_QUESTIONS)
        && <Link to="/">Finalizar</Link>}
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

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerIndex: 0,
      color: false,
      time: 7,
      disabled: false,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.renderQuestionsAndCategories = this.renderQuestionsAndCategories.bind(this);
    this.changeColorAnswer = this.changeColorAnswer.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.timeOut = this.timeOut.bind(this);
  }

  componentDidMount() {
    const { time } = this.state;
    this.myInterval = setInterval(() => {
      if (time > 0) {
        this.setState((state) => ({
          time: state.time - 1,
        }));
      }
    }, Number('1000'));
  }

  componentDidUpdate() {
    const { time, disabled } = this.state;
    if (time < 1) {
      clearInterval(this.myInterval);
      this.timeOut(disabled);
    }
  }

  timeOut(disabled) {
    if (!disabled) {
      this.setState({ disabled: true });
    }
  }

  saveScore(score = 0) {
    const previousState = JSON.parse(localStorage.getItem('state'));
    const { player } = previousState;
    const playerScore = player.score;
    const playerAssertions = player.assertions;
    const state = { ...previousState,
      player: {
        ...player,
        score: playerScore + score,
        assertions: playerAssertions + 1,
      } };
    localStorage.setItem('state', JSON.stringify(state));
  }

  increaseScore(difficulty = 'easy', time) {
    switch (difficulty) {
    case 'medium':
      return time * 2;
    case 'hard':
      return time * Number('3');
    default:
      return time * 1;
    }
  }

  nextQuestion(event) {
    const maxIndex = 4;
    const { answerIndex } = this.state;
    if (answerIndex === maxIndex) {
      event.target.classList.add('btn-next');
    } else {
      this.setState({
        answerIndex: answerIndex + 1,
        color: false,
        time: 7,
        disabled: false,
      }, () => this.componentDidMount());
    }
  }

  nextButton(color, answerIndex, disabled) {
    const nextButton = (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ this.nextQuestion }
      >
        Proxima
      </button>
    );
    const finishButton = (
      <Link to="/feedback">
        <button
          data-testid="btn-next"
          type="button"
        >
          Finalizar
        </button>
      </Link>
    );
    if (answerIndex === Number('4') && color) return finishButton;
    if (color || disabled) return nextButton;
  }

  changeColorAnswer() {
    this.setState({
      color: true,
    }, () => clearInterval(this.myInterval));
  }

  renderQuestionsAndCategories(answerIndex, questions) {
    const courretAsk = questions.results[answerIndex];
    return (
      <section>
        <h1 data-testid="question-category">
          { courretAsk.category }
        </h1>
        <p data-testid="question-text">{ courretAsk.question }</p>
      </section>);
  }

  renderAnswers(answerIndex, questions, color, disabled) {
    const { time } = this.state;
    const courrentQuestion = questions.results[answerIndex];
    const multipleAnswers = [
      ...courrentQuestion.incorrect_answers,
      courrentQuestion.correct_answer,
    ];
    const { type } = questions.results[answerIndex];
    const { difficulty } = questions.results[answerIndex];
    const { correct_answer: correctAnswer } = questions.results[answerIndex];
    const answer = type === 'multiple' ? multipleAnswers : ['True', 'False'];
    return (
      <section>
        {answer.map((selected, index) => (
          <button
            disabled={ disabled }
            onClick={ (event) => {
              if (event.target.innerText === correctAnswer) {
                this.saveScore(this.increaseScore(difficulty, time));
              }
              this.changeColorAnswer();
            } }
            id="tof-button"
            key={ index }
            type="button"
            data-testid={ `${selected === courrentQuestion.correct_answer
              ? 'correct-answer' : `wrong-answer-${index}`}` }
            className={ `${color ? `${selected === courrentQuestion.correct_answer
              ? 'correct' : 'wrong'}` : 'no-color'}` }
          >
            {selected}
          </button>
        ))}
      </section>
    );
  }

  render() {
    const { loading, questions } = this.props;
    const { color, answerIndex, time, disabled } = this.state;
    if (loading) return <h1>Carregando...</h1>;
    return (
      <div>
        {this.renderQuestionsAndCategories(answerIndex, questions)}
        {this.renderAnswers(answerIndex, questions, color, disabled, time)}
        {this.nextButton(color, answerIndex, disabled)}
        { time < 1
          ? <h4>Acabou o Tempo</h4>
          : (
            <h4>
              Tempo:
              {` ${time}`}
            </h4>
          )}
      </div>
    );
  }
}

Answers.propTypes = {
  propQuestions: PropTypes.func,
}.isRequired;

const mapStateToProps = ({ actionsReducer: { questions, loading } }) => ({
  questions,
  loading,
});

export default connect(mapStateToProps)(Answers);

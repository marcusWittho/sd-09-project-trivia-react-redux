import React from 'react';
import { string, objectOf } from 'prop-types';
import { connect } from 'react-redux';
import { handleAssertions } from '../redux/actions';
import './css/question.css';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.btnStyle = this.btnStyle.bind(this);
    this.clearStyle = this.clearStyle.bind(this);
    this.createHeader = this.createHeader.bind(this);
    this.handleIndex = this.handleIndex.bind(this);
    this.inQuestion = this.inQuestion.bind(this);
    this.multiQuestion = this.multiQuestion.bind(this);
    this.verifyAnswers = this.verifyAnswers.bind(this);

    this.state = {
      indexQuestion: 0,
      numQuestion: 4,
    };
  }

  createHeader() {
    const { playerState: { name, score, gravatarEmail } } = this.props;
    return (
      <header className="header">
        <img
          src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
          alt="imagem do Gravatar"
          data-testid="header-profile-picture"
        />
        <h4 data-testid="header-player-name">{ name }</h4>
        <h4 data-testid="header-score">{ score }</h4>
      </header>
    );
  }

  verifyAnswers(value, correct) {
    const { propHandleAssertions } = this.props;
    this.btnStyle();
    if (value === correct) {
      propHandleAssertions(1);
    }
  }

  handleIndex() {
    const { indexQuestion, numQuestion } = this.state;
    this.clearStyle();
    if (indexQuestion < numQuestion) {
      this.setState((prev) => ({ indexQuestion: prev.indexQuestion + 1 }));
    }
  }

  multiQuestion({ correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers, category, question }) {
    const options = [...incorrectAnswers, correctAnswer];
    const random = 0.5;
    const { handleIndex, verifyAnswers } = this;
    return (
      <div className="mult-answer">
        <div className="mult-container">
          <section className="mult-question">
            <h3 data-testid="question-category">{ category }</h3>
            <p data-testid="question-text">{ question }</p>
          </section>
          <aside className="mult-aside">
            { [...options].sort(() => random - Math.random()).map((btn, index) => (
              <button
                type="button"
                className={ btn === correctAnswer ? 'btnCorrect' : 'btnIncorrect' }
                key={ index }
                onClick={ () => verifyAnswers(btn, correctAnswer) }
                data-testid={ btn === correctAnswer
                  ? 'correct-answer'
                  : `wrong-answer-${options.indexOf(btn)}` }
              >
                { btn }
              </button>
            )) }
          </aside>
        </div>
        <button type="button" onClick={ handleIndex }>PRÓXIMO</button>
      </div>
    );
  }

  inQuestion() {
    const { dataAnswer } = this.props;
    const { multiQuestion } = this;
    const { indexQuestion } = this.state;
    console.log(dataAnswer[indexQuestion]);
    if (dataAnswer[indexQuestion].type === 'boolean') {
      const {
        category, question, correct_answer: correctAnswer,
      } = dataAnswer[indexQuestion];
      return (
        <div className="boll-answer">
          <section className="bool-question">
            <h3 data-testid="question-category">{ category }</h3>
            <p data-testid="question-text">{ question }</p>
          </section>
          <aside className="bool-aside">
            <button
              type="button"
              data-testid={ correctAnswer ? 'correct-answer' : 'wrong-answer-0' }
              className={ correctAnswer ? 'btnCorrect' : 'btnIncorrect' }
              onClick={ () => this.verifyAnswers('True', correctAnswer) }
            >
              Verdadeiro
            </button>
            <button
              type="button"
              data-testid={ !correctAnswer ? 'correct-answer' : 'wrong-answer-0' }
              className={ !correctAnswer ? 'btnCorrect' : 'btnIncorrect' }
              onClick={ () => this.verifyAnswers('False', correctAnswer) }
            >
              Falso
            </button>
          </aside>
          <button type="button" onClick={ this.handleIndex }>PRÓXIMO</button>
        </div>
      );
    }
    return multiQuestion(dataAnswer[indexQuestion], indexQuestion);
  }

  clearStyle() {
    const correctBtn = document.querySelectorAll('.btnCorrect');
    const incorrectBtn = document.querySelectorAll('.btnIncorrect');
    correctBtn.forEach((btn) => {
      btn.style.border = '';
    });
    incorrectBtn.forEach((btn) => {
      btn.style.border = '';
    });
  }

  btnStyle() {
    // const { indexQuestion } = this.state;
    const correctBtn = document.querySelectorAll('.btnCorrect');
    // correctBtn.style.border = '3px solid rgb(6, 240, 15)';
    correctBtn.forEach((btn) => {
      btn.style.border = '3px solid rgb(6, 240, 15)';
    });
    const incorrectBtn = document.querySelectorAll('.btnIncorrect');
    // incorrectBtn.style.border = '3px solid rgb(255, 0, 0)';
    incorrectBtn.forEach((btn) => {
      btn.style.border = '3px solid rgb(255, 0, 0)';
    });
  }

  render() {
    const { dataAnswer } = this.props;
    return (
      <div className="question">
        { this.createHeader() }
        <h1>Trivia Game</h1>
        { dataAnswer ? this.inQuestion() : 'Carregando' }
      </div>
    );
  }
}

const mapStateToProps = ((state) => ({
  dataAnswer: state.dataGame.data.results,
  playerState: state.player,
}));

const mapDispatchToProps = (dispatch) => ({
  propHandleAssertions: (assertions) => dispatch(handleAssertions(assertions)),
});

Question.propTypes = {
  dataAnswer: string,
  playerState: objectOf({
    name: string,
    gravatarEmail: string,
  }),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Question);

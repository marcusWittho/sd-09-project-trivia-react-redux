import './css/question.css';
import React from 'react';
import { connect } from 'react-redux';
import { string, objectOf } from 'prop-types';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.createHeader = this.createHeader.bind(this);
    this.inQuestion = this.inQuestion.bind(this);
    this.testId = this.testId.bind(this);
    this.multiQuestion = this.multiQuestion.bind(this);
    this.btnStyle = this.btnStyle.bind(this);
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

  testId(element, index) {
    return ((element)
      ? 'data-testid="correct_answer"'
      : `data-testid=wrong-answer-${index}`
    );
  }

  multiQuestion({ correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers, category, question }, index) {
    const options = [...incorrectAnswers, correctAnswer];
    const random = 0.5;
    console.log(correctAnswer);
    return (
      <div key={ index } className="mult-answer">
        <div className="mult-container">
          <section className="mult-question">
            <h3 data-testid="question-category">{ category }</h3>
            <p data-testid="question-text">{ question }</p>
          </section>
          <aside className="mult-aside">
            { [...options].sort(() => random - Math.random()).map((btn) => (
              <button
                type="button"
                onClick={ () => this.btnStyle() }
                className={ btn === correctAnswer ? 'btnCorrect' : 'btnIncorrect' }
                key={ index }
                data-testId={ btn === correctAnswer
                  ? 'correct-answer'
                  : `wrong-answer-${options.indexOf(btn)}` }
              >
                { btn }
              </button>
            )) }
          </aside>
        </div>
        <button type="button">PRÓXIMO</button>
      </div>
    );
  }

  inQuestion() {
    const { dataAnswer } = this.props;
    const { multiQuestion } = this;
    return dataAnswer.map((element, index) => {
      if (element.type === 'boolean') {
        return (
          <div key={ index } className="boll-answer">
            <section className="bool-question">
              <h3 data-testid="question-category">{ element.category }</h3>
              <p data-testid="question-text">{ element.question }</p>
            </section>
            <aside className="bool-aside">
              <button
                className={ element.correct_answer ? 'btnCorrect' : 'btnIncorrect' }
                type="button"
                onClick={ () => this.btnStyle() }
                data-testid=""
                value={ element.correct_answer }
              >
                Verdadeiro
              </button>
              <button
                className={ element.incorrect_answer ? 'btnCorrect' : 'btnIncorrect' }
                type="button"
                onClick={ () => this.btnStyle() }
                data-testid=""
                value={ element.incorrect_answers }
              >
                Falso
              </button>
            </aside>
            <button
              type="button"
              className="btn-next"
            >
              PRÓXIMO
            </button>
          </div>
        );
      }
      return multiQuestion(element, index);
    });
  }

  btnStyle() {
    const correctBtn = document.querySelectorAll('.btnCorrect');
    correctBtn.forEach((btn) => {
      btn.style.border = '3px solid rgb(6, 240, 15)';
    });
    const incorrectBtn = document.querySelectorAll('.btnIncorrect');
    incorrectBtn.forEach((btn) => {
      btn.style.border = '3px solid rgb(255, 0, 0)';
    });
  }

  render() {
    const { dataAnswer } = this.props;
    return (
      <div className="question">
        { this.createHeader() }
        <h1>Game</h1>
        { dataAnswer ? this.inQuestion() : 'Carregando' }
      </div>
    );
  }
}

const mapStateToProps = ((state) => ({
  dataAnswer: state.dataGame.data.results,
  playerState: state.player,
}));

Question.propTypes = {
  dataAnswer: string,
  playerState: objectOf({
    name: string,
    gravatarEmail: string,
  }),
}.isRequired;

export default connect(mapStateToProps)(Question);

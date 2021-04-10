import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateIndex } from '../redux/actions';
import Timer from './timer';

class MultipleAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // choice: [],
      rightAnswerClass: '',
      wrongAnswerClass: '',
      nextButton: true,
      correctAnswer: 'correct-answer',
      btnDisplayed: false,
      // tratamento pros botoes apos timer
      btnDisabled: false,
      show: true,
    };
    this.validateAnswers = this.validateAnswers.bind(this);
    // this.createChoices = this.createChoices.bind(this);
    this.updateQuestIndex = this.updateQuestIndex.bind(this);
    this.answerCheck = this.answerCheck.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.createNextBtn = this.createNextBtn.bind(this);
  }

  componentDidMount() {
    // this.createChoices();
    this.endTime();
  }

  endTime() {
    const finalTime = 30000;
    setTimeout(() => {
      this.setState({
        nextButton: false,
        btnDisplayed: true,
        btnDisabled: true,
        show: false,
      });
    }, finalTime);
  }

  updateQuestIndex() {
    const { questIndex, dispatchIndex } = this.props;
    let newIndex = questIndex;
    newIndex += 1;
    dispatchIndex(newIndex);
  }

  // createChoices() {
  //   const { question } = this.props;
  //   const choice = question.incorrect_answers;
  //   const choices = 4;
  //   if (choice.length < choices) {
  //     choice.splice(Math.floor(Math.random() * choices), 0,
  //       question.correct_answer);
  //     this.setState({ choice });
  //   } else {
  //     this.setState({ choice });
  //   }
  // }

  validateAnswers(answer, index) {
    const { question } = this.props;
    if (question.correct_answer !== answer) {
      return `wrong-answer-${index}`;
    }
    return 'correct-answer';
  }

  answerCheck() {
    this.setState({
      nextButton: false,
      rightAnswerClass: 'rightAnswer',
      wrongAnswerClass: 'wrongAnswer',
      btnDisplayed: true,
      // desabilita os botoes ao clicar na sua escolha
      btnDisabled: true,
      show: false,
    });
  }

  nextQuestion() {
    this.updateQuestIndex();
    // this.createChoices();
    this.endTime();
    this.setState({ rightAnswerClass: '',
      wrongAnswerClass: '',
      nextButton: true,
      btnDisplayed: false,
      // tratamento para o timer
      btnDisabled: false,
      show: true,
    });
  }

  createNextBtn(click, state) {
    return (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ click }
        disabled={ state }
      >
        next
      </button>
    );
  }

  renderTimer() {
    return <Timer />;
  }

  render() {
    const {
      rightAnswerClass,
      wrongAnswerClass,
      nextButton,
      correctAnswer,
      btnDisplayed,
      btnDisabled,
      show,
    } = this.state;
    const { question } = this.props;
    // precisa jogar esse choice pra dentro de uma função para deixar as questões com respostas randomicas
    const choice = [...question.incorrect_answers, question.correct_answer];
    let index = 0;
    return (
      <>
        <div>
          <h3 data-testid="question-category">
            { question.category }
          </h3>
          <p data-testid="question-text">{ question.question }</p>
          {choice.map((answer) => {
            const dataTestId = this.validateAnswers(answer, index);
            if (dataTestId !== correctAnswer) index += 1;
            return (
              <button
                className={ dataTestId === correctAnswer ? rightAnswerClass
                  : wrongAnswerClass }
                type="button"
                key={ answer }
                disabled={ btnDisabled }
                data-testid={ dataTestId }
                onClick={ this.answerCheck }
              >
                { answer }
              </button>);
          })}
          { btnDisplayed ? this.createNextBtn(this.nextQuestion, nextButton)
            : null}
        </div>
        <div>
          Timer:
          { show ? this.renderTimer() : null }
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ game }) => ({
  questIndex: game.index,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchIndex: (index) => dispatch(updateIndex(index)),
});

MultipleAnswers.propTypes = {
  questIndex: PropTypes.number.isRequired,
  dispatchIndex: PropTypes.func.isRequired,
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipleAnswers);

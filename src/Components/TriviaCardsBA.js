import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { rightAnswers, updateIndex, wrongAnswers, playerScore } from '../redux/actions';
import Timer from './timer';
import CORRECT from './correct';

class BooleanAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // choice: [],
      rightAnswerClass: '',
      wrongAnswerClass: '',
      nextButton: true,
      correctAnswer: CORRECT,
      btnDisplayed: false,
      // tratamento pros botoes apos timer
      btnDisabled: false,
      show: true,
    };
    this.validateAnswers = this.validateAnswers.bind(this);
    this.updateQuestIndex = this.updateQuestIndex.bind(this);
    this.answerCheck = this.answerCheck.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.createNextBtn = this.createNextBtn.bind(this);
    this.endTime = this.endTime.bind(this);
  }

  componentDidUpdate() {
    // this.updateQuestIndex();
    this.endTime();
  }

  // por algum motivo no componente boleano nao funciona
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

  validateAnswers(option, index) {
    const { question } = this.props;
    if (question.correct_answer !== option) {
      return `wrong-answer-${index}`;
    }
    return CORRECT;
  }

  answerCheck(e) {
    const { dispatchCorrect, dispatchWrong, question, counter, dispatchScore } = this.props;
    const { target } = e;
    const answer = target.innerText;
    const correct = 10;
    const types = { easy: 1, medium: 2, hard: 3 };
    this.setState({
      nextButton: false,
      rightAnswerClass: 'rightAnswer',
      wrongAnswerClass: 'wrongAnswer',
      btnDisplayed: true,
      btnDisabled: true,
      show: false,
    });
    if (this.validateAnswers(answer) === CORRECT) {
      dispatchCorrect(1);
      switch (question.difficulty) {
      case 'hard':
        return (dispatchScore(correct + (counter * types.hard)));
      case 'medium':
        return (dispatchScore(correct + (counter * types.medium)));
      default:
        return (dispatchScore(correct + (counter * types.easy)));
      }
    } else { dispatchWrong(1); }
  }

  nextQuestion() {
    this.updateQuestIndex();
    // this.createChoices();
    this.endTime();
    this.setState({ rightAnswerClass: '',
      wrongAnswerClass: '',
      nextButton: true,
      btnDisplayed: false,
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
      btnDisplayed,
      rightAnswerClass,
      wrongAnswerClass,
      nextButton,
      correctAnswer,
      btnDisabled,
      show,
    } = this.state;
    const { question } = this.props;
    const answers = ['True', 'False'];
    const index = 0;
    return (
      <>
        <div>
          <div>
            <h3 data-testid="question-category">
              { question.category }
            </h3>
            <p data-testid="question-text">{ question.question }</p>
          </div>
          { answers.map((option) => {
            const dataTestId = this.validateAnswers(option, index);
            return (
              <button
                className={ dataTestId === correctAnswer ? rightAnswerClass
                  : wrongAnswerClass }
                type="button"
                key={ option }
                disabled={ btnDisabled }
                data-testid={ dataTestId }
                onClick={ this.answerCheck }
              >
                { option }
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

const mapStateToProps = ({ game, player }) => ({
  questIndex: game.index,
  counter: player.counter,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchIndex: (index) => dispatch(updateIndex(index)),
  dispatchCorrect: (num) => dispatch(rightAnswers(num)),
  dispatchWrong: (num) => dispatch(wrongAnswers(num)),
  dispatchScore: (score) => dispatch(playerScore(score)),
});

BooleanAnswers.propTypes = {
  questIndex: PropTypes.number.isRequired,
  dispatchIndex: PropTypes.func.isRequired,
  dispatchCorrect: PropTypes.func.isRequired,
  dispatchWrong: PropTypes.func.isRequired,
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooleanAnswers);

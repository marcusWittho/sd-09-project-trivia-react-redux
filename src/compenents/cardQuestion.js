import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import OptionsButtons from './RenderOptionsButtons';
import '../CSS-Components/Choices.css';
import { userScore, userAssertion } from '../redux/actions/index';
import Header from './Header';

class CardQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderQuest: 0,
      hidden: true,
      feedBack: false,
      timer: 30,
      disableOptions: false,
      countTime: true,
      score: 0,
      difficulty: '',
      answer: false,
      assertions: 0,
    };
    this.paintingButton = this.paintingButton.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  paintingButton({ target } = 'timeOut') {
    const buttons = document.querySelectorAll('#choiceButton');
    const teste = target;
    console.log(teste);
    const updateAnswer = (target === undefined) ? false : target.className;
    const { questions } = this.props;
    const { orderQuest } = this.state;
    this.setState({
      hidden: false,
      countTime: false,
      difficulty: questions[orderQuest].difficulty,
      answer: (updateAnswer === 'correct-answer'),
    });
    buttons.forEach((button) => {
      if (button.className === 'correct-answer') {
        button.classList.add('correct-answers');
      } else {
        button.classList.add('wrong-answers');
      }
    });
  }

  nextQuestion() {
    const { orderQuest, score, assertions } = this.state;
    const { questions, newScore, updateAssertions } = this.props;
    const buttons = document.querySelectorAll('#choiceButton');
    const magicNumber = 4;
    if (orderQuest < magicNumber) {
      this.setState({
        orderQuest: orderQuest + 1,
        hidden: true,
        timer: 30,
        disableOptions: false,
        countTime: true,
        difficulty: questions[orderQuest + 1].difficulty,
        answer: false,
      });
      this.updateScore();
    } else {
      newScore(score);
      updateAssertions(assertions);
      this.setState({
        feedBack: true,
      });
    }
    buttons.forEach((button) => {
      if (button.className === 'correct-answer correct-answers') {
        button.classList.remove('correct-answers');
      } else {
        button.classList.remove('wrong-answers');
      }
    });
  }

  updateTimer() {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState({
        timer: timer - 1,
      });
    } else {
      this.setState({
        timer: 0,
        hidden: false,
        disableOptions: true,
        countTime: false,
      });
      this.paintingButton();
    }
  }

  updateScore() {
    const { timer, score, difficulty, answer, assertions } = this.state;
    const difficulties = [1, 2, '3'];

    let newScore = score;
    const magicNumber = 10;

    const storage = JSON.parse(localStorage.getItem('state'));

    if (answer === true) {
      if (difficulty === 'easy') {
        newScore += (magicNumber + (timer * difficulties[0]));
      } else if (difficulty === 'medium') {
        newScore += (magicNumber + (timer * difficulties[1]));
      } else {
        newScore += (magicNumber + (timer * Number(difficulties[2])));
      }
    }

    this.setState({
      score: score + newScore,
      assertions: ((answer === true) ? assertions + 1 : assertions),
    });

    storage.player.score = newScore;
    storage.player.assertions = assertions;
    localStorage.setItem('state', JSON.stringify(storage));
  }

  render() {
    const { questions, email, name } = this.props;
    const {
      orderQuest, hidden, feedBack,
      timer, countTime, disableOptions,
      score } = this.state;

    const {
      category,
      question,
      difficulty,
      options,
    } = questions[orderQuest];

    const updateTime = 1000;

    if (countTime === true) {
      setTimeout(() => {
        this.updateTimer();
      }, updateTime);
    }

    return (
      <div>
        <Header email={ email } name={ name } score={ score } />
        <h2 data-testid="question-category">{ category }</h2>
        <h3 data-testid="question-text">{ question }</h3>
        <h4 data-testid="question-text">{ difficulty }</h4>

        <OptionsButtons
          options={ options }
          painting={ this.paintingButton }
          disableOptions={ disableOptions }
        />

        <button
          data-testid="btn-next"
          type="button"
          onClick={ this.nextQuestion }
          hidden={ hidden }
        >
          Próxima
        </button>
        <p>Cronômetro</p>
        <span>{ timer }</span>
        { feedBack ? <Redirect to="/result" /> : '' }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
  name: state.userRegisterReducer.user,
  email: state.userRegisterReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  newScore: (score) => dispatch(userScore(score)),
  updateAssertions: (assertion) => dispatch(userAssertion(assertion)),
});

CardQuestion.propTypes = {
  questions: PropTypes.arrayOf(Object).isRequired,
  newScore: PropTypes.func.isRequired,
  updateAssertions: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardQuestion);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { timeStarter } from '../redux/actions';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      allowNextButton: 'none',
      time: 30,
    };

    this.createAnswers = this.createAnswers.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  changeAnswerColor() {
    const answers = document.querySelectorAll('#answer');
    answers.forEach((answer) => {
      answer.style.border = '3px solid rgb(255, 0, 0)';
      if (answer.attributes[2].value === 'correct-answer') {
        answer.style.border = '3px solid rgb(6, 240, 15)';
      }
    });
  }

  handleClick() {
    this.changeAnswerColor();
    this.setState({ allowNextButton: 'block' });
  }

  createAnswers() {
    const { questionNumber } = this.state;
    const { questions, timeOver } = this.props;
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[questionNumber];

    const arrayOfElements = incorrectAnswers.map((answer, index) => (
      <button
        id="answer"
        type="button"
        key={ answer }
        data-testid={ `wrong-answer-${index}` }
        onClick={ this.handleClick }
        disabled={ timeOver }
      >
        {answer}
      </button>
    ));
    arrayOfElements.push(
      <button
        id="answer"
        type="button"
        key={ correctAnswer }
        data-testid="correct-answer"
        onClick={ this.handleClick }
        disabled={ timeOver }
      >
        {correctAnswer}
      </button>,
    );
    arrayOfElements.sort();
    return arrayOfElements;
  }

  handleNext(index) {
    const { restartTime } = this.props;
    this.setState({
      questionNumber: index + 1,
      allowNextButton: 'none',
      time: 30,
    });
    restartTime();
  }

  countDown() {
    this.setState((state) => ({
      time: state.time - 1,
    }));
  }

  render() {
    const { questionNumber, allowNextButton, time } = this.state;
    const { questions, isFetching } = this.props;
    const totalIndex = 5;
    if (isFetching) return <div>Loading</div>;

    return (
      <div>
        { questionNumber === totalIndex ? <Redirect to="/feedback" /> : (
          <div>
            <Header />
            <Timer
              noClick={ this.handleClick }
              time={ time }
              countDown={ this.countDown }
            />
            <h2 data-testid="question-category">
              Category:
              {questions[questionNumber].category}
            </h2>
            <h3 data-testid="question-text">
              Question:
              {questions[questionNumber].question}
            </h3>
            <p>
              answer:
              {this.createAnswers()}
            </p>
            <button
              type="button"
              data-testid="btn-next"
              onClick={ () => this.handleNext(questionNumber) }
              style={ { display: allowNextButton } }
            >
              Próxima
            </button>
            <Link to="/feedback" />
          </div>
        ) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
  isFetching: state.gameReducer.isFetching,
  timeOver: state.gameReducer.timeOver,
});

const mapDispatchToProps = (dispatch) => ({
  restartTime: () => dispatch(timeStarter()),
});

GamePage.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.string),
  isFetching: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);

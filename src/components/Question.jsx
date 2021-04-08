import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from './Timer';
import { updateScore } from '../redux/actions';
import './Question.css';

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionIndex: 0,
      clicked: false,
      timer: 30,
      stopTimer: false,
      disabledButton: false,
    };

    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.timeChange = this.timeChange.bind(this);
  }

  componentDidMount() {
    const playerInformation = localStorage.getItem('state');
    console.log(JSON.parse(playerInformation));
  }

  handleClick() {
    this.setState((state) => ({
      clicked: !state.clicked,
      stopTimer: true,
      disabledButton: true,
    }));
  }

  changeScore({ target }) {
    const { timer } = this.state;
    const { updateValue } = this.props;
    let { score } = this.props;
    const { innerText } = target;
    const question = this.renderQuestion();
    const TEN_POINTS = 10;
    const MEDIUM_MULTIPLIER = 2;
    const HARD_MULTIPLIER = 3;
    if (innerText === question.correct_answer) {
      switch (question.difficulty) {
      case 'easy':
        score = score + TEN_POINTS + timer;
        break;
      case 'medium':
        score = score + TEN_POINTS + (timer * MEDIUM_MULTIPLIER);
        break;
      case 'hard':
        score = score + TEN_POINTS + (timer * HARD_MULTIPLIER);
        break;
      default:
        break;
      }
      updateValue({ score });
    }
  }

  timeChange() {
    const { timer } = this.state;
    this.setState({
      timer: timer - 1,
    });
  }

  renderQuestion() {
    const { questions } = this.props;
    const { questionIndex } = this.state;
    return questions[questionIndex];
  }

  renderAnswers() {
    const { clicked, disabledButton } = this.state;
    const question = this.renderQuestion();
    return (
      <>
        <button
          type="button"
          data-testid="correct-answer"
          className={ (clicked) ? 'correct-answer' : '' }
          onClick={ (e) => { this.handleClick(); this.changeScore(e); } }
          disabled={ disabledButton }
        >
          {question.correct_answer}
        </button>
        {question.incorrect_answers.map((answer, index) => (
          <button
            type="button"
            data-testid={ `wrong-answer-${index}` }
            key={ index }
            className={ (clicked) ? 'incorrect-answer' : '' }
            onClick={ (e) => { this.handleClick(); this.changeScore(e); } }
            disabled={ disabledButton }
          >
            {answer}
          </button>
        ))}
      </>
    );
  }

  render() {
    const { fetching } = this.props;
    const { timer, stopTimer } = this.state;

    if (fetching) {
      return <h3>Carregando pergunta...</h3>;
    }

    return (
      <div>
        Perguntas
        <h4>Category:</h4>
        <p data-testid="question-category">{this.renderQuestion().category}</p>
        <h4>Question:</h4>
        <p data-testid="question-text">{this.renderQuestion().question}</p>
        {this.renderAnswers()}
        <Timer
          timer={ timer }
          timeChange={ this.timeChange }
          stopTimer={ stopTimer }
          handleClick={ this.handleClick }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
  fetching: state.questionsReducer.isFetching,
  score: state.scoreReducer.score,
  name: state.loginReducer.nameInput,
  email: state.loginReducer.emailInput,
});

const mapDispatchToProps = (dispatch) => ({
  updateValue: (payload) => dispatch(updateScore(payload)),
});

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetching: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
  updateValue: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);

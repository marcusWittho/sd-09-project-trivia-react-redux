import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../styles/Play.css';

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      addClass: false,
      randomized: [],
      isButtonsRandomized: false,
      timeQuestion: 30,
      isDisabled: false,
      questionLevel: '',
      nextQuestion: false,
    };
    this.handleAnswers = this.handleAnswers.bind(this);
    this.toggle = this.toggle.bind(this);
    this.questionGenerator = this.questionGenerator.bind(this);
    this.startCounterTime = this.startCounterTime.bind(this);
    this.decrementCounterTime = this.decrementCounterTime.bind(this);
    this.scoreCalculator = this.scoreCalculator.bind(this);
    this.handleClickSuccess = this.handleClickSuccess.bind(this);
    this.handleClickFailure = this.handleClickFailure.bind(this);
    this.nextQuestionButtonGenerator = this.nextQuestionButtonGenerator.bind(this);
  }

  componentDidMount() {
    this.startCounterTime();
    // this.handleAnswers();
  }

  componentDidUpdate() {
    const { isFetching } = this.props;
    const { isButtonsRandomized } = this.state;
    if (!isFetching && !isButtonsRandomized) {
      this.handleAnswers();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  decrementCounterTime() {
    const { timeQuestion } = this.state;
    if (timeQuestion === 1) {
      clearInterval(this.timerInterval);
      this.setState({
        timeQuestion: 0,
        isDisabled: true,
      });
    } else {
      this.setState((prevState) => ({
        timeQuestion: prevState.timeQuestion - 1,
      }));
    }
  }

  startCounterTime() {
    const oneSecond = 1000;
    this.timerInterval = setInterval(this.decrementCounterTime, oneSecond);
  }

  toggle() {
    const { addClass } = this.state;
    this.setState({
      addClass: !addClass,
    });
  }

  handleClickSuccess() {
    this.toggle();
    this.scoreCalculator();
    this.setState({
      nextQuestion: true,
    });
  }

  handleClickFailure() {
    this.toggle();
    this.setState({
      nextQuestion: true,
    });
  }

  nextQuestionButtonGenerator() {
    return (
      <button
        type="button"
        data-testid="btn-next"
      >
        Próxima
      </button>
    );
  }

  scoreCalculator() {
    const { timeQuestion, questionLevel } = this.state;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    const magicNumber = 10;
    const previousStorage = JSON.parse(localStorage.getItem('state'));
    const { player: { score } } = previousStorage;
    switch (questionLevel) {
    case questionLevel === 'hard':
      previousStorage.player.score = score + (magicNumber + (timeQuestion * hard));
      localStorage.setItem('state', JSON.stringify(previousStorage));
      break;
    case questionLevel === 'medium':
      previousStorage.player.score = score + (magicNumber + (timeQuestion * medium));
      localStorage.setItem('state', JSON.stringify(previousStorage));
      break;
    default:
      previousStorage.player.score = score + (magicNumber + (timeQuestion * easy));
      localStorage.setItem('state', JSON.stringify(previousStorage));
      break;
    }
  }

  questionGenerator() {
    const { randomized, addClass, isDisabled } = this.state;
    return (
      <section>
        {
          randomized.map(({ isTrue, answer }, index) => {
            if (!isTrue) {
              return (
                <button
                  key={ index }
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  className={ addClass ? 'fail' : 'riddle' }
                  onClick={ this.handleClickFailure }
                  disabled={ isDisabled }
                >
                  { answer }
                </button>
              );
            }
            return (
              <button
                type="button"
                key={ index }
                data-testid="correct-answer"
                className={ addClass ? 'success' : 'riddle' }
                onClick={ this.handleClickSuccess }
                disabled={ isDisabled }
              >
                { answer }
              </button>
            );
          })
        }
      </section>
    );
  }

  // A função do Math.random da linha 43 foi retirada do site stackoverflow no link:
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  handleAnswers() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    let currentQuestion;
    if (questions) {
      currentQuestion = questions[questionIndex];
    }
    // const currentQuestion = questions[questionIndex];
    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      difficulty,
    } = currentQuestion;
    this.setState({
      questionLevel: difficulty,
    });
    const correct = {
      isTrue: true,
      answer: correctAnswer,
    };
    const wrongAnswer = incorrectAnswers.map((answer) => ({
      isTrue: false,
      answer,
    }));
    const fakeNumber = 0.5;
    const answersButtons = [correct, ...wrongAnswer];
    const randomizedAnswers = answersButtons.sort(() => fakeNumber - Math.random());
    this.setState({
      randomized: randomizedAnswers,
      isButtonsRandomized: true,
    });
  }

  render() {
    const { questions, isFetching } = this.props;
    const { questionIndex, timeQuestion, nextQuestion } = this.state;
    if (isFetching) return <div>Loading...</div>;
    let currentQuestion;
    let category2;
    let question2;
    if (questions) {
      currentQuestion = questions[questionIndex];
    }
    if (currentQuestion) {
      category2 = currentQuestion.category;
      question2 = currentQuestion.question;
    }
    return (
      <main>
        <Header />
        <section>
          <p
            data-testid="question-category"
          >
            { category2 }
          </p>
          <p
            data-testid="question-text"
          >
            { question2 }
          </p>
        </section>
        { this.questionGenerator() }
        { nextQuestion && this.nextQuestionButtonGenerator() }
        <p>{ `Tempo: ${timeQuestion}` }</p>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.triviaReducer.questions,
  isFetching: state.triviaReducer.isFetching,
});

Play.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Play);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../common/components/Header';
import QuestionCard from '../common/components/QuestionCard';
import { questions as questionsAction, runTimer, stopTimer } from '../actions/action';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      APIquestions: [],
      currentQuestion: 0,
      applyStyle: false,
    };
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.showStyle = this.showStyle.bind(this);
    this.resetStyle = this.resetStyle.bind(this);
    this.checkFeedback = this.checkFeedback.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
    const { playerState } = this.props;
    let player = {};
    player = {
      player: playerState,
    };
    localStorage.setItem('state', JSON.stringify(player));
  }

  async fetchQuestions() {
    const { token, questions } = this.props;
    const questionsResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((result) => Promise.resolve(result));

    questions(questionsResponse.results);

    this.setState({
      APIquestions: questionsResponse.results,
    });
  }

  updateQuestion() {
    const { currentQuestion } = this.state;
    const { sendTimer, stopTimerAction } = this.props;
    const initialTimer = 30;
    this.setState({
      currentQuestion: currentQuestion + 1,
    });
    this.resetStyle();
    stopTimerAction(false);
    sendTimer(initialTimer);
    this.disableOptions(false);
  }

  showStyle() {
    return this.setState({ applyStyle: true });
  }

  resetStyle() {
    return this.setState({ applyStyle: false });
  }

  disableOptions(toggle) {
    const answerButtons = document.querySelectorAll('button');
    answerButtons.forEach((button) => {
      if (!button.id) {
        button.disabled = toggle;
      }
    });
  }

  checkFeedback() {
    const { history: { push } } = this.props;
    // const { currentQuestion } = this.state;
    // const answeredQuestions = currentQuestion;
    // const numberOfQuestions = 3;
    // if (answeredQuestions > numberOfQuestions) {
    console.log(this.props);
    push('/feedback');
    // window.location.history.push('/feedback');
    // } return 'Carregando';
  }

  render() {
    const { APIquestions, currentQuestion, applyStyle } = this.state;
    const numberOfQuestions = 3;
    return (
      <section>
        <Header />
        { APIquestions.length !== 0 ? (
          <QuestionCard
            updateQuestion={ currentQuestion > numberOfQuestions
              ? this.checkFeedback : this.updateQuestion }
            renderQuestion={ APIquestions[currentQuestion] }
            applyStyle={ applyStyle }
            showStyle={ this.showStyle }
            disableOptions={ this.disableOptions }
            questionCounter={ currentQuestion }
          />)
          : 'Carregando' }
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  questions: (e) => dispatch(questionsAction(e)),
  sendTimer: (time) => dispatch(runTimer(time)),
  stopTimerAction: (value) => dispatch(stopTimer(value)),
});

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  questions: state.addQuestions.question,
  timer: state.timer,
  playerState: state.userInfoReducer,
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  sendTimer: PropTypes.func.isRequired,
  stopTimerAction: PropTypes.func.isRequired,
  playerState: PropTypes.shape({
    player: PropTypes.string,
    assertions: PropTypes.number,
    gravatarEmail: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

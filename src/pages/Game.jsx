import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../common/components/Header';
import QuestionCard from '../common/components/QuestionCard';
import { questions as questionsAction, runTimer } from '../actions/action';

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
  }

  componentDidMount() {
    this.fetchQuestions();
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
    const { sendTimer } = this.props;
    const initialTimer = 30;
    this.setState({
      currentQuestion: currentQuestion + 1,
    });
    this.resetStyle();
    sendTimer(initialTimer);
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
      if (!button.id && toggle === true) {
        button.disabled = true;
      } else button.disabled = false;
    });
  }

  render() {
    const { APIquestions, currentQuestion, applyStyle } = this.state;
    return (
      <section>
        <Header />
        { APIquestions.length !== 0 ? (
          <QuestionCard
            updateQuestion={ this.updateQuestion }
            renderQuestion={ APIquestions[currentQuestion] }
            applyStyle={ applyStyle }
            showStyle={ this.showStyle }
            disableOptions={ this.disableOptions }
          />)
          : <h1>Carregando...</h1> }
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  questions: (e) => dispatch(questionsAction(e)),
  sendTimer: (time) => dispatch(runTimer(time)),
});

const mapStateToProps = (state) => ({
  token: state.loginReducer.token,
  questions: state.addQuestions.question,
  timer: state.timer,
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  sendTimer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

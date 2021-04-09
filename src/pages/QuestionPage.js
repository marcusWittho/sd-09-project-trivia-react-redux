import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../services/api';
import { setQuestions } from '../actions';
import { Header, QuestionMultiple, QuestionBool } from '../components';
import './QuestionPage.css';

class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.state = { index: 0,
      timeLeft: 30,
      disabledOptions: false };
  }

  componentDidMount() {
    this.fetchQuestions();
    this.setTime();
  }

  setTime() {
    let { timeLeft } = this.state;
    const interval = 1000;
    const timer = setInterval(() => {
      if (timeLeft === 1) {
        clearInterval(timer);
        this.setState({ disabledOptions: true });
      }
      timeLeft -= 1;
      this.setState({ timeLeft });
    }, interval);
  }

  nextQuestion() {
    const { index } = this.state;
    const { questions } = this.props;
    if (index < questions.length) {
      this.setState({
        index: index + 1,
      });
    }
  }

  async fetchQuestions() {
    const { updateQuestions } = this.props;
    const data = await getQuestions();
    updateQuestions(data);
  }

  createQuestion() {
    const { questions } = this.props;
    const { disabledOptions } = this.state;
    const { index } = this.state;
    if (questions.length > 0) {
      switch (questions[index].type) {
      case 'multiple':
        return (<QuestionMultiple
          disabled={ disabledOptions }
          question={ questions[index] }
          nextQuestion={ this.nextQuestion }
        />);
      case 'boolean':
        return (<QuestionBool
          disabled={ disabledOptions }
          question={ questions[index] }
          nextQuestion={ this.nextQuestion }
        />);
      default:
        break;
      }
    }
  }

  render() {
    const { timeLeft } = this.state;
    return (
      <div>
        <Header />
        { timeLeft > 0 ? <p>{`Time Left: ${timeLeft}s`}</p> : <p>Time Over!</p> }
        { this.createQuestion() }
      </div>
    );
  }
}

QuestionPage.propTypes = {
  updateQuestions: PropTypes.arrayOf(),
}.isRequired;

const mapStateToProps = ({ trivia }) => ({
  questions: trivia.questions,
});

const mapDispatchToProps = (dispatch) => ({
  updateQuestions: (questions) => dispatch(setQuestions(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);

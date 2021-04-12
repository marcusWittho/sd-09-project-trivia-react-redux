import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { arrayOf } from 'prop-types';
import { getQuestions } from '../services/api';
import { setQuestions } from '../actions';
import { Header, Question } from '../components';
import './Trivia.css';

class Trivia extends React.Component {
  constructor(props) {
    super(props);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.randomOptions = this.randomOptions.bind(this);
    this.state = { index: 0 };
  }

  componentDidMount() {
    const { category, difficulty, type } = this.props;
    this.fetchQuestions(category, difficulty, type);
  }

  nextQuestion() {
    const { index } = this.state;
    const { questions } = this.props;
    if (index < questions.length) {
      this.setState({ index: index + 1 });
    }
  }

  async fetchQuestions(category, difficulty, type) {
    const { updateQuestions } = this.props;
    const data = await getQuestions(category, difficulty, type);
    updateQuestions(data);
  }

  createQuestion() {
    const { questions } = this.props;
    if (questions.length > 0) {
      return (
        <Question
          question={ this.randomOptions() }
          nextQuestion={ this.nextQuestion }
        />);
    }
  }

  randomOptions() {
    const { questions } = this.props;
    const { index } = this.state;
    let questionArray = [{ correct: questions[index].correct_answer }];
    questions[index].incorrect_answers.forEach((incorrect) => {
      questionArray = [...questionArray, { incorrect }];
    });
    let randomAnswers = [];
    while (questionArray.length !== 0) {
      const randomIndex = Math.floor(Math.random() * questionArray.length);
      randomAnswers = [...randomAnswers, questionArray[randomIndex]];
      questionArray.splice(randomIndex, 1);
    }
    return { ...questions[index], randomAnswers };
  }

  render() {
    const { questions } = this.props;
    const { index } = this.state;
    if (questions.length > 0 && index === questions.length) {
      return <Redirect to="/feedback" />;
    }
    return (
      <div>
        <Header />
        { this.createQuestion() }
      </div>
    );
  }
}

Trivia.propTypes = { updateQuestions: arrayOf() }.isRequired;

const mapStateToProps = ({ trivia, settings }) => ({
  questions: trivia.questions,
  category: settings.category,
  difficulty: settings.difficulty,
  type: settings.type,
});

const mapDispatchToProps = (dispatch) => ({
  updateQuestions: (questions) => dispatch(setQuestions(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);

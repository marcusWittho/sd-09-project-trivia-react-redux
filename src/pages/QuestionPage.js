import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { arrayOf } from 'prop-types';
import { getQuestions } from '../services/api';
import { setQuestions } from '../actions';
import { Header, Question } from '../components';
import './QuestionPage.css';

class QuestionPage extends React.Component {
  constructor(props) {
    super(props);
    this.fetchQuestions = this.fetchQuestions.bind(this);
    this.createQuestion = this.createQuestion.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.state = { index: 0 };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  nextQuestion() {
    const { index } = this.state;
    const { questions } = this.props;
    if (index < questions.length) {
      this.setState({ index: index + 1 });
    }
  }

  async fetchQuestions() {
    const { updateQuestions } = this.props;
    const data = await getQuestions();
    updateQuestions(data);
  }

  createQuestion() {
    const { questions } = this.props;
    const { index } = this.state;
    if (questions.length > 0) {
      return (
        <Question question={ questions[index] } nextQuestion={ this.nextQuestion } />);
    }
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

QuestionPage.propTypes = { updateQuestions: arrayOf() }.isRequired;

const mapStateToProps = ({ trivia: { questions } }) => ({ questions });

const mapDispatchToProps = (dispatch) => ({
  updateQuestions: (questions) => dispatch(setQuestions(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);

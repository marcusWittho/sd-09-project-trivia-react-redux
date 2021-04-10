import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../actions';
import Header from '../components/Header';

class Gaming extends React.Component {
  constructor(props) {
    super(props);

    this.verifyAll = this.verifyAll.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);

    this.state = {
      redirect: false,
      questionNumber: 0,
      answers: [],
    };
  }

  componentDidMount() {
    this.getArrayOfQuestions();
    this.verifyAll();
  }

  async getArrayOfQuestions() {
    const { questionDispatch } = this.props;
    await questionDispatch();
    this.getAnswers();
  }

  getAnswers() {
    const { questionsState: { results } } = this.props;
    const { questionNumber } = this.state;
    if (results) {
      const {
        incorrect_answers: incorrectAnswers,
        correct_answer: correctAnswer } = results[questionNumber];
      const newArray = [{
        answer: correctAnswer,
        testid: 'correct-answer' }];
      incorrectAnswers.map((incorrect, index) => newArray.push({
        answer: incorrect,
        testid: `wrong-answer-${index}` }));
      this.setState({ answers: this.shuffleAnswers(newArray) });
    }
  }

  shuffleAnswers(array) {
    const sizeArray = array.length;
    for (let i = 0; i < sizeArray; i += 1) {
      const random = Math.floor(Math.random() * (sizeArray));
      [array[i], array[random]] = [array[random], array[i]];
    }
    return array;
  }

  verifyAll() {
    const { questionsState } = this.props;
    const numberResponse = 3;
    if (questionsState) {
      const { response_code: responseCode } = questionsState;
      if (responseCode === numberResponse) this.setState({ redirect: true });
    }
    if (!localStorage.getItem('token')) {
      this.setState({ redirect: true });
    }
  }

  render() {
    const {
      questionsState: { results },
    } = this.props;
    const { redirect, questionNumber, answers } = this.state;
    return redirect ? (
      <Redirect to="/" />
    ) : (
      <>
        <Header />
        { !results ? <p>loading</p> : (
          <div>
            <p data-testid="question-category">
              {results[questionNumber].category}
            </p>
            <p data-testid="question-text">
              {results[questionNumber].question}
            </p>
            {console.log(answers)}
            {answers.map(({ answer, testid }, index) => (
              <button type="button" key={ index } data-testid={ testid }>{answer}</button>
            ))}
          </div>
        )}
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  questionDispatch: () => dispatch(fetchQuestions()),
});

const mapStateToProps = (state) => ({
  questionsState: state.questionsReducer.questions,
});

Gaming.propTypes = {
  questionDispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Gaming);

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Gaming extends React.Component {
  constructor(props) {
    super(props);

    this.verifyAll = this.verifyAll.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
    this.shuffleAnswers = this.shuffleAnswers.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      redirect: false,
      answers: [],
      correct: '',
      isDisabled: false,
      isFinished: false,
    };
  }

  componentDidMount() {
    this.verifyAll();
    this.getAnswers();
  }

  // componentDidUpdate(prevState, prevProps) {
  //   console.log('componentDidUpdate');
  //   console.log(prevState);
  //   console.log(prevProps);
  // }

  getAnswers() {
    const { questionsState, questionNumber } = this.props;
    if (questionsState.length > 0) {
      const {
        incorrect_answers: incorrectAnswers,
        correct_answer: correctAnswer,
      } = questionsState[questionNumber];
      const newArray = [
        {
          answer: this.decodeHTMLEntities(correctAnswer),
          testid: 'correct-answer',
        },
      ];
      incorrectAnswers.map((incorrect, index) => newArray.push({
        answer: this.decodeHTMLEntities(incorrect),
        testid: `wrong-answer-${index}`,
      }));
      this.setState({
        correct: this.decodeHTMLEntities(correctAnswer),
        answers: this.shuffleAnswers(newArray),
      });
    }
  }

  shuffleAnswers(array) {
    const sizeArray = array.length;
    for (let i = 0; i < sizeArray; i += 1) {
      const random = Math.floor(Math.random() * sizeArray);
      [array[i], array[random]] = [array[random], array[i]];
    }
    return array;
  }

  verifyAll() {
    const { responseCode } = this.props;
    const numberResponse = 3;

    if (
      !localStorage.getItem('state') || responseCode === numberResponse
    ) {
      this.setState({ redirect: true });
    }
  }

  // Função que interpreta caracteres especiais
  // https://tertiumnon.medium.com/js-how-to-decode-html-entities-8ea807a140e5
  decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  handleClick(event) {
    const { questionNumber } = this.props;
    const { correct } = this.state;
    const maxQuestionNumber = 4;

    this.setState({ isDisabled: true });

    if (questionNumber === maxQuestionNumber) {
      this.setState({ isFinished: true });
    }

    console.log(event.target);
    console.log(event.target.innerText);
    console.log(correct);
  }

  render() {
    const { questionsState, questionNumber } = this.props;
    const { redirect, answers, isDisabled, isFinished } = this.state;

    return redirect || isFinished ? (
      <Redirect to={ redirect ? '/' : '/feedback' } />
    ) : (
      <>
        <Header />
        {questionsState.length === 0 ? (
          <p>loading</p>
        ) : (
          <div>
            <p data-testid="question-category">
              {questionsState[questionNumber].category}
            </p>
            <p data-testid="question-text">
              {this.decodeHTMLEntities(questionsState[questionNumber].question)}
            </p>
            <ul>
              {answers.map(({ answer, testid }, index) => (
                <li key={ `answer-${index}` }>
                  <button
                    type="button"
                    data-testid={ testid }
                    disabled={ isDisabled }
                    onClick={ this.handleClick }
                  >
                    {answer}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  }
}
// const mapDispatchToProps = (dispatch) => ({
//   questionDispatch: () => dispatch(fetchQuestions()),
// });

const mapStateToProps = (state) => ({
  questionsState: state.questionsReducer.questions,
  questionNumber: state.questionsReducer.questionNumber,
  responseCode: state.questionsReducer.responseCode,
});

Gaming.propTypes = {
  questionDispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps /* , mapDispatchToProps */)(Gaming);
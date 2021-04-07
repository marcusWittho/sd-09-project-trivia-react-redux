import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setQuestions } from '../Actions/setQuestions';
import '../Styles/GameQuestionsStyle.css';

class GameQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      answerClicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  setAnswer(incorrects, correct) {
    const { answerClicked } = this.state;
    const incorrectsElements = incorrects.map(
      (incorrect, index) => (
        <button
          type="button"
          key={ incorrect }
          data-testid={ `wrong-answer-${index}` }
          name="incorrectAnswer"
          className={ answerClicked ? 'incorrect' : null }
          onClick={ this.handleClick }
        >
          {incorrect}
        </button>
      ),
    );
    const correctElement = (
      <button
        type="button"
        data-testid="correct-answer"
        key={ correct }
        name="correctAnswer"
        className={ answerClicked ? 'correct' : null }
        onClick={ this.handleClick }
      >
        {correct}
      </button>
    );
    const position = Math.round(Math.random() * incorrects.length);
    incorrectsElements.splice(position, 0, correctElement);
    return incorrectsElements;
  }

  handleClick() {
    this.setState({
      answerClicked: true,
    });
  }

  render() {
    const { fetchQuestions, token, loading, questions } = this.props;
    const { questionNumber } = this.state;
    console.log(questions);
    if (loading) {
      fetchQuestions(token);
      return <h3>Loading</h3>;
    }
    return (
      <div>
        <h2>Pergunta</h2>
        <p data-testid="question-category">
          Categoria:
          {questions && questions[questionNumber].category}
        </p>
        <p
          data-testid="question-text"
        >
          {questions && questions[questionNumber].question}
        </p>
        <div>
          {questions && this.setAnswer(
            questions[questionNumber].incorrect_answers,
            questions[questionNumber].correct_answer,
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(setQuestions(token)),
});

const mapStateToProps = (state) => ({
  token: state.token.obj.token,
  loading: state.questions.loading,
  questions: state.questions.questions,
});

GameQuestions.propTypes = {
  fetchQuestions: PropTypes.func,
  token: PropTypes.string,
  loading: PropTypes.bool,
  questions: PropTypes.arrayOf({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);

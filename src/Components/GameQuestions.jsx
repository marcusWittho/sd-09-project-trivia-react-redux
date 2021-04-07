import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setQuestions } from '../Actions/setQuestions';

class GameQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
    };
  }

  setAnswer(incorrects, correct) {
    const incorrectsElements = incorrects.map(
      (incorrect, index) => (
        <button
          type="button"
          key={ incorrect }
          data-testid={ `wrong-answer-${index}` }
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
      >
        {correct}
      </button>
    );
    const position = Math.round(Math.random() * incorrects.length);
    incorrectsElements.splice(position, 0, correctElement);
    return incorrectsElements;
  }

  render() {
    const { fetchQuestions, token, loading, questions } = this.props;
    const { questionNumber } = this.state;
    if (loading) {
      fetchQuestions(token);
      return <h3>Loading</h3>;
    }
    return (
      <div>
        {console.log(questions)}
        <h2>Pergunta</h2>
        <p data-testid="question-category">
          Categoria:
          {questions[questionNumber].category}
        </p>
        <p data-testid="question-text">{questions[questionNumber].question}</p>
        <div>{this.setAnswer(questions[questionNumber].incorrect_answers, questions[questionNumber].correct_answer)}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);

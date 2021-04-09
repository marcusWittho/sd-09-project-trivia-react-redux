import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf } from 'prop-types';
import Logotipo from './Logotipo';
// import PropTypes from 'prop-types';

import Answer from './Answer';
// import './Answer.css';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.getAnswerOptions = this.getAnswerOptions.bind(this);
  }

  getIncorrectAnswers(question) {
    return question.map((item, index) => (
      <Answer
        key="index.toString()"
        question={ item }
        index={ index }
      />
    ));
  }

  getAnswerOptions() {
    const { questions } = this.props;
    const result = [];
    questions.forEach((question) => {
      Object.keys(question).forEach((key) => {
        if (key === 'correct_answer') {
          result.push(
            <button
              type="button"
              // key="answer.toString()"
              className="answer-btn"
              data-testid="correct-answer"
            >
              { question[key] }
            </button>,
          );
        }

        if (key === 'incorrect_answers') {
          const incorrectAnswers = this.getIncorrectAnswers(question[key]);
          result.push(incorrectAnswers);
        }
      });
    });
    return result;
  }

  // /* const answerOptions = questions.map((answer) => {
  //   Object.keys(answer).forEach((key) => {
  //     if (key === 'correct_answer') {
  //       filtered.push(questions[question]);
  //     }
  //   });
  //   <Answer key="answer.toString()" description={ answer } />
  // }); */
  render() {
    const { questions } = this.props;

    return (
      <div>
        {
          !questions.length
            ? <Logotipo />
            : (
              <div className="container-game">
                <section className="question-game">
                  <h2 data-testid="question-category">{ questions[0].category }</h2>
                  <p data-testid="question-text">{ questions[0].question }</p>
                </section>
                <section className="answers-game">
                  { this.getAnswerOptions() }
                </section>
              </div>
            )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
});

// const mapDispatchToProps = (dispatch) => ({
//   getGameData: (token) => dispatch(fetchGameData(token)),
// });

Questions.propTypes = {
  questions: arrayOf(),
}.isRequired;

export default connect(mapStateToProps)(Questions);

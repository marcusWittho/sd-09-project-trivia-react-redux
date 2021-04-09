import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logotipo from './Logotipo';
// import PropTypes from 'prop-types';

import Answer from './Answer';
// import './Answer.css';

class Questions extends Component {
  render() {
    const { questions } = this.props;
    console.log('questions-props:', questions);
    /* const questions = [{
      "category":"Entertainment: Video Games",
      "type":"multiple",
      "difficulty":"easy",
      "question":"What is the first weapon you acquire in Half-Life?",
      "correct_answer":"A crowbar",
      "incorrect_answers":[
         "A pistol",
         "The H.E.V suit",
         "Your fists"
      ]
    }]; */
    const getAnswerOptions = () => {
      const result = [];
      questions.forEach((question) => {
        Object.keys(question).forEach((key) => {
          if (key === 'correct_answer') {
            result.push(
              <button
                // key="answer.toString()"
                className="answer-btn"
                data-testid="correct-answer">
                  { question[key] }
              </button>
            );
          }

          if (key === 'incorrect_answers') {
            const incorrectAnswers = question[key].map((item, index) => (
              <Answer
                key="index.toString()"
                question={ item }
                index={ index }
              />
            ));
            result.push(incorrectAnswers);
          }
        });
      });
      return result;
    }
    /* const answerOptions = questions.map((answer) => {
      Object.keys(answer).forEach((key) => {
        if (key === 'correct_answer') {
          filtered.push(questions[question]);
        }
      });
      <Answer key="answer.toString()" description={ answer } />
    }); */
    const answerOptions = getAnswerOptions();
    console.log(answerOptions);

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
              { answerOptions }
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

export default connect(mapStateToProps)(Questions);

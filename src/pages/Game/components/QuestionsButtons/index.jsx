import React, { Component } from 'react';
import ButtonsAnswers from './styled';

class QuestionsButtons extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      questions,
      numberOFQuestion,
      disabled,
      colorQuestion,
    } = this.props;

    const orderQuestions = questions[numberOFQuestion];
    return (
      <ButtonsAnswers>
        <button
          data-testid="correct-answer"
          type="button"
          disabled={ disabled }
          style={ (colorQuestion)
            ? { border: '3px solid rgb(6, 240, 15)' } : {} }
          onClick={ this.clickQuestion }
        >
          {orderQuestions.correct_answer}
        </button>
        {orderQuestions.incorrect_answers.map((answer, index) => (
          <button
            key={ index }
            data-testid={ `wrong-answer-${index}` }
            type="button"
            disabled={ disabled }
            style={ (colorQuestion) ? { border: '3px solid rgb(255, 0, 0)' } : {} }
            onClick={ this.clickQuestion }
          >
            { answer}
          </button>
        ))}
      </ButtonsAnswers>
    );
  }
}

export default QuestionsButtons;

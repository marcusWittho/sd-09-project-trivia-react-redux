import React from 'react';
// import { connect } from 'react-redux';

const THISPROPS = {
  questions: [
    {
      category: 'Entertainment: Video Games',
      question: 'What is the first weapon you acquire in Half-Life?',
      correct_answer: 'A crowbar',
      incorrect_answers: ['A pistol', 'The H.E.V suit', 'Your fists'],
    },
    {
      category: 'Entertainment: Test Question',
      question: 'What is the first weapon you acquire in Counter-Strike?',
      correct_answer: 'True',
      incorrect_answers: ['False'],
    },
  ],
};

class Game extends React.Component {
  setupRandomAnswers(correctAnswer, incorrectAnswers) {
    const CONST_RANDOM = 0.5;
    const correctAnswersButtons = (
      <button key="correct" type="button" data-testid="correct-answer">
        {correctAnswer}
      </button>
    );
    const incorrectAnswersButtons = incorrectAnswers.map(
      (incorrectAnswer, index) => (
        <button
          type="button"
          key={ index + 1 }
          data-testid={ `wrong-answer-${index}` }
        >
          {incorrectAnswer}
        </button>
      ),
    );
    const answers = [correctAnswersButtons, ...incorrectAnswersButtons];
    return [...answers.sort(() => Math.random() - CONST_RANDOM)];
  }

  renderQuestions() {
    const { questions } = THISPROPS;
    return questions.map(
      (
        {
          category,
          question,
          correct_answer: correctAnswer,
          incorrect_answers: incorrectAnswers,
        },
        questionNumber,
      ) => (
        <div key={ questionNumber }>
          <p data-testid="question-category">{category}</p>
          <p data-testid="question-text">{question}</p>
          {this.setupRandomAnswers(correctAnswer, incorrectAnswers)}
        </div>
      ),
    );
  }

  render() {
    return this.renderQuestions();
  }
}

// const mapStateToProps = (state) => ({
//   questions: state.trivia.questions,
// });

export default Game;

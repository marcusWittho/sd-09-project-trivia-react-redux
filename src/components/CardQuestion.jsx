import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CardQuestion extends React.Component {
  render() {
    const { getQuestions: { questions: { results } } } = this.props;

    // Constantes criadas para avaliacao do requisito 6. Deleta-las posteriormente.
    const index = 0;
    const currentQuestion = results[index];

    // return results.map((currentQuestion, index) => (
    return ( // Return de apenas 1 pergunta para avaliacao do requisito 6. Deletar este return quando houver o botao de proxima pergunta.
      <div key={ index }>
        <h2 data-testid="question-category">{currentQuestion.category}</h2>
        <p data-testid="question-text">{currentQuestion.question}</p>

        <button
          data-testid="correct-answer"
          type="button"
          onClick={ this.selectAnswer }
        >
          {currentQuestion.correct_answer}
        </button>

        {currentQuestion.incorrect_answers.map((incorrectAnswer, answerIndex) => (
          <button
            data-testid={ `wrong-answer-${answerIndex}` }
            key={ answerIndex }
            type="button"
            onClick={ this.selectAnswer }
          >
            {incorrectAnswer}
          </button>
        ))}
      </div>
    ); // Deletar essa linha quando usar o map da linha 12.
    // ));
  }
}

CardQuestion.propTypes = {
  getQuestions: PropTypes.shape({
    loading: PropTypes.bool,
    questions: PropTypes.shape({
      response_code: PropTypes.number,
      results: PropTypes.arrayOf(Object),
    }),
  }),
};

CardQuestion.defaultProps = {
  getQuestions: PropTypes.shape({
    loading: PropTypes.bool,
    questions: PropTypes.shape({
      response_code: PropTypes.number,
      results: PropTypes.arrayOf(Object),
    }),
  }),
};

const mapStateToProps = (state) => ({
  getQuestions: state.questions,
});

export default connect(mapStateToProps)(CardQuestion);

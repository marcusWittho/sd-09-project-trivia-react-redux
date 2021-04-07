import React from 'react';
import PropTypes from 'prop-types';
import QuestionCard from './QuestionCard.css';

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);

    this.isCorrect = this.isCorrect.bind(this);

    this.state = {
      answers: [],
      applyStyle: false,
    };
  }

  isCorrect({target}) {

    if(isCorrect) {

    }

  }

  render() {
    const { renderQuestion } = this.props;
    return (
      <div>
        <h3 data-testid="question-category">
          { renderQuestion.category }
        </h3>
        <p data-testid="question-text">
          { renderQuestion.question }
        </p>
        { renderQuestion.incorrect_answers.map((option, index) => (
          <button
            className={ applyStyle ? wrongAnswerStyle : null }
            key={ index }
            data-testid={ `wrong-answer-${index}` }
            type="button"
            onClick={ (e) =>  this.isCorrect(e) }
          >
            { option }
          </button>
        )) }
        <button
          className={ applyStyle ? correctAnswerStyle : null }
          type="button"
          isCorrect="true"
          data-testid="correct-answer"
        >
          { renderQuestion.correct_answer }
        </button>
      </div>
    );
  }
}



QuestionCard.propTypes = {
  renderQuestion: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

// const mapStateToProps = (state) => ({

// })

// export default connect(mapStateToProps, null)(QuestionCard);
export default QuestionCard;

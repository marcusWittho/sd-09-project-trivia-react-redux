import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNum: 0,
    };

    this.renderQuestion = this.renderQuestion.bind(this);
  }

  renderQuestion(question) {
    const { questions } = this.props;
    console.log(questions);
    console.log(question);
    return (
      <>
        <p data-testid="question-category">{ question.category }</p>
        <p data-testid="question-text">{ question.question }</p>
        <p data-testid="correct-answer">{ question.correct_answer }</p>
        {question.incorrect_answers
          .map((item, index) => (
            <p key={ index } data-testid={ `wrong-answer-${index}` }>{item}</p>))}
      </>
    );
  }

  render() {
    const { questionNum } = this.state;
    const { questions } = this.props;
    return (
      <div>
        { this.renderQuestion(questions[questionNum]) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.getQuestions.questions,
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Questions);

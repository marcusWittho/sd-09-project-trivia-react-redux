import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNum: 0,
      loading: true,
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
            <p key={index} data-testid={`wrong-answer-${index}`}>{item}</p>))}
      </>
    );
  }

  render() {
    const { questions } = this.props;
    return (
      <div>
        { this.renderQuestion(questions[0]) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.getQuestions.questions,
});

export default connect(mapStateToProps)(Questions);

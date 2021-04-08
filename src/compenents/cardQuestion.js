import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import options from './questionsShape';

class CardQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderQuest: 0,
    };
  }

  render() {
    const { questions } = this.props;
    const { orderQuest } = this.state;

    const {
      category,
      question,
      correct_answer: correct,
      incorrect_answers: incorrects,
    } = questions[orderQuest];

    return (
      <div>
        <h2 data-testid="question-category">{ category }</h2>
        <h3 data-testid="question-text">{ question }</h3>
        {
          options(correct, incorrects)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
});

CardQuestion.propTypes = {
  questions: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(CardQuestion);

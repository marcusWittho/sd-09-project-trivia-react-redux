import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import options from './questionsShape';
import Choices from '../CSS-Components/Choices.css';

class CardQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderQuest: 0,
    };
    this.paintingButton = this.paintingButton.bind(this);
  }

  paintingButton() {
    const buttons = document.querySelectorAll('#choiceButton');
    buttons.forEach((button) => {
      console.log(button.className);
      console.log(button.className === 'correct-answer');
      if (button.className === 'correct-answer') {
        button.className = 'correct-answers';
      } else {
        button.className = 'wrong-answers';
      }
    });
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
          options(correct, incorrects, this.paintingButton)
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

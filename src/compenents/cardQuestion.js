import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import options from './questionsShape';
import '../CSS-Components/Choices.css';

class CardQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderQuest: 0,
      hidden: true,
      result: false,
    };
    this.paintingButton = this.paintingButton.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  paintingButton() {
    const buttons = document.querySelectorAll('#choiceButton');
    this.setState({
      hidden: false,
    });
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

  nextQuestion() {
    const { orderQuest } = this.state;
    const magicNumber = 4;
    if (orderQuest < magicNumber) {
      this.setState({
        orderQuest: orderQuest + 1,
      });
    } else {
      this.setState({
        result: true,
      });
    }
  }

  render() {
    const { questions } = this.props;
    const { orderQuest, hidden, result } = this.state;

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
        <button
          data-testid="btn-next"
          type="button"
          onClick={ this.nextQuestion }
          hidden={ hidden }
        >
          Próxima
        </button>
        { result ? <Redirect to="/result" /> : '' }
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

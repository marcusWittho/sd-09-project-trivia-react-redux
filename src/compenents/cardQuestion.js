import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import options from './questionsShape';
import '../CSS-Components/Choices.css';
import Timer from './timer';

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
      if (button.className === 'correct-answer') {
        button.classList.add('correct-answers');
      } else {
        button.classList.add('wrong-answers');
      }
    });
  }

  nextQuestion() {
    const { orderQuest } = this.state;
    const buttons = document.querySelectorAll('#choiceButton');
    const magicNumber = 4;
    if (orderQuest < magicNumber) {
      this.setState({
        orderQuest: orderQuest + 1,
        hidden: true,
      });
    } else {
      this.setState({
        result: true,
      });
    }
    buttons.forEach((button) => {
      if (button.className === 'correct-answer correct-answers') {
        button.classList.remove('correct-answers');
      } else {
        button.classList.remove('wrong-answers');
      }
    });
  }

  render() {
    const { questions } = this.props;
    const { orderQuest, hidden, result, restartTime } = this.state;

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
        <p>
          Cronômetro
        </p>
        <Timer
          timeOut={ this.paintingButton }
          nextButton={ hidden }
          restartTime={ restartTime }
        />
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

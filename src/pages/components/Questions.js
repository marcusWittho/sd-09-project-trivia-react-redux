import React from 'react';
import * as Api from '../../service/Api';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      question: '',
      alternatives: [],
      correctAnswer: '',
      questionIndex: 0,
    };
    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { questionIndex } = this.state;
    const questions = await Api.fetchQuestions();
    const answers = [
      questions[questionIndex].correct_answer,
      ...questions[questionIndex].incorrect_answers,
    ];
    this.setState({
      category: questions[questionIndex].category,
      question: questions[questionIndex].question,
      alternatives: answers.sort(),
      correctAnswer: questions[questionIndex].correct_answer,
    });
  }

  render() {
    const { category, question, alternatives, correctAnswer } = this.state;
    const number = -1;
    let indexQuestion = number;
    return (
      <div>
        <h4 data-testid="question-category">{ category }</h4>
        <p data-testid="question-text">{ question }</p>
        {alternatives.map((alternative, index) => {
          if (alternative === correctAnswer) {
            return (
              <button
                type="button"
                key={ index }
                data-testid="correct-answer"
              >
                { alternative }
              </button>);
          }
          indexQuestion += 1;
          return (
            <button
              type="button"
              key={ index }
              data-testid={ `wrong-answer-${indexQuestion}` }
            >
              { alternative }
            </button>);
        })}
      </div>
    );
  }
}

export default Questions;

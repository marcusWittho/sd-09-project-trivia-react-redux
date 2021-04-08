import React from 'react';
import Header from '../components/Header';
import Question from '../components/question';

const fooQuestions = [{
  category: 'Science: Computers',
  type: 'multiple',
  difficulty: 'easy',
  question: 'The seriseries (Broadwell) is called:',
  correctAnswer: 'wsqehn',
  incorrectAnswers: [
    'sfdfsdahics 700 ',
    'asdfbdg',
    'uewgbfdfg',
  ],
}];

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
    };
  }

  render() {
    const { currentQuestion } = this.state;
    return (
      <div>
        <Header />
        <p>Game Page</p>
        <Question questionData={ fooQuestions[currentQuestion] } />
      </div>
    );
  }
}

export default Game;

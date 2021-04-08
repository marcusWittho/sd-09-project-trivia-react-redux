import React from 'react';
import Header from '../components/Header';
import Question from '../components/question';

const fooQuestion = {
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
};

class Game extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p>Game Page</p>
        <Question questionData={ fooQuestion } />
      </div>
    );
  }
}

export default Game;

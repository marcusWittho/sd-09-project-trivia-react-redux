import React, { Component } from 'react';
import UserData from '../Component/UserData';
import GameQuestions from '../Components/GameQuestions';

class GameScreen extends Component {
  render() {
    return (
      <div>
        <UserData />
        <GameQuestions />
      </div>
    );
  }
}

export default GameScreen;

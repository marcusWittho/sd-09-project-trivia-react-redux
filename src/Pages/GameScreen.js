import React, { Component } from 'react';
import UserData from '../Component/UserData';
import GameQuestions from '../Components/GameQuestions';
import '../Styles/Pages/GameScreen.css';
import Loading from '../Components/Loading';

class GameScreen extends Component {
  render() {
    return (
      <div className={ <GameQuestions /> === <Loading /> ? '' : 'containerQuestions' }>
        <UserData />
        <GameQuestions />
      </div>
    );
  }
}

export default GameScreen;

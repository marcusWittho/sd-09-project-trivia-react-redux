import React, { Component } from 'react';
import Gameplay from '../components/Gameplay';
import HeaderGamePlay from '../components/HeaderGamePlay';

class GamePage extends Component {
  render() {
    return (
      <>
        <HeaderGamePlay />
        <Gameplay />
      </>
    );
  }
}

export default GamePage;

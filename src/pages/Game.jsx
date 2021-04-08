import React, { Component } from 'react';
import Header from '../components/Header';

import getQuestions from '../services/triviaAPI_questions';

export default class Game extends Component {
  render() {
    getQuestions();
    return (
      <Header />
    );
  }
}

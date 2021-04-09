import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <header>
        <h2 data-testid="feedback-text">Feedback</h2>
        <Header />
      </header>
    );
  }
}

export default Feedback;

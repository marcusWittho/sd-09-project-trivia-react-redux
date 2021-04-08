import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.showMessage = this.showMessage.bind(this);
  }

  showMessage() {
    const score = 3;
    const coudBeBetter = 3;
    if (score < coudBeBetter) {
      const message = 'Podia ser melhor...';
      return (<p data-testid="feedback-text">{message}</p>);
    }
    const message = 'Mandou bem!';
    return (<p data-testid="feedback-text">{message}</p>);
  }

  render() {
    return (
      <div>
        <Header />
        { this.showMessage() }
      </div>
    );
  }
};

export default Feedback;

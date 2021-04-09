import React, { Component } from 'react';

class FeedBack extends Component {
  render() {
    const state = localStorage.getItem('state');
    const { player } = JSON.parse(state);
    const { assertions } = player;
    console.log(assertions);
    const condicionNumber = 3;
    return (
      assertions < condicionNumber
        ? <p data-testid="feedback-text">Podia ser melhor...</p>
        : <p data-testid="feedback-text">Mandou bem!</p>
    );
  }
}

export default FeedBack;

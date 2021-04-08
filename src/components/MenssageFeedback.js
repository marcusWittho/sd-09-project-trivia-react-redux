import React from 'react';

class MessageFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assertions: JSON.parse(localStorage.getItem('state')).player.assertions,
    };
  }

  render() {
    const valuePattern = 3;
    const { assertions } = this.state;
    if (assertions >= valuePattern) return <p data-testid="feedback-text">Mandou bem!</p>;
    return <p data-testid="feedback-text">Podia ser melhor...</p>;
  }
}

export default MessageFeedback;

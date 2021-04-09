import React, { Component } from 'react';

import './Answer.css';

class Answer extends Component {
  render() {
    const { item, index } = this.props;
   
    return (
      <button
        className="answer-btn"
        data-testid={ `wrong-answer-${index}` }
      >
        { item }
      </button>
    );
  }
}

export default Answer;

import React, { Component } from 'react';

import './Answer.css';

class Answer extends Component {
  render() {
    const { description } = this.props;
    const { question } = description;
    return (
      <button className="answer-btn">{ question }</button>
    );
  }
}

export default Answer;

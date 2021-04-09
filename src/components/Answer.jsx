import React, { Component } from 'react';

import './Answer.css';

class Answer extends Component {
  render() {
    const { description } = this.props;
    return (
      <button className="answer-btn">{ description }</button>
    );
  }
}

export default Answer;

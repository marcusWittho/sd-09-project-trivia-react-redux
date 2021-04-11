import React, { Component } from 'react';
import { number, string } from 'prop-types';

import './Answer.css';

class Answer extends Component {
  render() {
    const { item, index } = this.props;

    return (
      <button
        type="button"
        className="answer-btn"
        data-testid={ `wrong-answer-${index}` }
      >
        { item }
      </button>
    );
  }
}

Answer.propTypes = {
  item: string,
  index: number,
}.isRequired;

export default Answer;

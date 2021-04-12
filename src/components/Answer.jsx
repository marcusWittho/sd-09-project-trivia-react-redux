import React, { Component } from 'react';
import { number, string } from 'prop-types';

import './Answer.css';

class Answer extends Component {
  render() {
    const { text, dataTestId } = this.props;

    return (
      <button
        type="button"
        className="answer-btn"
        data-testid={ dataTestId }
      >
        { text }
      </button>
    );
  }
}

Answer.propTypes = {
  item: string,
  index: number,
}.isRequired;

export default Answer;

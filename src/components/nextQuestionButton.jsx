import React, { Component } from 'react';

class NextQuestionButton extends Component {
  render() {
    return (
      <button
        type="button"
        data-testid="btn-next"
      >
        Next
      </button>
    );
  }
}

export default NextQuestionButton;

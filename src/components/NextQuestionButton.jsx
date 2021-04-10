import React, { Component } from 'react';

export default class NextQuestionButton extends Component {
  render() {
    return (
      <button
        type="button"
        className="next-button"
        data-testid="btn-next"
      >
        Próxima
      </button>
    );
  }
}

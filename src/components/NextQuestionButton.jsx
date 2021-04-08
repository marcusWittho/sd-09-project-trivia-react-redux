import React, { Component } from 'react';
import { func } from 'prop-types';

class NextQuestionButton extends Component {
  render() {
    const { setIndexQuestion } = this.props;

    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ setIndexQuestion }
      >
        Next
      </button>
    );
  }
}

NextQuestionButton.propTypes = {
  setIndexQuestion: func.isRequired,
};

export default NextQuestionButton;

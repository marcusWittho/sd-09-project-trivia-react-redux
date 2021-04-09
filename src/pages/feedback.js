import React from 'react';
import { PropTypes } from 'prop-types';

class feedback extends React.Component {
  mandouBem() {
    return (
      <h1>Mandou bem!</h1>
    );
  }

  podiaSerMelhor() {
    return (
      <h1>Podia ser melhor...</h1>
    );
  }

  render() {
    const { assertions } = this.props;
    const score = 3;
    return (
      <span data-testid="feedback-text">
        { assertions < score
          ? this.podiaSerMelhor()
          : this.mandouBem() }
      </span>
    );
  }
}

feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

export default feedback;

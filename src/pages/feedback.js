import React from 'react';
import { PropTypes } from 'prop-types';
import Header from '../components/header';

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
      <div>
        <Header />
        <span data-testid="feedback-text">
          { assertions < score
            ? this.podiaSerMelhor()
            : this.mandouBem() }
        </span>
      </div>
    );
  }
}

feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

export default feedback;

import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
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
    const { assertions, score } = this.props;
    const medium = 3;
    return (
      <div>
        <Header />
        <span data-testid="feedback-text">
          { assertions < medium
            ? this.podiaSerMelhor()
            : this.mandouBem() }
        </span>
        <div data-testid="feedback-total-score">
          {score}
        </div>
        <div data-testid="feedback-total-question">
          {assertions}
        </div>
      </div>
    );
  }
}

feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ actionsReducer: { score } }) => ({
  score,
});

export default connect(mapStateToProps, null)(feedback);

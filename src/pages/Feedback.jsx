import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const MAGIC_NUMBER = 3;

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    return (
      <>
        <Header />
        <h3 data-testid="feedback-text">
          { assertions >= MAGIC_NUMBER ? 'Mandou bem!' : 'Podia ser melhor...' }
        </h3>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.scoreReducer.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">Feedback</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.loginUser.name,
  email: state.loginUser.email,
});

Feedback.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);

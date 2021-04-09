import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timerCountdown } from '../actions';

class Timer extends Component {
  componentDidMount() {
    const oneSecond = 1000;
    const { timerDispatch, timer } = this.props;
    setInterval(() => {
      if (timer >= 0) timerDispatch();
    }, oneSecond);
  }

  render() {
    const { timer } = this.props;
    return (
      <h2>{timer}</h2>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.gameplay.timer,
});

const mapDispatchToProps = (dispatch) => ({
  timerDispatch: () => dispatch(timerCountdown()),
});

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  timerDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

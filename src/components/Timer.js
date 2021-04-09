import React, { Component } from 'react';
import PropTypes from 'prop-types';

const defaultTime = 30;
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: defaultTime,
    };
  }

  getTime() {
    const { timeLeft } = this.state;
    return timeLeft;
  }

  start() {
    this.countDown();
  }

  reset() {
    this.setState({ timeLeft: defaultTime });
  }

  countDown() {
    const { timeUp } = this.props;
    const second = 1000;
    this.timerInterval = setInterval(() => {
      const { timeLeft } = this.state;
      if (timeLeft === 0) {
        timeUp();
        this.pause();
        return;
      }
      this.clockTick();
    }, second);
  }

  pause() {
    clearInterval(this.timerInterval);
  }

  clockTick() {
    const secondsToDecrease = 1;
    this.setState(({ timeLeft }) => ({ timeLeft: timeLeft - secondsToDecrease }));
  }

  render() {
    const { timeLeft } = this.state;
    return (
      timeLeft ? <span>{`faltam ${timeLeft} segundos`}</span> : <span>Time is up</span>
    );
  }
}

Timer.propTypes = {
  timeUp: PropTypes.func.isRequired,
};

export default Timer;

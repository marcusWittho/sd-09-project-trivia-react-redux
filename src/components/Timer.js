import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
    };

    this.setGameTime = this.setGameTime.bind(this);
    this.countDown = this.countDown.bind(this);
    this.clockTick = this.clockTick.bind(this);
  }

  componentDidMount() {
    this.setGameTime();
  }

  setGameTime() {
    const { timeInterval } = this.props;
    const miliSeconds = 1000;
    this.setState({ seconds: timeInterval }, () => {
      this.countDown(miliSeconds);
    });
  }

  countDown(miliSeconds) {
    const myTimer = setInterval(() => {
      console.warn('rodando Countdown');
      const { seconds } = this.state;
      if (seconds === 0) {
        clearInterval(myTimer);
        return null;
      }
      this.clockTick();
    }, miliSeconds);
  }

  clockTick() {
    const secondsToDecrease = 1;
    this.setState(({ seconds }) => ({ seconds: seconds - secondsToDecrease }));
  }

  render() {
    const { seconds } = this.state;
    return (
      <span>{`faltam ${seconds} segundos`}</span>
    );
  }
}

Timer.propTypes = {
  timeInterval: PropTypes.number.isRequired,
};

export default Timer;

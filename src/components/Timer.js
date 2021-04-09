import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timeRunOut } from '../actions/index';

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
    const { resetTimer } = this.props;
    const myTimer = setInterval(() => {
      const { seconds } = this.state;
      if (seconds === 0) {
        clearInterval(myTimer);
        resetTimer(true);
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

const mapDispatchToProps = (dispatch) => ({
  resetTimer: (bool) => dispatch(timeRunOut(bool)),
});

Timer.propTypes = {
  timeInterval: PropTypes.number.isRequired,
  resetTimer: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Timer);

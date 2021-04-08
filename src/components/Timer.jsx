import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  componentDidMount() {
    let INTERVAL = '1000';
    this.myInterval = setInterval(() => {
      const { timer, timeChange, stopTimer, handleClick } = this.props;
      if (timer === 0 || stopTimer) {
        INTERVAL = '0';
        handleClick();
      } else {
        timeChange();
      }
    }, parseInt(INTERVAL, 10));
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { timer } = this.props;
    return (
      <div>
        <p>{`Tempo: ${timer}`}</p>
      </div>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  timeChange: PropTypes.func.isRequired,
  stopTimer: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Timer;

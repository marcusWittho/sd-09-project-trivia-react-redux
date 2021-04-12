import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timeOver } from '../redux/actions';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate(prevProp) {
    const { time } = this.props;
    const magicNumber = 30;
    if (prevProp.time === 0 && time === magicNumber) {
      this.timer();
    }
  }

  timer() {
    const magicSecond = 1000;
    const { finishTime, noClick, countDown } = this.props;

    const interval = setInterval(() => {
      const { time } = this.props;
      if (time > 0) {
        countDown();
      } else {
        noClick();
        finishTime();
        clearInterval(interval);
      }
    }, magicSecond);
  }

  render() {
    const { time } = this.props;
    return (
      <div>
        Tempo:
        <span>{ ` ${time}` }</span>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  finishTime: () => dispatch(timeOver()),
});

Timer.propTypes = {
  finishTime: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Timer);

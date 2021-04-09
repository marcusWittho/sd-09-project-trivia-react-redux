import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSeconds, timesUp } from '../../redux/actions';

let timer;
class Timer extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
    this.gameTimer = this.gameTimer.bind(this);
  }

  componentDidMount() {
    this.gameTimer();
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    const { dispatchTimesUp, stopTime } = this.props;
    if ((seconds > 0) && (!(stopTime))) {
      this.gameTimer();
    } else if (((seconds === 0) || (stopTime))) {
      clearTimeout(timer);
      dispatchTimesUp();
    }
  }

  gameTimer() {
    const { seconds } = this.state;
    const { dispatchSeconds } = this.props;
    const ONE_SECOND = 1000;
    timer = setTimeout(() => this.setState({ seconds: seconds - 1 }), ONE_SECOND);
    dispatchSeconds(seconds);
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <p>{seconds}</p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchTimesUp: () => dispatch(timesUp()),
  dispatchSeconds: (seconds) => dispatch(getSeconds(seconds)),
});

const mapStateToProps = (state) => ({
  stopTime: state.timer.stopTime,
});
Timer.propTypes = {
  dispatchTimesUp: PropTypes.func,
  dispatchSeconds: PropTypes.func,
  stopTime: PropTypes.bool,
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(Timer);

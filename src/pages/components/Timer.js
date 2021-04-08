import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timesUp } from '../../redux/actions';

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

  componentDidUpdate(_, prevState) {
    const { seconds } = this.state;
    const { dispatchTimesUp, stopTime } = this.props;
    if ((seconds > 0) && (prevState.seconds !== seconds) && stopTime === false) {
      this.gameTimer();
    } else if (((seconds === 0) && (prevState.seconds !== seconds)) || stopTime) {
      dispatchTimesUp(seconds);
    }
  }

  gameTimer() {
    const { seconds } = this.state;
    const oneSecond = 1000;
    setTimeout(() => this.setState({ seconds: seconds - 1 }), oneSecond);
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <p>{ seconds }</p>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchTimesUp: (seconds) => dispatch(timesUp(seconds)),
});

const mapStateToProps = (state) => ({
  stopTime: state.timer.stopTime,
});

Timer.propTypes = {
  dispatchTimesUp: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

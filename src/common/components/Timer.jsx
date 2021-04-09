import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { runTimer, stopTimer } from '../../actions/action';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.runTimer = this.runTimer.bind(this);
  }

  // código inspirado no exemplo desenvolvido em aula (ISS API)
  componentDidMount() {
    const standardInterval = 1000;
    this.timer = setInterval(
      this.runTimer,
      standardInterval,
    );
  }

  runTimer() {
    const {
      timer,
      sendTimer,
      disableOptions,
      stopTimerAction,
      stopTimerToggle } = this.props;

    if (stopTimerToggle === true) {
      stopTimerAction(true);
      clearInterval();
    } else {
      return timer > 0
        ? sendTimer(timer - 1)
        : disableOptions(true);
    }
  }

  render() {
    const { timer } = this.props;
    return (
      <div>
        <h2>
          { timer }
        </h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.timerReducer,
  stopTimerToggle: state.stopTimerReducer,
});

const mapDispatchToProps = (dispatch) => ({
  sendTimer: (time) => dispatch(runTimer(time)),
  stopTimerAction: (value) => dispatch(stopTimer(value)),
});

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  sendTimer: PropTypes.func.isRequired,
  disableOptions: PropTypes.func.isRequired,
  stopTimerAction: PropTypes.func.isRequired,
  stopTimerToggle: PropTypes.bool.isRequired,
  // updateQuestion: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

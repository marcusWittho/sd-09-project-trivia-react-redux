import React from 'react';
import { connect } from 'react-redux';
import { decrementTimer, changeStatus } from '../redux/actions';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.contTime = this.contTime.bind(this);
  }

  contTime() {
    let { timer, status, dispatchDecrementTime, dispatchChangeStatus } = this.props;
    switch (status) {
    case 'start':
      this.interval = setInterval(() => {
        timer -= 1;
        dispatchDecrementTime(timer);
      }, 1000);
      dispatchChangeStatus('running');
      break;

    case 'stop':
      clearInterval(this.interval);
      break;

    case 'reset':
      dispatchDecrementTime(30);
      dispatchChangeStatus('start');
      break;

    case 'running':
      if (timer <= 0) {
        dispatchChangeStatus('timeout');
      }
      break;

    case 'timeout':
      dispatchChangeStatus('stop');
      break;

    default:
      break;
    }
  }

  render() {
    this.contTime();
    const { timer } = this.props;
    return (
      <div>
        <h1>{ `Time: ${timer}` }</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.timer.timer,
  status: state.timer.status,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDecrementTime: (time) => dispatch(decrementTimer(time)),
  dispatchChangeStatus: (status) => dispatch(changeStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

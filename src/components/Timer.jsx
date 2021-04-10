import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTimerAction } from '../actions/index';

class Timer extends Component {
  componentDidMount() {

  }

  render() {
    const { timer } = this.props;

    return (
      <div>{ timer > 0 ? timer : 'Acabou o tempo!' }</div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.timerReducer.timer,
});

const mapDispatchToProps = (dispatch) => ({
  updateTimer: () => dispatch(updateTimerAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

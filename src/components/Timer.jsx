import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import btnStateAction from '../redux/Actions/btnStateAction';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 30,
    };

    this.setTime = this.setTime.bind(this);
    this.checkRestart = this.checkRestart.bind(this);
  }

  componentDidMount() {
    const interval = 1000;
    this.intervalId = setInterval(this.setTime, interval);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  setTime() {
    const { timer } = this.state;
    if ((timer) > 0) {
      this.checkRestart();
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
      const { countdown } = this.props;
      countdown(timer);
    }
  }

  checkRestart() {
    const { restartTime, timer } = this.props;
    if (restartTime === true) {
      this.setState({ timer: timer + 1 });
    }
  }

  render() {
    const { stateOfBtn } = this.props;
    const { timer } = this.state;
    if (timer < 1) {
      stateOfBtn(true);
    }
    return (
      <p>{timer}</p>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  stateOfBtn: (btnState) => dispatch(btnStateAction(btnState)),
});

Timer.propTypes = {
  stateOfBtn: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  restartTime: PropTypes.bool.isRequired,
  countdown: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Timer);

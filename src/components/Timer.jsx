import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import btnStateAction from '../redux/Actions/btnStateAction';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: props.timer,
      btnState: false,
    };

    this.SetTime = this.SetTime.bind(this);
  }

  componentDidMount() {
    this.SetTime();
  }

  SetTime() {
    const interval = 1000;
    this.timerID = setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) {
        this.setState((state) => ({ timer: state.timer - 1 }));
      } else if (timer <= 1) {
        this.setState({ btnState: true });
        clearInterval(this.timerID);
      }
    }, interval);
  }

  render() {
    const { stateOfBtn } = this.props;
    const { timer, btnState } = this.state;
    if (timer < 1) {
      stateOfBtn(btnState);
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
};

export default connect(null, mapDispatchToProps)(Timer);

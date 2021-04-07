import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timeOver } from '../redux/actions';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { time: 30 };
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  timer() {
    const magicSecond = 1000;
    const { finishTime } = this.props;

    const interval = setInterval(() => {
      const { time } = this.state;
      if (time > 0) {
        this.setState((state) => ({
          time: state.time - 1,
        }));
      } else {
        finishTime();
        clearInterval(interval);
      }
    }, magicSecond);
  }

  render() {
    const { time } = this.state;
    return (
      <div>
        Tempo:
        <p>{ time }</p>
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

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { decreaseTime } from '../actions/game';

class Timer extends React.Component {
  componentDidMount() {
    const { decreaseTimer } = this.props;
    const ONE_SECOND = 1000;
    this.localTimer = setInterval(() => {
      const { timer } = this.props;
      if (timer === 0) return;
      decreaseTimer();
    },
    ONE_SECOND);
  }

  componentWillUnmount() {
    clearInterval(this.localTimer);
  }

  render() {
    const { timer } = this.props;
    return (
      <p>{ timer }</p>
    );
  }
}

Timer.propTypes = {
  decreaseTimer: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.game.timer,
});

const mapDispatchToProps = (dispatch) => ({
  decreaseTimer: () => dispatch(decreaseTime()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);

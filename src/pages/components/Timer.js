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
    const { dispatchTimesUp } = this.props;
    if ((seconds > 0) && (prevState.seconds !== seconds)) {
      this.gameTimer();
    } else if ((seconds === 0) && (prevState.seconds !== seconds)) {
      dispatchTimesUp();
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
  dispatchTimesUp: () => dispatch(timesUp()),
});

Timer.propTypes = {
  dispatchTimesUp: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Timer);

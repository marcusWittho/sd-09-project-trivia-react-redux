import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_TIME = 30;
const ONE_SECOND = 1000;

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: DEFAULT_TIME,
      timeout: false,
    };
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const { counter, timeout } = this.state;
      const { stopTimer, setTimer } = this.props;
      if (counter > 0 && !stopTimer) {
        this.setState({ counter: counter - 1 });
      } else if (!stopTimer) {
        this.setState({ timeout: true });
      }
      if (timeout) {
        this.setState({ timeout: false });
        // clearInterval(this.timer);
        const { disableAnswers } = this.props;
        disableAnswers();
      }
      setTimer(counter);
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    this.resetTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  resetTimer() {
    const { reset, toggleReset } = this.props;
    if (reset) {
      this.setState({ counter: DEFAULT_TIME });
      toggleReset();
    }
  }

  render() {
    const { counter } = this.state;
    const showCounter = <span>{`Tempo restante: ${counter}`}</span>;
    const showTimeout = <span>Tempo Esgotado!</span>;
    return (
      <div>
        {counter > 0 ? showCounter : showTimeout}
      </div>
    );
  }
}

Timer.propTypes = {
  stopTimer: PropTypes.string,
  reset: PropTypes.bool,
  toggleReset: PropTypes.func,
}.isRequired;

export default Timer;

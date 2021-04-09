import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chronometer: 30,
    };
  }

  render() {
    const { chronometer } = this.state;
    const { timeOut, nextButton } = this.props;
    const updateTime = 1000;

    if (nextButton === true) {
      if (chronometer > 0) {
        setTimeout(() => {
          this.setState({
            chronometer: chronometer - 1,
          });
        }, updateTime);
      } else {
        timeOut();
        this.setState({
          chronometer: 30,
        });
      }
    }

    return (
      <div>
        <p>{ chronometer }</p>
      </div>
    );
  }
}

Timer.propTypes = {
  timeOut: PropTypes.func.isRequired,
  nextButton: PropTypes.bool.isRequired,
};

export default Timer;

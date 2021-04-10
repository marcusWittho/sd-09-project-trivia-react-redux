import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 30,
    };
    this.timerCaller = this.timerCaller.bind(this);
    this.checkCounter = this.checkCounter.bind(this);
  }

  componentDidMount() {
    this.timerCaller();
  }

  componentDidUpdate() {
    this.checkCounter();
  }

  checkCounter() {
    const { count } = this.state;
    if (count === 0) clearInterval(this.myInterval);
  }

  timerCaller() {
    const interval = 1000;
    this.myInterval = setInterval(() => {
      this.setState((prevState) => ({
        count: prevState.count - 1,
      }));
    }, interval);
  }

  render() {
    const { count } = this.state;
    const timeRelease = count.toString();
    localStorage.setItem('COUNTDOWN', timeRelease);
    return (
      <span className="timer">{ count }</span>
    );
  }
}

export default Timer;

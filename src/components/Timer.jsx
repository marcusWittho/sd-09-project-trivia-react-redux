import React from 'react';

const DEFAULT_TIME = 30;
const ONE_SECOND = 1000;

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: DEFAULT_TIME,
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const { counter } = this.state;
      if (counter > 0) {
        this.setState({ counter: counter - 1 });
      } else {
        clearInterval(this.timer);
      }
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { counter } = this.state;
    console.log(counter);
  }

  render() {
    const { counter } = this.state;
    const showCounter = <span>{`Tempo restante: ${counter}`}</span>;
    const showTimeout = <span>Tempo Esgotado!</span>;
    return (
      <p>
        {counter > 0 ? showCounter : showTimeout}
      </p>
    );
  }
}

export default Timer;

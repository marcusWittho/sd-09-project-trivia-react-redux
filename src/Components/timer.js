import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timeCounter } from '../redux/actions';

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
    const { getCounter } = this.props;
    const counter = localStorage.getItem('COUNTDOWN');
    getCounter(counter);
  }

  // quando o tempo chegar a 0 desabilita os botões de answer
  checkCounter() {
    const { count } = this.state;
    if (count === 0) clearInterval(this.myInterval);
  }

  // clearInterval(this.myInterval) >>>> precisa ser chamado no botão answer quando clicado
  // o tempo restante será usado para fazer a conta do score

  // essa funcção precisa ser chamada no botão next
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

const mapDispatchToProps = (dispatch) => ({
  getCounter: (number) => dispatch(timeCounter(number)),
});

export default connect(null, mapDispatchToProps)(Timer);

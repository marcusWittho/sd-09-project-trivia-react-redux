import React from 'react';
import Header from '../components/Header';

class FeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAnswers: 0,
      totalScore: 0,
    };
    this.getLocalStorage = this.getLocalStorage.bind(this);
    this.verifyAssertions = this.verifyAssertions.bind(this);
    this.scoreBoardGenerator = this.scoreBoardGenerator.bind(this);
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage() {
    const getStorageInfos = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions, score } } = getStorageInfos;
    this.setState({
      correctAnswers: assertions,
      totalScore: score,
    });
  }

  verifyAssertions() {
    const { correctAnswers } = this.state;
    const numberToCompare = 3;
    if (correctAnswers < numberToCompare) {
      return (
        <p data-testid="feedback-text">Podia ser melhor...</p>
      );
    }
    return (
      <p data-testid="feedback-text">Mandou bem!</p>
    );
  }

  scoreBoardGenerator() {
    const { correctAnswers, totalScore } = this.state;
    console.log(correctAnswers);
    console.log(totalScore);
    return (
      <div>
        <p data-testid="feedback-total-score">
          {totalScore}
        </p>
        <p data-testid="feedback-total-question">
          {correctAnswers}
        </p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">FeedBack</h1>
        <Header />
        { this.verifyAssertions() }
        { this.scoreBoardGenerator() }
      </div>
    );
  }
}

export default FeedBack;

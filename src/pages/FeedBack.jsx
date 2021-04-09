import React from 'react';
import Header from '../components/Header';

class FeedBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAnswers: 0,
    };
    this.getLocalStorage = this.getLocalStorage.bind(this);
    this.verifyAssertions = this.verifyAssertions.bind(this);
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage() {
    const getStorageInfos = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions } } = getStorageInfos;
    this.setState({ correctAnswers: assertions });
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

  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">FeedBack</h1>
        <Header />
        { this.verifyAssertions() }
      </div>
    );
  }
}

export default FeedBack;

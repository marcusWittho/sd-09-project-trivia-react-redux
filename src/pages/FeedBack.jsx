import React from 'react';
import Header from '../components/Header';

class FeedBack extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">FeedBack</h1>
        <Header />
      </div>
    );
  }
}

export default FeedBack;

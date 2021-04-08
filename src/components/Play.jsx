import React from 'react';
import Header from './PlayHeader';
import Timer from './Timer';

class Play extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Timer />
      </div>
    );
  }
}

export default Play;

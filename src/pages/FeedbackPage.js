import React from 'react';
import '../CSS/feedbackPage.css';
import Header from '../components/Header';

class feedbackPage extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">Boua!</p>
      </div>
    );
  }
}

export default feedbackPage;

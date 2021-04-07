import React, { Component } from 'react';
import UserData from '../Component/UserData';

class Feedback extends Component {
  render() {
    return (
      <div>
        <UserData />
        <h2 data-testid="feedback-text">
          Feedback
        </h2>
      </div>
    );
  }
}

export default Feedback;

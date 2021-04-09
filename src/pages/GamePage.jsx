import React, { Component } from 'react';
import { FeedbackHeader, Questions } from '../components';

export default class Game extends Component {
  render() {
    return (
      <div>
        <FeedbackHeader />
        <Questions />
      </div>
    );
  }
}

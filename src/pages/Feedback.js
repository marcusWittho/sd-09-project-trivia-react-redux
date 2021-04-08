import React from 'react';
import HeaderFeedback from '../components/HeaderFeedback';
import MessageFeedback from '../components/MenssageFeedback';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <HeaderFeedback />
        <MessageFeedback />
      </div>
    );
  }
}

export default Feedback;

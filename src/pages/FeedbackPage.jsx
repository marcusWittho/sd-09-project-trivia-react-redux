import React from 'react';
import HeaderFeedBack from '../components/HeaderFeedBack';
import MainFeedBack from '../components/MainFeedBack';

class FeedbackPage extends React.Component {
  render() {
    return (
      <>
        <HeaderFeedBack />
        <MainFeedBack />
      </>
    );
  }
}

export default FeedbackPage;

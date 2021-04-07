import React from 'react';
import { connect } from 'react-redux';
import FeedbackHeader from '../components/FeedbackHeader';

class FeedbackPage extends React.Component {
  render() {
    return (
      <FeedbackHeader />
    );
  }
}

export default connect(mapDispatchToPorps)(FeedbackPage);

import React from 'react';
import { connect } from 'react-redux';
import FeedBackHeader from '../components/FeedbackHeader';

class Header extends React.Component {
  render() {
    return (
      <FeedBackHeader />
    );
  }
}

export default connect(mapStateToProps)(Header);

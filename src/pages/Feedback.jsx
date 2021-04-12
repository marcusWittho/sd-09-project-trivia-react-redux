import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import PlayAgainBtn from '../components/PlayAgainBtn';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Link to="/">
          <PlayAgainBtn />
        </Link>
      </div>
    );
  }
}

export default Feedback;

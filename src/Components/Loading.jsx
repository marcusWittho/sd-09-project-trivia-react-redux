import React, { Component } from 'react';
import '../Styles/Components/Loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="container">
        <h3>Loading</h3>
        <div className="loading">
          <span className="loadShard" />
          <span className="loadShard" />
          <span className="loadShard" />
          <span className="loadShard" />
        </div>
      </div>
    );
  }
}

export default Loading;

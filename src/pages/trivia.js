import React from 'react';
import Header from '../components/header';

class trivia extends React.Component {
  render() {
    return (
      <div className="App">
        <Header profile="teste" player="teste" score={ 7 } />
        <h1>Trivia</h1>
      </div>
    );
  }
}

export default trivia;

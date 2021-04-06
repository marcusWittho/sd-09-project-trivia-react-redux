import React from 'react';
import logo from './trivia.png';
import Login from './components/Login';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>
            <Login />
          </p>
        </header>
      </div>
    );
  }
}

export default App;

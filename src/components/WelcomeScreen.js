import React from 'react';
import logo from '../trivia.png';

export default function WelcomeScreen() {
  return (
    <div className="App">
      <section className="App-header">
        <img src={ logo } className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>
      </section>
    </div>
  );
}

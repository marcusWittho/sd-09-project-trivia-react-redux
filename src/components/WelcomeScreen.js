import React from 'react';
import logo from '../trivia.png';

export default function WelcomeScreen() {
  return (
    <section className="welcome-screen">
      <img src={ logo } className="trivia-logo" alt="logo" />
      <p>
        SUA VEZ
      </p>
    </section>
  );
}

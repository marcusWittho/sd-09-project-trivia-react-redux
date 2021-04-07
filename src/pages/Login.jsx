import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';

export default class Login extends Component {
  render() {
    return (
      <main className="login-container">
        <h1>Login</h1>
        <LoginForm />
      </main>
    );
  }
}

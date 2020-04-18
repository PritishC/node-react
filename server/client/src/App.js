import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"></img>
        <h2>Hi there</h2>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer"> Learn React </a>
        <a className="App-link" href="http://localhost:5000/auth/google">Sign In With Google</a>
      </header>
    </div>
  );
}

export default App;

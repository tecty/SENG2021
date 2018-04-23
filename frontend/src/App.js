import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map/Map';
import NewPostButton from './components/NewPostButton/NewPostButton';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Siround</h1>
        </header>
        <Map />
        <NewPostButton />
      </div>
    );
  }
}

export default App;

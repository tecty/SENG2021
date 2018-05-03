import React, { Component } from 'react';
// import logo from './logo.png';
import './App.css';
import Map from './components/Map/Map';
import AppMenu from './components/AppMenu/AppMenu';
import UserButton from './components/UserButton/UserButton';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppMenu />
        <UserButton />
        <Map />
      </div>
    );
  }
}

export default App;

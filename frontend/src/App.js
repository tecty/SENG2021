import React, { Component } from 'react';
// import logo from './logo.png';
import './App.css';
import Map from './components/Map/Map';
import AppMenu from './components/AppMenu/AppMenu';
import UserButton from './components/UserButton/UserButton';
// import LocationSearchInput from './components/LocationSearchInput/LocationSearchInput';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppMenu />
        <UserButton />
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> SiRound</h1>
        </header> */}
        {/* <LocationSearchInput /> */}
        <Map />
      </div>
    );
  }
}

export default App;

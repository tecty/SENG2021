import React, { Component } from 'react';
// import logo from './logo.png';
import './App.css';
import Map from './components/Map/Map';
import AppMenu from './components/AppMenu/AppMenu';
import UserButton from './components/UserButton/UserButton';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class App extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      authorized: false,
    }
  }

  handleAuthorizedChanged = (authorized) => {
    this.setState({
      authorized: authorized,
    })
  }

  render() {
    const path = this.props.location.pathname.split('/');
    const { authorized } = this.state;
    return (
      <div className="App">
        <AppMenu 
          page={path[1] ? path[1] : 'home'}
        />
        <UserButton 
          authorized={authorized}
          handleAuthorizedChanged={this.handleAuthorizedChanged}
        />
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> SiRound</h1>
        </header> */}
        {/* <LocationSearchInput /> */}
        {/* <Map/> */}
        <Switch>
          <Route exact path='/'/>
          <Route path='/map'>
            <Map authorized={authorized}/>
          </Route>
        </Switch>
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;

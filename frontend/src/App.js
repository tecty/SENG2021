import React, { Component } from 'react';
// import logo from './logo.png';
import './App.css';
import Map from './components/Map/Map';
import AppMenu from './components/AppMenu/AppMenu';
import UserButton from './components/UserButton/UserButton';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import auth from './utils/auth';
import url from './utils/url';

class App extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    // const key = window.location.href.match(/token=([^&]*)/);
    // const token = key ? key[1] : null;

    auth.getUserStatus().then(detail =>{
      this.setState({ 
        authorized: detail.authorized,
        user: detail.user,
      });
    })
    this.state = {
  //     token: token,
    }
  //  // auth.getUserStatus(this.state.key[1]).then
  }

  handleTokenChanged = () => {
    window.location = `${url.get()}${this.props.location.pathname}`;
  }

  render() {
    const path = this.props.location.pathname.split('/');
    // const token = (this.state.token) ? `?token=${this.state.token}`: "";
    const { authorized, user } = this.state;
    return (
      <div className="App">
        <AppMenu 
          page={path[1] ? path[1] : 'home'}
          // token={token}
        />
        <UserButton 
          handleTokenChanged={this.handleTokenChanged}
          authorized={authorized}
          user={user}
          // authorized={this.state.authorized}
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
            <Map authorized={authorized} user={user}/>
          </Route>
          <Route path='/about_us' />
        </Switch>
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;

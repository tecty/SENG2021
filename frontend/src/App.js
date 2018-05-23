import React, { Component } from 'react';
import './App.css';
import Map from './components/Map/Map';
import AppMenu from './components/AppMenu/AppMenu';
import UserButton from './components/UserButton/UserButton';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import auth from './utils/auth';
import url from './utils/url';
import AboutUs from './components/AboutUs/AboutUs';
import HomePage from './components/HomePage/HomePage';
import FooterPage from './components/FooterPage/FooterPage';
import HelpPage from './components/HelpPage/HelpPage';

class App extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    auth.getUserStatus().then(detail =>{
      this.setState({ 
        authorized: detail.authorized,
        user: detail.user,
      });
    })
    this.state = {}
  }

  handleTokenChanged = () => {
    window.location = `${url.get()}${this.props.location.pathname}`;
  }

  render() {
    const path = this.props.location.pathname.split('/');
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
        />
        <Switch>
          <Route exact path='/'>
            <div>
              <HomePage />
              <FooterPage />
            </div>
          </Route>
          <Route path='/map'>
            <Map authorized={authorized} user={user}/>
          </Route>
          <Route path='/about_us' >
            <div>
              <AboutUs />
              <FooterPage />
            </div>
          </Route>
          <Route page='/help' >
            <div>
              <HelpPage />
              <FooterPage />
            </div>
          </Route>
        </Switch>
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);
export default AppWithRouter;

import React from 'react';
// import logo from './logo.png';
import './App.css';
import Map from './components/Map/Map';
import AppMenu from './components/AppMenu/AppMenu';
import UserButton from './components/UserButton/UserButton';
import { Switch, Route, withRouter } from 'react-router-dom';
// import LocationSearchInput from './components/LocationSearchInput/LocationSearchInput';

const App = withRouter((props) => {
  const path = props.location.pathname.split('/');
  let state = {
    page: path[1] ? path[1] : 'home',
    authorized: false,
  }

  const handlePageChanged = page => {
    state = ({
      page: page,
    })
  }

  return (
    <div className="App">
      <AppMenu 
        page={state.page}
        onPageChanged={handlePageChanged}
      />
      <UserButton 
        authorized={state.authorized}
      />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title"> SiRound</h1>
      </header> */}
      {/* <LocationSearchInput /> */}
      {/* <Map/> */}
      <Switch>
        <Route exact path='/'/>
        <Route path='/map' component={Map}/>
      </Switch>
    </div>
  );
})
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       page: 'home',
//     }
//     this.handlePageChanged = this.handlePageChanged.bind(this);
//   }

//   handlePageChanged(page) {
//     this.setState({
//       page: page,
//     })
//   }

//   render() {
//     return (
//       <div className="App">
//         {console.log(this.props.location)}
//         <AppMenu 
//           page={this.state.page}
//           onPageChanged={this.handlePageChanged}
//         />
//         <UserButton />
//         {/* <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title"> SiRound</h1>
//         </header> */}
//         {/* <LocationSearchInput /> */}
//         {/* <Map/> */}
//         <Switch>
//           <Route exact path='/'/>
//           <Route path='/map' component={Map}/>
//         </Switch>
//       </div>
//     );
//   }
// }

export default App;

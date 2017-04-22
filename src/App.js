import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Machines from './Machines';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="app">
      <div className="header"></div>
      <div className="body-container">
        <div className="side-menu gray">
          <div className="side-menu-content">
            {/*<NavLink exact to='/' ><div className="side-button">HOME</div></NavLink>*/}
            <NavLink to='/machines'><div className="side-button">MACHINES</div></NavLink>
            <NavLink to='/materials'><div className="side-button">MATERIALS</div></NavLink>
            <NavLink to='/routing'><div className="side-button">ROUTING</div></NavLink>
            <NavLink to='/enter_order'><div className="side-button">CREATE ORDER</div></NavLink>
            <NavLink to='/execute_order'><div className="side-button">EXECUTE ORDER</div></NavLink>
          </div>
        </div>
        <div className="content">

          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/machines" component={Machines} />
            <Route exact path="/materials" component={Home} />
            <Route exact path="/routing" component={Home} />
            <Route exact path="/enter_order" component={Home} />
            <Route exact path="/execute_order" component={Home} />
          </div>

        </div>
      </div>

      <div className="footer"></div>
      </div>
      </Router>
    );
  }
}

export default App;

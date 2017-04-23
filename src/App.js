import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Machines from './Machines';
import Materials from './Materials';
import Routings from './Routings';

var dummyMachines = [
  {
    _id: 0,
    machineName: "machine1",
    machineDescription: "description1",
    parameters: [{parameterName: "p1", parameterDefaultName: "v1"}]
  },
  {
    _id: 1,
    machineName: "machine2",
    machineDescription: "description2",
    parameters: [{parameterName: "p2", parameterDefaultName: "v2"}]
  }
];

var dummyMaterials = [
  {
    materialName: "material1",
    materialDescription: "description1",
    parameters: [{parameterName: "p1", parameterDefaultName: "v1"}]
  },
  {
    materialName: "material2",
    materialDescription: "description2",
    parameters: [{parameterName: "p2", parameterDefaultName: "v2"}]
  }
];

var dummyRoutings = [
  {
    routingName: "roiting1",
    routingDescription: "description1",
    routingVersion: 1,
    operations: []
  },
  {
    routingName: "roiting1.1",
    routingDescription: "description1.1",
    routingVersion: 2,
    operations: []
  },
  {
    routingName: "roiting2",
    routingDescription: "description2",
    routingVersion: 1,
    operations: []
  }
];

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
            <NavLink to='/orders'><div className="side-button">ORDERS</div></NavLink>
            <NavLink to='/routings'><div className="side-button">ROUTINGS</div></NavLink>
            <NavLink to='/machines'><div className="side-button">MACHINES</div></NavLink>
            <NavLink to='/materials'><div className="side-button">MATERIALS</div></NavLink>
          </div>
        </div>
        <div className="content">

          <div>
            <Route exact path="/" component={Home}/>
            <Route  path="/machines" render={routeProps => <Machines route={routeProps} machines={dummyMachines}/>}/>
            <Route  path="/materials" render={routeProps => <Materials route={routeProps} materials={dummyMaterials}/>} />
            <Route  path="/routings" render={routeProps => <Routings route={routeProps} routings={dummyRoutings} materials={dummyMaterials} machines={dummyMachines}/>} />
            <Route  path="/orders" component={Home} />
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

import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Machines from './Machines';
import Materials from './Materials';

var dummyMachines = [
  {
    machineName: "machine1",
    machineDescription: "description1",
    parameters: [{parameterName: "p1", parameterDefaultName: "v1"}]
  },
  {
    machineName: "machine2",
    machineDescription: "description2",
    parameters: [{parameterName: "p2", parameterDefaultName: "v2"}]
  },
  {
    machineName: "machine3",
    machineDescription: "description3",
    parameters: [{parameterName: "p3", parameterDefaultName: "v3"}]
  },
  {
    machineName: "machine4",
    machineDescription: "description4",
    parameters: [{parameterName: "p4", parameterDefaultName: "v4"}]
  },
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
  },
  {
    materialName: "material3",
    materialDescription: "description3",
    parameters: [{parameterName: "p3", parameterDefaultName: "v3"}]
  },
  {
    materialName: "material4",
    materialDescription: "description4",
    parameters: [{parameterName: "p4", parameterDefaultName: "v4"}]
  },
]

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
            <Route exact path="/" component={Home}/>
            <Route exact path="/machines" render={routeProps => <Machines route={routeProps} machines={dummyMachines}/>}/>
            <Route exact path="/materials" render={routeProps => <Materials route={routeProps} materials={dummyMaterials}/>} />
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

import React, { Component } from 'react';
import PlusIcon from 'react-icons/lib/io/android-add';
import SaveIcon from 'react-icons/lib/fa/check';
import MinusIcon from 'react-icons/lib/io/android-close';


import './Machines.css';

class Machines extends Component {

  constructor() {
    super();
    this.state = {
      machines: [],
      currentMachine: null
    };

    // Bindings
    this.handleNewMachineAddButton = this.handleNewMachineAddButton.bind(this);
    this.handleCurrentMachineCancelButton = this.handleCurrentMachineCancelButton.bind(this);
    this.handleCurrentMachineOkButton = this.handleCurrentMachineOkButton.bind(this);
    this.handleCurrentMachineAddParameterButton = this.handleCurrentMachineAddParameterButton.bind(this);
  }

  handleNewMachineAddButton(){
    this.setState({
      currentMachine:{
        machineName: "ciao",
        parameters: []
      }
    });
  }

  handleCurrentMachineCancelButton(){
    this.setState({
      currentMachine: null
    });
  }

  handleCurrentMachineOkButton(){
    var _currentMachine = this.state.currentMachine;
    var _machines = this.state.machines;

    _currentMachine.machineName = _currentMachine.machineName.value
    _currentMachine.parameters.map(function(p){
      p.parameterName=p.parameterName.value;
      p.parameterDefaultName= p.parameterDefaultName.value;
    })

    // check if the element is already within the array, if yes
    _machines.push(_currentMachine);

    this.setState({
      machines: _machines,
      currentMachine: null
    });
  }

  handleCurrentMachineAddParameterButton(){
    var _currentMachine = this.state.currentMachine;
    _currentMachine.parameters.push({parameterName: "", parameterDefaultName: ""});
    this.setState({
      currentMachine: _currentMachine
    });
  }

  render() {

    // Current machine
    var currentMachineParameters = [];
    if(this.state.currentMachine){
      this.state.currentMachine.parameters.forEach(function(p, i){
        currentMachineParameters.push(
          <div key={i}>
            <div className="input-group col">
              <span className="input-group-addon" id="basic-addon3">Parameter name</span>
              <input ref={(input) => {p.parameterName = input}} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
            </div>
            <div className="input-group col">
              <span className="input-group-addon" id="basic-addon3">Default value</span>
              <input ref={(input) => {p.parameterDefaultName = input}} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
            </div>
          </div>
        )
      })
    }

    // Machines
    var currentMachines = [];
    this.state.machines.forEach(function(m, i){
      currentMachines.push(<div key={i}>{m.machineName}</div>)
    })


    return (
      <div>
        <div className="align-right gray">
          <div className="inline-button" onClick={this.handleNewMachineAddButton}><span className="icon-io"><PlusIcon /></span>New Machine</div>
        </div>

        {this.state.currentMachine !== null &&
        <div className="container-base">
          <div className="header gray">MACHINE DETAILS</div>

          <div className="input-group">
            <span className="input-group-addon" id="basic-addon3">Machine name</span>
            <input ref={(input) => {if(this.state.currentMachine !== null) this.state.currentMachine.machineName = input}} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
          </div>

          <div className="machine-param-container">

              {currentMachineParameters}

          </div>

          <div className="generic-button" onClick={this.handleCurrentMachineAddParameterButton}><span className="icon-io"><PlusIcon /></span> Add parameter</div>

          <div className="align-center">
            <div className="positive-button" onClick={this.handleCurrentMachineOkButton}><span className="icon-fa"><SaveIcon /></span> Save</div>
            <div className="negative-button" onClick={this.handleCurrentMachineCancelButton}><span className="icon-io"><MinusIcon /></span> Cancel</div>
          </div>
        </div>
      }


        <div className="container-base">
          <div className="header gray">MACHINES</div>
          {currentMachines}
        </div>
      </div>
    );
  }
}

export default Machines;

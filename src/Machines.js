import React, { Component } from 'react';
import PlusIcon from 'react-icons/lib/io/android-add';
import SaveIcon from 'react-icons/lib/fa/check';
import MinusIcon from 'react-icons/lib/io/android-close';
import MoreIcon from 'react-icons/lib/io/android-more-vertical';
import EditIcon from 'react-icons/lib/io/edit';
import CloseIcon from 'react-icons/lib/io/close';
import './Machines.css';

class Machines extends Component {

  constructor() {
    super();
    this.state = {
      machines: [],
      currentMachine: null,
      currentMachineBackup: null,
    };

    // Bindings
    this.handleNewMachineAddButton = this.handleNewMachineAddButton.bind(this);
    this.handleCurrentMachineCancelButton = this.handleCurrentMachineCancelButton.bind(this);
    this.handleCurrentMachineOkButton = this.handleCurrentMachineOkButton.bind(this);
    this.handleCurrentMachineAddParameterButton = this.handleCurrentMachineAddParameterButton.bind(this);
    this.handleCurrentMachineNameChange = this.handleCurrentMachineNameChange.bind(this);
  }

  /* Current element events --------------------------------------------------*/
  handleCurrentMachineNameChange(newValue){
    var _currentMachine = this.state.currentMachine;
    _currentMachine.machineName = newValue.target.value;
    this.setState({currentMachine: _currentMachine});
  }

  handleCurrentMachineParameterNameChange(newValue, i){
    var _currentMachine = this.state.currentMachine;
    _currentMachine.parameters[i].parameterName = newValue.target.value;
    this.setState({currentMachine: _currentMachine});
  }

  handleCurrentMachineParameterDefaultValueChange(newValue, i){
    var _currentMachine = this.state.currentMachine;
    _currentMachine.parameters[i].parameterDefaultName = newValue.target.value;
    this.setState({currentMachine: _currentMachine});
  }

  handleCurrentMachineParameterDeleting(e, i){
    var _currentMachine = this.state.currentMachine;
    if (i > -1) {
      _currentMachine.parameters.splice(i, 1);
    }
    this.setState({currentMachine: _currentMachine});
  }

  handleCurrentMachineCancelButton(){
    this.setState({
      currentMachine: null
    });
  }

  handleCurrentMachineOkButton(){
    var _currentMachine = this.state.currentMachine;
    var _machines = this.state.machines;

    // If name null return
    if(_currentMachine.machineName.length === 0){
      this.setState({
        machines: _machines,
        currentMachine: null
      });
      return;
    }

    var filteredParameters = [];
    _currentMachine.parameters.forEach(function(p){
      if(p.parameterName !== "")
        {
          filteredParameters.push(p);
        }
    });

    _currentMachine.parameters = filteredParameters;

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

  /* List events --------------------------------------------------*/
  handleMachineEditButton(e, data){
    var newObj = {machineName: data.machineName, parameters: data.parameters}
    this.setState({
      currentMachine: newObj
    });
  }

  /* Generic events --------------------------------------------------*/
  handleNewMachineAddButton(){
    this.setState({
      currentMachine:{
        machineName: "",
        parameters: []
      }
    });
  }

  render() {

    // Current machine
    var currentMachineParameters = [];
    if(this.state.currentMachine){
      this.state.currentMachine.parameters.forEach(function(p, i){
        currentMachineParameters.push(
          <div key={i} className="parameter-row">
            <div className="current-machine-main-col">
              <div className="input-group col">
                <span className="input-group-addon" id="basic-addon3">Parameter name</span>
                <input value={p.parameterName} onChange={((e) => this.handleCurrentMachineParameterNameChange(e, i))} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
              </div>
              <div className="input-group col">
                <span className="input-group-addon" id="basic-addon3">Default value</span>
                <input value={p.parameterDefaultName} onChange={((e) => this.handleCurrentMachineParameterDefaultValueChange(e, i))} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
              </div>
            </div>
            <div className="current-machine-button-col">
              <div className="current-machine-icon-button" onClick={((e) => this.handleCurrentMachineParameterDeleting(e, i))}>
                <span className="icon-io"><CloseIcon /></span>
              </div>

            </div>
          </div>
        )
      }.bind(this))
    }

    // Machines
    var currentMachines = [];
    this.state.machines.forEach(function(m, i){

      var parametersDiv=[];

      m.parameters.forEach(function(p, i){
        parametersDiv.push(<div key={i}>
          <div className="col">
            {p.parameterName}
          </div>
          <div className="col" >
            {p.parameterDefaultName}
          </div>

          </div>);
      })

      currentMachines.push(
        <div key={i}>
          <div className="generic-row">
            <div className="generic-main-col">
              <span className="machine-name">{m.machineName}</span>
            </div>
            <div className="generic-button-col">
              <div className="icon-button" >
                <span className="icon-io"><MoreIcon /></span>
              </div>
              <div className="icon-button" onClick={((e) => this.handleMachineEditButton(e, m))}>
                <span className="icon-io"><EditIcon /></span>
              </div>
            </div>
          </div>

          <div className="parameter-table">
            <div className="generic-row gray">
              <div className="col">
                Parameter name
              </div>
              <div className="col" >
                Parameter default value
              </div>
            </div>
            {parametersDiv}
          </div>
        </div>)
    }.bind(this))


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
            <input value={this.state.currentMachine.machineName} onChange={this.handleCurrentMachineNameChange} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
          </div>

          <div className="machine-param-container">
              {currentMachineParameters}
          </div>

          <div className="form-button" onClick={this.handleCurrentMachineAddParameterButton}><span className="icon-io"><PlusIcon /></span> Add parameter</div>

          <div className="align-center">
            <div className="positive-button" onClick={this.handleCurrentMachineOkButton}><span className="icon-fa"><SaveIcon /></span> Save</div>
            <div className="negative-button" onClick={this.handleCurrentMachineCancelButton}><span className="icon-io"><MinusIcon /></span> Cancel</div>
          </div>
        </div>
      }


        <div className="container-base">
          <div className="header gray">MACHINES</div>
          <div className="generic-table">
            <div className="generic-row gray">
              <div className="generic-main-col">
                Name
              </div>
              <div className="generic-button-col" >
                Actions
              </div>
            </div>
            {currentMachines}
          </div>
        </div>
      </div>
    );
  }
}

export default Machines;

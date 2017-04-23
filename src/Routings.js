import React, { Component } from 'react';
import PlusIcon from 'react-icons/lib/io/android-add';
import SaveIcon from 'react-icons/lib/fa/check';
import MinusIcon from 'react-icons/lib/io/android-close';
import MoreIcon from 'react-icons/lib/io/android-more-vertical';
import EditIcon from 'react-icons/lib/io/edit';
import CloseIcon from 'react-icons/lib/io/close';
import $ from 'jquery';

import './Routings.css';

class Routings extends Component {

  constructor(props) {
    super(props);

    // Add expanded flag to elements
    this.props.routings.forEach(function(m){
      m.expanded = false;
    });

    this.elementPrototype = {
      routingName: "",
      routingDescription: "",
      routingVersion: 1,
      routingMaterial: null,
      operations: []
    }

    this.operationPrototype = {
      operationName: "",
      operationDescription: "",
      operationMachine: null
    }

    this.state = {
      routings: this.props.routings,
      currentElement: null,
    };

    // Bindings
    this.handleNewElementAddButton = this.handleNewElementAddButton.bind(this);
    this.handleCurrentElementCancelButton = this.handleCurrentElementCancelButton.bind(this);
    this.handleCurrentElementOkButton = this.handleCurrentElementOkButton.bind(this);
    this.handleCurrentElementMachineAddParameterButton = this.handleCurrentElementMachineAddParameterButton.bind(this);
    this.handleCurrentElementAddOperationButton = this.handleCurrentElementAddOperationButton.bind(this);
    this.handleCurrentElementNameChange = this.handleCurrentElementNameChange.bind(this);
    this.handleCurrentElementDescriptionChange = this.handleCurrentElementDescriptionChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({machines: nextProps.machines});
  }

  /* Current element events --------------------------------------------------*/
  handleCurrentElementNameChange(newValue){
    var _currentElement = this.state.currentElement;
    _currentElement.routingName = newValue.target.value;
    this.setState({currentElement: _currentElement});
  }

  handleCurrentElementDescriptionChange(newValue){
    var _currentElement = this.state.currentElement;
    _currentElement.routingDescription = newValue.target.value;
    this.setState({currentElement: _currentElement});
  }

  handleCurrentElementOperationNameChange(newValue, i){
    var _currentElement = this.state.currentElement;
    _currentElement.operations[i].operationName = newValue.target.value;
    this.setState({currentElement: _currentElement});
  }

  handleCurrentElementOperationDescriptionChange(newValue, i){
    var _currentElement = this.state.currentElement;
    _currentElement.operations[i].operationDescription = newValue.target.value;
    this.setState({currentElement: _currentElement});
  }

  handleCurrentElementOperationDeleting(e, i){
    var _currentElement = this.state.currentElement;
    if (i > -1) {
      _currentElement.operations.splice(i, 1);
    }
    this.setState({currentElement: _currentElement});
  }

  handleCurrentElementCancelButton(){
    this.setState({
      currentElement: null
    });
  }

  handleCurrentElementOkButton(){
    var _currentElement = this.state.currentElement;
    var _elements = this.state.routings;

    // If name null return
    if(_currentElement.routingName.length === 0 || _currentElement.routingMaterial === null){
      this.setState({
        elements: _elements,
        currentElement: null
      });
      console.log("saving rejected: routing name or material empty.");
      return;
    }

    var filteredOperations = [];
    _currentElement.operations.forEach(function(o){
      if(o.operationName !== "" && o.operationMachine !== null)
        {
          var filteredParameters = [];
          o.operationMachine.parameters.forEach(function(p){
            if(p.parameterName != ""){
              filteredParameters.push(p)
            }
          })
          o.operationMachine.parameters=filteredParameters;
          filteredOperations.push(o);
        }
    });
    _currentElement.operations = filteredOperations;

    // check if the element is already within the array, if yes
    _elements.push(_currentElement);

    console.log("Saving:")
    console.log(_currentElement);

    this.setState({
      elements: _elements,
      currentElement: null
    });
  }

  handleCurrentElementAddOperationButton(){
    var _currentElement = this.state.currentElement;
    var newObject = $.extend(true, {}, this.operationPrototype);
    _currentElement.operations.push(newObject);
    this.setState({
      currentElement: _currentElement
    });
  }

  handleCurrentElementMaterialChange(newValue){
    var selectedMaterialObj = this.props.materials.find(function(m){
      return m._id == newValue.target.value;
    })

    var _currentElement = this.state.currentElement;

    if(selectedMaterialObj){
      var materialCloned = $.extend(true, {}, selectedMaterialObj);
      _currentElement.routingMaterial = materialCloned;
    }else{
      _currentElement.routingMaterial = null;
    }

    this.setState({
      currentElement: _currentElement
    });
  }

  handleCurrentElementOperationMachineChange(newValue, i){
    var selectedMachineObj = this.props.machines.find(function(m){
      return m._id == newValue.target.value;
    })

    var _currentElement = this.state.currentElement;

    if(selectedMachineObj){
      var machineCloned = $.extend(true, {}, selectedMachineObj);
      _currentElement.operations[i].operationMachine = machineCloned;
    }else{
      _currentElement.operations[i].operationMachine = null;
    }

    this.setState({
      currentElement: _currentElement
    });
  }

  handleCurrentElementMachineParameterDeleting(e, machineParameterIndex, operationIndex){
    if(machineParameterIndex > -1){
      var _currentElement = this.state.currentElement;
      _currentElement.operations[operationIndex].operationMachine.parameters.splice(machineParameterIndex, 1);
      this.setState({
        currentElement: _currentElement
      });
    }
  }

  handleCurrentElementMachineParameterNameChange(e, machineParameterIndex, operationIndex){
      var _currentElement = this.state.currentElement;
      _currentElement.operations[operationIndex].operationMachine.parameters[machineParameterIndex].parameterName = e.target.value;

      this.setState({
        currentElement: _currentElement
      });
  }

  handleCurrentElementMachineParameterValueChange(e, machineParameterIndex, operationIndex){
      var _currentElement = this.state.currentElement;
      _currentElement.operations[operationIndex].operationMachine.parameters[machineParameterIndex].parameterDefaultName = e.target.value;

      this.setState({
        currentElement: _currentElement
      });
  }

  handleCurrentElementMachineAddParameterButton(e, operationIndex){
      var _currentElement = this.state.currentElement;
      _currentElement.operations[operationIndex].operationMachine.parameters.push({parameterName: "", parameterDefaultName: ""});

      this.setState({
        currentElement: _currentElement
      });
  }

  /* List events --------------------------------------------------*/
  handleElementEditButton(e, data){
    var newObject = $.extend(true, {}, data);
    newObject.routingVersion += 1;
    this.setState({
      currentElement: newObject
    });
  }

  handleElementDeleteButton(e, data){
    console.log("delete element");
  }

  handleElementMoreButton(e, index){
    var _machines = this.state.routings;

    if(_machines[index].expanded){
      _machines[index].expanded=false;
    }else{
      _machines[index].expanded=true;
    }

    this.setState({
      machines: _machines
    });

  }

  /* Generic events --------------------------------------------------*/
  handleNewElementAddButton(){
    var newObject = $.extend(true, {}, this.elementPrototype);
    this.setState({
      currentElement: newObject
    });
  }

  /* element generatros*/
  generateMachineParameters(operationIndex){
    var selectedMachineObj = this.state.currentElement.operations[operationIndex].operationMachine;
    var parametersDiv = [];
    selectedMachineObj.parameters.forEach(function(p, i){
      parametersDiv.push(
        <div key={i} className="parameter-row">
          <div className="current-machine-main-col">
            <div className="input-group col">
              <span className="input-group-addon" id="basic-addon3">Parameter name</span>
              <input value={p.parameterName} onChange={((e) => this.handleCurrentElementMachineParameterNameChange(e, i, operationIndex))} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
            </div>
            <div className="input-group col">
              <span className="input-group-addon" id="basic-addon3">Parameter value</span>
              <input value={p.parameterDefaultName} onChange={((e) => this.handleCurrentElementMachineParameterValueChange(e, i, operationIndex))} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
            </div>
          </div>
          <div className="current-machine-button-col">
            <div className="current-machine-icon-button" onClick={((e) => this.handleCurrentElementMachineParameterDeleting(e, i, operationIndex))}>
              <span className="icon-io"><CloseIcon /></span>
            </div>

          </div>
        </div>
      );
    }.bind(this))

    return parametersDiv;
  }

  generateMachineParametersReadOnly(operation){
    var parametersDiv = [];
    operation.operationMachine.parameters.forEach(function(p, i){
      parametersDiv.push(
        <div key={i} className="generic-row">
          <div className="col">
            {p.parameterName}
          </div>
          <div className="col" >
            {p.parameterDefaultName}
          </div>
        </div>
      )
    });
    return parametersDiv;
  }

  generateMachineDropDown(operation){
    // available machines
    var availableMachinesData = $.extend(true, [], this.props.machines);
    var availableMachines = [];

    if(!operation.operationMachine){
      availableMachinesData.unshift({
        _id: -1,
        machineName: "Select machine",
        machineDescription: "",
        parameters: []
      })
    }

    availableMachinesData.forEach(function(m, i){
      var elementToPush = <option key={i} value={m._id}>{m.machineName}</option>;

      if(operation.operationMachine && m._id === operation.operationMachine._id){
        elementToPush = <option key={i} selected="selected" value={m._id}>{m.machineName}</option>
      }

      availableMachines.push(
        elementToPush
      )
    })

    return availableMachines;
  }

  generateMaterialsDropDown(routing){
    // available machines
    var availableMaterialsData = $.extend(true, [], this.props.materials);
    var availableMaterials = [];

    if(!routing.routingMaterial){
      availableMaterialsData.unshift({
        _id: -1,
        materialName: "Select material",
        materialDescription: "",
      })
    }

    availableMaterialsData.forEach(function(m, i){
      var elementToPush = <option key={i} value={m._id}>{m.materialName}</option>;

      if(routing.routingMaterial && m._id === routing.routingMaterial._id){
        elementToPush = <option key={i} selected="selected" value={m._id}>{m.materialName}</option>
      }

      availableMaterials.push(
        elementToPush
      )
    })

    return availableMaterials;
  }

  render() {

    // Current element
    var currentElementOperations = [];
    if(this.state.currentElement){
      this.state.currentElement.operations.forEach(function(o, i){
        currentElementOperations.push(
          <div key={i} className="operation-row">
            <div className="current-machine-main-col">
              <div className="form-lateral-header">{o.operationName ? (
                  o.operationName
                ) : (
                   "New Operation"
                )
              }</div>
              <div className="input-group col">
                <span className="input-group-addon" id="basic-addon3">Operation name</span>
                <input value={o.operationName} onChange={((e) => this.handleCurrentElementOperationNameChange(e, i))} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
              </div>
              <div className="input-group col">
                <span className="input-group-addon">Operation machine</span>
                <select className="form-control" style={{ WebkitAppearance: "none"}} onChange={((e) => this.handleCurrentElementOperationMachineChange(e, i))}>
                  {this.generateMachineDropDown(o)}
                </select>
              </div>
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon3">Operation description</span>
                <input value={o.operationDescription} onChange={((e) => this.handleCurrentElementOperationDescriptionChange(e, i))} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
              </div>
              {o.operationMachine &&
                <div className="parameter-table">
                  <div className="form-lateral-header">{o.operationMachine.machineName} parameters</div>
                  {this.generateMachineParameters(i)}
                  <div className="form-button" onClick={((e) => this.handleCurrentElementMachineAddParameterButton(e, i))}><span className="icon-io"><PlusIcon /></span> Add parameter</div>
                </div>
              }
            </div>
            <div className="current-machine-button-col">
              <div className="current-machine-icon-button" onClick={((e) => this.handleCurrentElementOperationDeleting(e, i))}>
                <span className="icon-io"><CloseIcon /></span>
              </div>
            </div>
          </div>
        )
      }.bind(this))
    }

    // Elements
    var currentElements = [];
      this.state.routings.forEach(function(m, i){

      var operationsDiv=[];
      m.operations.forEach(function(o, i){
        operationsDiv.push(<div key={i}>
          <div className="col-3">
            {o.operationName}
          </div>
          <div className="col-3" >
            {o.operationDescription ? (o.operationDescription) : (<span>&nbsp;</span>)}
          </div>
          <div className="col-3" >
            {o.operationMachine.machineName}
          </div>
          <div className="parameter-table">
            <div className="generic-row gray">
              <div className="col">
                Machine parameter
              </div>
              <div className="col" >
                Machine value
              </div>
            </div>
            {this.generateMachineParametersReadOnly(o)}
          </div>

          </div>);
      }.bind(this))

      currentElements.push(
        <div key={i}>
          <div className="generic-row">
            <div className="generic-main-col">
              <div className="col-4">
                <span className="machine-name">{m.routingName}</span>
              </div>
              <div className="col-4">
                <span className="machine-name">{m.routingVersion}</span>
              </div>
              <div className="col-4">
                <span className="machine-name">{m.routingMaterial ? (m.routingMaterial.materialName) : (<span>&nbsp;</span>)}</span>
              </div>
              <div className="col-4">
                <span className="machine-name">{m.routingDescription ? (m.routingDescription) : (<span>&nbsp;</span>)}</span>
              </div>
            </div>
            <div className="generic-button-col">
              <div className="icon-button" onClick={((e) => this.handleElementMoreButton(e, i))}>
                <span className="icon-io"><MoreIcon /></span>
              </div>
              <div className="icon-button" onClick={((e) => this.handleElementEditButton(e, m))}>
                <span className="icon-io"><EditIcon /></span>
              </div>
              <div className="icon-button" onClick={((e) => this.handleElementDeleteButton(e, m))}>
                <span className="icon-io"><CloseIcon /></span>
              </div>
            </div>
          </div>

          {m.expanded &&
          <div className="parameter-table">
            <div className="generic-row gray">
              <div className="col-3">
                Operation name
              </div>
              <div className="col-3" >
                Operation description
              </div>
              <div className="col-3" >
                Operation machine
              </div>
            </div>
            {operationsDiv}
          </div>
          }

        </div>)
    }.bind(this))


    return (
      <div>
        <div className="align-right gray">
          <div className="inline-button" onClick={this.handleNewElementAddButton}><span className="icon-io"><PlusIcon /></span>New Routing</div>
        </div>

        {this.state.currentElement !== null &&
        <div className="container-base">
          <div className="header gray">ROUTING DETAILS</div>
          <div className="generic-row">
            <div className="col">
              <div className="input-group">
                <span className="input-group-addon " id="basic-addon3">Name</span>
                <input value={this.state.currentElement.routingName} onChange={this.handleCurrentElementNameChange} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
              </div>
            </div>
            <div className="col">
              <div className="input-group">
                <span className="input-group-addon">Material</span>
                <select className="form-control" style={{ WebkitAppearance: "none"}} onChange={((e) => this.handleCurrentElementMaterialChange(e))}>
                  {this.generateMaterialsDropDown(this.state.currentElement)}
                </select>
              </div>
            </div>
          </div>
          <div className="input-group">
            <span className="input-group-addon" id="basic-addon3">Description</span>
            <input value={this.state.currentElement.routingDescription} onChange={this.handleCurrentElementDescriptionChange} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
          </div>

          <div className="machine-param-container">
            <div className="gray operation-header">OPERATIONS</div>
            {currentElementOperations}
          </div>

          <div className="form-button add-operation-button" onClick={this.handleCurrentElementAddOperationButton}><span className="icon-io"><PlusIcon /></span> Add operation</div>

          <div className="align-center">
            <div className="positive-button" onClick={this.handleCurrentElementOkButton}><span className="icon-fa"><SaveIcon /></span> Save</div>
            <div className="negative-button" onClick={this.handleCurrentElementCancelButton}><span className="icon-io"><MinusIcon /></span> Cancel</div>
          </div>
        </div>
      }


        <div className="container-base">
          <div className="header gray">ROUTES</div>
          <div className="generic-table">
            <div className="generic-row gray">
              <div className="generic-main-col">
                <div className="col-4">
                  Name
                </div>
                <div className="col-4">
                  Version
                </div>
                <div className="col-4">
                  Material
                </div>
                <div className="col-4">
                  Description
                </div>
              </div>
              <div className="generic-button-col" >
                Actions
              </div>
            </div>
            {currentElements}
          </div>
        </div>
      </div>
    );
  }
}

export default Routings;

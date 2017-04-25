import React, { Component } from 'react';
import PlusIcon from 'react-icons/lib/io/android-add';
import SaveIcon from 'react-icons/lib/fa/check';
import MinusIcon from 'react-icons/lib/io/android-close';
import MoreIcon from 'react-icons/lib/io/android-more-vertical';
import EditIcon from 'react-icons/lib/io/edit';
import CloseIcon from 'react-icons/lib/io/close';
import $ from 'jquery';

import './Machines.css';

class Machines extends Component {

  constructor(props) {
    super(props);

    // Add expanded flag to elements
    this.props.machines.forEach(function(m){
      m.expanded = false;
    })

    this.elementPrototype = {
      machineName: "",
      machineDescription: "",
      parameters: []
    }

    this.state = {
      machines: this.props.machines,
      currentElement: null,
    };

    // Bindings
    this.handleNewElementAddButton = this.handleNewElementAddButton.bind(this);
    this.handleCurrentElementCancelButton = this.handleCurrentElementCancelButton.bind(this);
    this.handleCurrentElementOkButton = this.handleCurrentElementOkButton.bind(this);
    this.handleCurrentElementAddParameterButton = this.handleCurrentElementAddParameterButton.bind(this);
    this.handleCurrentElementNameChange = this.handleCurrentElementNameChange.bind(this);
    this.handleCurrentElementDescriptionChange = this.handleCurrentElementDescriptionChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({machines: nextProps.machines});
  }

  /* Current element events --------------------------------------------------*/
  handleCurrentElementNameChange(newValue){
    var _currentElement = this.state.currentElement;
    _currentElement.machineName = newValue.target.value;
    this.setState({currentElement: _currentElement});
  }

  handleCurrentElementDescriptionChange(newValue){
    var _currentElement = this.state.currentElement;
    _currentElement.machineDescription = newValue.target.value;
    this.setState({currentElement: _currentElement});
  }

  handleCurrentElementParameterNameChange(newValue, i){
    var _currentElement = this.state.currentElement;
    _currentElement.parameters[i].parameterName = newValue.target.value;
    this.setState({currentElement: _currentElement});
  }

  handleCurrentElementParameterDefaultValueChange(newValue, i){
    var _currentElement = this.state.currentElement;
    _currentElement.parameters[i].parameterDefaultName = newValue.target.value;
    this.setState({currentElement: _currentElement});
  }

  handleCurrentElementParameterDeleting(e, i){
    var _currentElement = this.state.currentElement;
    if (i > -1) {
      _currentElement.parameters.splice(i, 1);
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
    var _elements = this.state.machines;

    // If name null return
    if(_currentElement.machineName.length === 0){
      this.setState({
        elements: _elements,
        currentElement: null
      });
      return;
    }

    var filteredParameters = [];
    _currentElement.parameters.forEach(function(p){
      if(p.parameterName !== "")
        {
          filteredParameters.push(p);
        }
    });

    _currentElement.parameters = filteredParameters;

    // check if the element is already within the array, if yes
    _elements.push(_currentElement);

    this.setState({
      elements: _elements,
      currentElement: null
    });
  }

  handleCurrentElementAddParameterButton(){
    var _currentElement = this.state.currentElement;
    _currentElement.parameters.push({parameterName: "", parameterDefaultName: ""});
    this.setState({
      currentElement: _currentElement
    });
  }

  /* List events --------------------------------------------------*/
  handleElementEditButton(e, data){
    var newObject = $.extend(true, {}, data);
    this.setState({
      currentElement: newObject
    });
  }

  handleElementDeleteButton(e, data){
    console.log("delete element");
  }

  handleElementMoreButton(e, index){
    var _machines = this.state.machines;

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

  render() {

    // Current element
    var currentElementParameters = [];
    if(this.state.currentElement){
      this.state.currentElement.parameters.forEach(function(p, i){
        currentElementParameters.push(
          <div key={i} className="parameter-row">
            <div className="current-machine-main-col">
              <div className="input-group col">
                <span className="input-group-addon" id="basic-addon3">Parameter name</span>
                <input value={p.parameterName} onChange={((e) => this.handleCurrentElementParameterNameChange(e, i))} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
              </div>
              <div className="input-group col">
                <span className="input-group-addon" id="basic-addon3">Parameter default value</span>
                <input value={p.parameterDefaultName} onChange={((e) => this.handleCurrentElementParameterDefaultValueChange(e, i))} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
              </div>
            </div>
            <div className="current-machine-button-col">
              <div className="current-machine-icon-button" onClick={((e) => this.handleCurrentElementParameterDeleting(e, i))}>
                <span className="icon-io"><CloseIcon /></span>
              </div>
            </div>
          </div>
        )
      }.bind(this))
    }

    // Elements
    var currentElements = [];
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

      currentElements.push(
        <div key={i}>
          <div className="generic-row">
            <div className="generic-main-col">
              <div className="col">
                <span className="machine-name">{m.machineName}</span>
              </div>
              <div className="col">
                <span className="machine-name">{m.machineDescription}</span>
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
              <div className="col">
                Parameter name
              </div>
              <div className="col" >
                Parameter default value
              </div>
            </div>
            {parametersDiv}
          </div>
          }

        </div>)
    }.bind(this))


    return (
      <div>
        <div className="align-right gray">
          <div className="inline-button" onClick={this.handleNewElementAddButton}><span className="icon-io"><PlusIcon /></span>New Machine</div>
        </div>

        {this.state.currentElement !== null &&
        <div className="container-base">
          <div className="header gray">MACHINE DETAILS</div>

          <div className="input-group">
            <span className="input-group-addon" id="basic-addon3">Name</span>
            <input value={this.state.currentElement.machineName} onChange={this.handleCurrentElementNameChange} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
          </div>
          <div className="input-group">
            <span className="input-group-addon" id="basic-addon3">Description</span>
            <input value={this.state.currentElement.machineDescription} onChange={this.handleCurrentElementDescriptionChange} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
          </div>

          <div className="machine-param-container">
            <div className="header gray">MACHINE DETAILS</div>
              {currentElementParameters}
          </div>

          <div className="form-button" onClick={this.handleCurrentElementAddParameterButton}><span className="icon-io"><PlusIcon /></span> Add parameter</div>

          <div className="align-center">
            <div className="positive-button" onClick={this.handleCurrentElementOkButton}><span className="icon-fa"><SaveIcon /></span> Save</div>
            <div className="negative-button" onClick={this.handleCurrentElementCancelButton}><span className="icon-io"><MinusIcon /></span> Cancel</div>
          </div>
        </div>
      }


        <div className="container-base">
          <div className="header gray">MACHINES</div>
          <div className="generic-table">
            <div className="generic-row gray">
              <div className="generic-main-col">
                <div className="col">
                  Name
                </div>
                <div className="col">
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

export default Machines;

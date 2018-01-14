import React, { Component } from 'react';
import PlusIcon from 'react-icons/lib/io/android-add';
import SaveIcon from 'react-icons/lib/fa/check';
import MinusIcon from 'react-icons/lib/io/android-close';
import MoreIcon from 'react-icons/lib/io/android-more-vertical';
import EditIcon from 'react-icons/lib/io/edit';
import CloseIcon from 'react-icons/lib/io/close';
import $ from 'jquery';

class Orders extends Component {

  constructor(props) {
    super(props);

    // Add expanded flag to elements
    this.props.routings.forEach(function(m){
      m.expanded = false;
    });

    this.state = {
      routings: this.props.routings,
      materialDefinition: "",
      serializedPartId: ""
    };

    // Bindings
  }

  componentWillReceiveProps(nextProps){
    this.setState({routings: nextProps.routings});
  }

  /* List events --------------------------------------------------*/
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

  /* Search events --------------------------------------------------*/
    handleMaterialDefinitionChange(event){
      var currentMaterialDefinition = this.state.materialDefinition;
      currentMaterialDefinition = event.target.value;
      this.setState({
        materialDefinition: currentMaterialDefinition
      });
    }

  /* element generatros*/
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

  render() {
    // Elements
    var currentElements = [];
      this.state.routings.filter(function(r){
        return r.routingMaterial.materialName.includes(this.state.materialDefinition)
      }.bind(this)).forEach(function(m, i){

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
        <div className="container-base">
          <div className="header gray">SEARCH</div>
          <div className="generic-table">
            <div className="col">
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon3">Material Definition</span>
                <input value={this.state.materialDefinition} onChange={((e) => this.handleMaterialDefinitionChange(e))} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
              </div>
            </div>
            <div className="col">
              <div className="input-group">
                <span className="input-group-addon" id="basic-addon3">Serialized Part ID</span>
                <input value="" type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
                {/*<input value={} onChange={((e) => this.handleCurrentElementParameterNameChange(e, i))} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>*/}
              </div>
            </div>
          </div>

        </div>
        <div className="container-base">
          <div className="header gray">
          {this.state.materialDefinition ? ("ROUTINGS FOR " + this.state.materialDefinition) : (<span>ROUTINGS</span>)}
          </div>
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

export default Orders;

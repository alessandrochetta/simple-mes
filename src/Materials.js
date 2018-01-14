import React, { Component } from 'react';
import PlusIcon from 'react-icons/lib/io/android-add';
import SaveIcon from 'react-icons/lib/fa/check';
import MinusIcon from 'react-icons/lib/io/android-close';
import MoreIcon from 'react-icons/lib/io/android-more-vertical';
import EditIcon from 'react-icons/lib/io/edit';
import CloseIcon from 'react-icons/lib/io/close';
import $ from 'jquery';

import './Materials.css';

class Materials extends Component {

  constructor(props) {
    super(props);

    this.elementPrototype = {
      materialName: "",
      materialDescription: ""
    }

    this.state = {
      currentElement: null,
    };

    // Bindings
    this.handleNewElementAddButton = this.handleNewElementAddButton.bind(this);
    this.handleCurrentElementCancelButton = this.handleCurrentElementCancelButton.bind(this);
    this.handleCurrentElementOkButton = this.handleCurrentElementOkButton.bind(this);
    this.handleCurrentElementNameChange = this.handleCurrentElementNameChange.bind(this);
    this.handleCurrentElementDescriptionChange = this.handleCurrentElementDescriptionChange.bind(this);
  }

  /* Current element events --------------------------------------------------*/
  handleCurrentElementNameChange(newValue){
    var _currentElement = this.state.currentElement;
    _currentElement.materialName = newValue.target.value;
    this.setState({currentElement: _currentElement});
  }

  handleCurrentElementDescriptionChange(newValue){
    var _currentElement = this.state.currentElement;
    _currentElement.materialDescription = newValue.target.value;
    this.setState({currentElement: _currentElement});
  }

  handleCurrentElementCancelButton(){
    this.setState({
      currentElement: null
    });
  }

  handleCurrentElementOkButton(){
    var _currentElement = this.state.currentElement;
    var _elements = this.props.materials;

    // If name null return
    if(_currentElement.materialName.length === 0){
      this.setState({
        elements: _elements,
        currentElement: null
      });
      return;
    }

    // check if the element is already within the array, if yes
    _elements.push(_currentElement);

    this.setState({
      elements: _elements,
      currentElement: null
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

  /* Generic events --------------------------------------------------*/
  handleNewElementAddButton(){
    var newObject = $.extend(true, {}, this.elementPrototype);
    this.setState({
      currentElement: newObject
    });
  }

  render() {

    // Elements
    var currentElements = [];
    this.props.materials.forEach(function(m, i){

      currentElements.push(
        <div key={i}>
          <div className="generic-row">
            <div className="generic-main-col">
              <div className="col">
                <span className="machine-name">{m.materialName}</span>
              </div>
              <div className="col">
                <span className="machine-name">{m.materialDescription}</span>
              </div>
            </div>
            <div className="generic-button-col">
              <div className="icon-button" onClick={((e) => this.handleElementEditButton(e, m))}>
                <span className="icon-io"><EditIcon /></span>
              </div>
              <div className="icon-button" onClick={((e) => this.handleElementDeleteButton(e, m))}>
                <span className="icon-io"><CloseIcon /></span>
              </div>
            </div>
          </div>
        </div>)
    }.bind(this))


    return (
      <div>
        <div className="align-right gray">
          <div className="inline-button" onClick={this.handleNewElementAddButton}><span className="icon-io"><PlusIcon /></span>New Material</div>
        </div>

        {this.state.currentElement !== null &&
        <div className="container-base">
          <div className="header gray">MATERIAL DETAILS</div>

          <div className="input-group">
            <span className="input-group-addon" id="basic-addon3">Name</span>
            <input value={this.state.currentElement.materialName} onChange={this.handleCurrentElementNameChange} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
          </div>
          <div className="input-group">
            <span className="input-group-addon" id="basic-addon3">Description</span>
            <input value={this.state.currentElement.materialDescription} onChange={this.handleCurrentElementDescriptionChange} type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
          </div>

          <div className="align-center">
            <div className="positive-button" onClick={this.handleCurrentElementOkButton}><span className="icon-fa"><SaveIcon /></span> Save</div>
            <div className="negative-button" onClick={this.handleCurrentElementCancelButton}><span className="icon-io"><MinusIcon /></span> Cancel</div>
          </div>
        </div>
      }


        <div className="container-base">
          <div className="header gray">MATERIALS</div>
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

export default Materials;

import React from 'react';

import EditButton from '../common/EditButton.js';

import XformSearchComponent from './XformSearchComponent.js';

const advSearchStyle = {
    //  width: '500px',
    //  margin: '0px auto'
};
const searchPanelInputButtonGroup = {
    display: 'flex !important'
};
const searchPanelDropDownLG = {
    position: 'static !important'
};
const searchPanelDropDownMenu = {
    minWidth: '500px',
    marginTop: '-1px',
    padding: '5px 5px'
};

class XformSelectionInput extends React.Component{
    constructor( props ){
        super( props );

        this.state = Object.assign({},props,{ isModalOpen: false, 'label':'Filter' });

        this.handleChange = this.handleChange.bind( this );
        this.onButtonClick = this.onButtonClick.bind( this );
        // this.setXformSelection = this.setXformSelection.bind( this );
    }

    componentWillReceiveProps(nextProps){
        this.setState( Object.assign(this.state,nextProps,{ isModalOpen: false }) );
    }

    handleChange(event) {
console.log("XformSelectionInput.handleChange: %o, %o",event, this.props.onChange);
        const val = event.target ? event.target.value : event;
        this.setState({value: val});
        if( this.props.onChange ){
            this.props.onChange( { 'parameter': this.props.parameter, 'value': val });
        }
    }

    onButtonClick(event){
        this.setState({'searching':!this.state.searching});
    }
/*
    setXformSelection(obj){
        this.setState({'searching':!this.state.searching, 'value':obj});
        if( this.props.valueChange ){
            this.props.valueChange( {'value' : this.state.value} );
        }
    }
*/
    render(){

        return (
                <div className="form-group row">
                  <label className="col-xs-2 control-label" htmlFor="relationship_xform">{this.props.label}:</label>
                  <div className="col-xs-10">
                      <div className="input-group" style={advSearchStyle}>
                          <input type="text" className="form-control"
                                 placeholder="Search for XSLT Transforms" id="relationship_xform"
                                 value={this.state.value}
                                 onChange={this.handleChange}/>

                          <div className="input-group-btn">
                              <div className="btn-group" role="group" style={searchPanelInputButtonGroup}>
                                  <div className="dropdown dropdown-lg" style={searchPanelDropDownLG}>
                                      <EditButton onClick={this.onButtonClick}/>
                                      <div className="dropdown-menu dropdown-menu-right"
                                            role="menu" style={searchPanelDropDownMenu}>
                                          <div className="form-horizontal" onClick={this.stopIt}>
                                            <XformSearchComponent
                                                onXformSelection={this.handleChange}/>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <em className="help-block">{this.state.help}</em>
                  </div>
              </div>
          );

    }

    stopIt(evt){
        evt.stopPropagation();

    }

    openModal() {
      this.setState({ isModalOpen: true });
      //<button className="btn btn-default" onClick={() => this.openModal()}>Select Filter</button>
    }

    closeModal() {
      this.setState({ isModalOpen: false })
    }
}

export default XformSelectionInput;

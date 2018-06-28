import React from 'react';

import EditClearButton from '../common/EditClearButton.js';
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
    padding: '5px 5px',
    border: '1px solid #eaeaea'
};

class XformSelectionInput extends React.Component{
    constructor( props ){
        super( props );

        this.state = Object.assign({},props,{ isModalOpen: false, 'label':'Filter',searching:false });

        this.handleChange = this.handleChange.bind( this );
        this.onEditButtonClick = this.onEditButtonClick.bind( this );
        this.onClearButtonClick = this.onClearButtonClick.bind( this );
        // this.setXformSelection = this.setXformSelection.bind( this );
    }

    componentWillReceiveProps(nextProps){
        this.setState( Object.assign(this.state,nextProps,{ isModalOpen: false,searching:false }) );
    }

    handleChange(event) {
console.log("XformSelectionInput.handleChange: %o, %o",event, this.props.onChange);
        const val = event.target ? event.target.value : event;
        if( this.props.onChange ){
            this.props.onChange( {
                'parameter': this.props.parameter,
                'value': val
            });
        }
        this.setState({
            'searching' : false,
            'value' : val
        });
    }

    onEditButtonClick(event){
        this.setState({'searching':!this.state.searching});
    }

    onClearButtonClick(event){
//console.log("XformSelectionInput.onClearButtonClick: %o, %o",this.props, this.props.onChange);
        this.setState({'value' : '', 'searching':false});
        if( this.props.onChange ){
            this.props.onChange( {
                'parameter': this.props.parameter,
                'value': ''
            });
        }
    }

    render(){
        let searchComponent = null;
        if( this.state.searching ){
            searchComponent = <XformSearchComponent onXformSelection={this.handleChange}/>;
        }
        console.log('XformSelectionInput.render ',searchComponent);
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
                                      <EditClearButton onEditClick={this.onEditButtonClick}
                                                       onClearClick={this.onClearButtonClick} />
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div>
                      {searchComponent}
                      </div>
                  </div>
                  <em className="help-block">{this.state.help}</em>
              </div>
          );

    }

    stopIt(evt){
        evt.stopPropagation();
    }

    openModal() {
      this.setState({ isModalOpen: true });
    }

    closeModal() {
      this.setState({ isModalOpen: false })
    }
}

export default XformSelectionInput;

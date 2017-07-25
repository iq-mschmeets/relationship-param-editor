import React from 'react';

import EditButton from '../common/EditButton.js';
import FilterSearchComponent from './FilterSearchComponent.js';

// Example of using modal.
/*
<Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
  <PanelWrapper>
      <SearchPanel />
  </PanelWrapper>
  <p>
      <button className="btn btn-primary pull-right"
              onClick={() => this.closeModal()}>Close</button>
  </p>
</Modal>
*/


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
    padding: '6px 20px'
};

/*
const searchPanelFormGroup={
    marginLeft: '0px',
    marginRight: '0px'
};
*/


class FilterSelectionInput extends React.Component{
    constructor( props ){
        super( props );

        this.state = Object.assign({},props,{ isModalOpen: false, 'label':'Filter' });

        this.handleChange = this.handleChange.bind( this );
        this.onButtonClick = this.onButtonClick.bind( this );
        this.setFilterSelection = this.setFilterSelection.bind( this );
    }

    componentWillReceiveProps(nextProps){
        this.setState( Object.assign(this.state, nextProps,{ isModalOpen: false }) );
    }

    handleChange(event) {
        const val = event.target ? event.target.value : event.id;
        this.setState({value: val});
        if( this.props.onChange ){
            this.props.onChange( { 'parameter': this.props.parameter, 'value': val });
        }
    }

    onButtonClick(event){
        this.setState({'searching':!this.state.searching});
    }

    setFilterSelection(obj){
        this.setState({'searching':!this.state.searching, 'value':obj.id});
        if( this.props.valueChange ){
            this.props.valueChange( {'value' : this.state.value} );
        }
    }

    render(){

        return (
                <div className="form-group row">
                  <label className="col-xs-2 control-label" htmlFor="relationship_query">{this.state.label}:</label>
                  <div className="col-xs-10">
                      <div className="input-group" style={advSearchStyle}>
                          <input type="text" className="form-control"
                                 placeholder="Search for filters" id="relationship_query"
                                 value={this.state.value}
                                 onChange={this.handleChange}/>

                          <div className="input-group-btn">
                              <div className="dropdown dropdown-lg" style={searchPanelDropDownLG}>
                                  <EditButton onClick={this.onButtonClick}/>
                                  <div className="dropdown-menu dropdown-menu-right"
                                        role="menu" style={searchPanelDropDownMenu}>
                                      <div className="form-horizontal" onClick={this.stopIt}>
                                        <FilterSearchComponent
                                            onFilterSelection={this.handleChange}/>
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

export default FilterSelectionInput;
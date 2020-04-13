import React from 'react';


import FilterSearchComponent from './FilterSearchComponent.js';
import EditClearButton from '../common/EditClearButton.js';

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
    padding: '5px 5px',
    border: '1px solid #eaeaea'
};

/*
const searchPanelFormGroup={
    marginLeft: '0px',
    marginRight: '0px'
};
*/


class FilterSelectionInput extends React.Component {
    constructor( props ) {
        super( props );

        this.state = Object.assign( {}, props, {
            isModalOpen: false,
            'labelText': 'Filter'
        } );

        this.handleChange = this.handleChange.bind( this );
        this.onEditButtonClick = this.onEditButtonClick.bind( this );
        this.onClearButtonClick = this.onClearButtonClick.bind( this );
        this.setFilterSelection = this.setFilterSelection.bind( this );
    }

    componentWillReceiveProps( nextProps ) {
        this.setState( Object.assign( this.state, nextProps, {
            isModalOpen: false,
            'searching': false
        } ) );
    }

    handleChange( payload ) {
        const val = payload.lookup ? payload.lookup : payload.id;
        const param = payload.lookup ? 'RELATIONSHIP_QUERY_LOOKUP' : 'RELATIONSHIP_QUERY_ID';

        console.log( "FilterSearchInput.handleChange: %o, %s, %s", payload, param, val );
        this.setState( {
            value: val
        } );
        if( this.props.onChange ) {
            this.props.onChange( {
                'parameter': param,
                'value': val
            } );
        }
    }

    onEditButtonClick( event ) {
        console.log( 'onEditButtonClick ', this.state );
        this.setState( {
            'searching': !this.state.searching
        } );
    }

    onClearButtonClick( event ) {
        console.log( "FilterSelectionInput.onClearButtonClick: %o, %o", this.props, this.props.onChange );
        this.setState( {
            value: 'Default',
            'searching': false
        } );
        if( this.props.onReset ) {
            this.props.onReset();
        } else if( this.props.onChange ) {
            this.props.onChange( {
                'parameter': 'RELATIONSHIP_QUERY_ID',
                'value': ''
            } );
            this.props.onChange( {
                'parameter': 'RELATIONSHIP_QUERY_LOOKUP',
                'value': ''
            } );
        }
    }

    setFilterSelection( obj ) {
        if( obj.lookup ) {
            this.setState( {
                'searching': !this.state.searching,
                'value': obj.lookup,
                'type' : 'RELATIONSHIP_QUERY_LOOKUP'
            } );
        } else {
            this.setState( {
                'searching': !this.state.searching,
                'value': obj.id,
                'type' : 'RELATIONSHIP_QUERY_ID'
            } );
        }

        if( this.props.valueChange ) {
            this.props.valueChange( {
                'value': this.state.value,
                'type' : obj.lookup ? 'RELATIONSHIP_QUERY_LOOKUP' : 'RELATIONSHIP_QUERY_ID'
            } );
        }
    }

    render() {
        let searchComponent = null;
        if( this.state.searching ) {
            searchComponent = < FilterSearchComponent onFilterSelection = {
                this.handleChange
            }
            />;
        }
        return (
            <div className = "form-group" >
                <label className=" control-label" htmlFor={this.props.parameter}>
                    {this.state.labelText}:
                </label>
                <div className="">
                    <div className="input-group" style={advSearchStyle}>
                        <input type="text" className="form-control" name={this.props.parameter}
                               placeholder="Search for filters" id="relationship_query"
                               value={this.state.value} onChange={this.handleChange} />

                        <div className = "input-group-btn" >
                            <div className="dropdown dropdown-lg" style={searchPanelDropDownLG}>
                                 <EditClearButton onEditClick={this.onEditButtonClick }
                                                  onClearClick={this.props.onClearButtonClick }/>
                            </div>
                        </div>
                    </div>
                    <div> { searchComponent } </div>
                    <em className="help-block" > { this.state.help } </em>
                 </div>
            </div>
        );

    }

    stopIt( evt ) {
        evt.stopPropagation();
    }

    openModal() {
        this.setState( {
            isModalOpen: true
        } );
    }

    closeModal() {
        this.setState( {
            isModalOpen: false
        } );
    }
}

export default FilterSelectionInput;

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


        this.onClearButtonClick = this.onClearButtonClick.bind( this );
        this.setFilterSelection = this.setFilterSelection.bind( this );
        this.onAction = this.onAction.bind( this );
    }

    componentDidMount() {
        this.filterSelector.addEventListener( "action", this.onAction );
    }

    componentWillUnmount() {
        this.filterSelector.removeEventListener( "action", this.onAction );
    }

    componentWillReceiveProps( nextProps ) {
        this.setState( Object.assign( this.state, nextProps, {
            isModalOpen: false,
            'searching': false
        } ) );
    }

    onAction( evt ) {
        if ( evt.detail.type === "named_text_selection" ) {
            console.log( "FilterSelectionInput.onAction %o", evt.detail );

            if ( evt.detail.lookup == null && evt.detail.id == null ) {
                //unset
                this.onClearButtonClick( {} );
                return;
            }
            if ( evt.detail.lookup && evt.detail.lookup.length > 1 ) {
                this.setState( {
                    searching: false,
                    value: evt.detail.lookup,
                    type : 'RELATIONSHIP_QUERY_LOOKUP'
                })
                if( this.props.onChange ) {
                    this.props.onChange( {
                        'value': evt.detail.lookup,
                        'type': 'RELATIONSHIP_QUERY_LOOKUP',
                        'parameter' : 'RELATIONSHIP_QUERY_LOOKUP'
                    } );
                }

            } else {
                this.setState( {
                    searching: false,
                    value: evt.detail.id,
                    type : 'RELATIONSHIP_QUERY_ID'
                })
                if( this.props.onChange ) {
                    this.props.onChange( {
                        'value': evt.detail.id,
                        'type': 'RELATIONSHIP_QUERY_ID',
                        'parameter' : 'RELATIONSHIP_QUERY_ID'
                    } );
                }

            }

        }
    }

    onClearButtonClick( event ) {
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

        return (
            <div className = "form-group" >
                <label className=" control-label" htmlFor={this.props.parameter}>
                    {this.state.labelText}:
                </label>
                <div>
                    <iq-named-text-selector data-type="filter"
                            data-initial-value={this.state.value}
                            ref={( filterSelector ) => { this.filterSelector = filterSelector; }} />

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

import React from 'react';
import RelatedClassList from './RelatedClassList.js';
import ParameterFormComponent from './ParameterFormComponent.js';
import ParameterService from './ParameterService';

export const RELATIONSHIP_PARAMETER_TYPE = 157;
export const MESSAGE_DURATION = 1250;

class RelatedClassProperties extends React.Component {
    constructor( props ) {
        super( props );
        this.handleClassSelection = this.handleClassSelection.bind( this );
        this.reorder = this.reorder.bind( this );
        this.onSave = this.onSave.bind( this );
        this.state = {};
        console.log( 'RelatedClassProperties.props %o', props );
    }

    handleClassSelection( obj ) {
        this.setState( {
            'selected': obj.selected
        } );
    }

    reorder(id,from,to){
        console.log("RelatedClassProperties.reorder: %o",arguments);
    }

    /**
     * getSelectedModel finds the relationship model for the selected state.
     * @return {Object}
     */
    getSelectedModel() {
        var val = this.state.selected;
        var rval = null; //{relationID:'', name:'',parameters:{}};
        if( val ) {
            var mods = this.props.models.filter( function( model ) {
                return val === model.relationID;
            } );
            rval = mods[ 0 ];
console.log("RelatedClasProperties: get selected model: %s, %o", val, rval);
        }
        return rval;
    }

    /**
     * Saves the parameters for one relationship.
     * @param  {Object} obj  literal with relationship parameter values
     * @return {void}
     */
    onSave( obj ) {
        console.log( "RelatedClasProperties.onSave args: %o, %o", obj, this.state.selected );

        const params = [];
        Object.keys( obj ).forEach( ( key ) => {
            params.push( {
                'id': this.state.selected,
                'parameter': key,
                'value': obj[ key ],
                'typeID': RELATIONSHIP_PARAMETER_TYPE
            } )
        } );
console.log( "RelatedClasProperties.onSave params: %o", params );
        this.setState( {
            'saving': true
        } );
        ParameterService( params ).then( ( rsp ) => {
            setTimeout( () => this.setState( {
                'saving': false
            } ), MESSAGE_DURATION );
console.log( "RelatedClassProperties.PS-SAVE: %o", rsp )
        } );
    }

    render() {
        console.log("RelatedClassProperties.render: props: %o", this.props);
        return (
            <div className="row">
                <div className="col-xs-3">
                    <RelatedClassList models={this.props.models}
                                      update={this.handleClassSelection}
                                      reorder={this.reorder}/>
                </div>
                <div className="col-xs-9">
                    <ParameterFormComponent model={this.getSelectedModel()}
                                            onSave={this.onSave}
                                            saving={this.state.saving}/>
                </div>
            </div>
        )
    }
}

export default RelatedClassProperties;

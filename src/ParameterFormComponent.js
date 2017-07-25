import React from 'react';

import ReadOnlyInputFormGroup from './common/ReadOnlyInputFormGroup.js';
import ReadWriteInputFormGroup from './common/ReadWriteInputFormGroup.js';
import FilterSelectionInput from './FilterSearchComponents/FilterSelectionInput.js';
import XformSelectionInput from './XformSearchComponents/XformSelectionInput.js';
import SelectInputGroup from './common/SelectInputGroup.js';
import OkCancelButtonGroup from './common/OkCancelButtonGroup.js';

const CONTROLLER_OPTIONS = [
    {'text':'None', value:'None'},
    {'text':'One To Many', value:'One To Many'},
    {'text':'Many To Many', value:'Many To Many'},
    {'text':'', value:''}
];

/**
 A form component to display and update Relationship parameters
 The initial props object is the Relationship definition from the class
 meta data. This component only manages the Parameters for the Relationship
 as that object is immutable.
 */
class ParameterFormComponent extends React.Component{
    constructor( props ){
        super( props );
        this.state = {
            model : props.model
        };
        this.oncancel = this.oncancel.bind(this);
        this.onok = this.onok.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps( newProps ){
        this.setState(Object.assign({},newProps));
    }

    onok(){
        console.log("ParameterFormComponent.onOK: %o", this.state);
        if( this.props.onSave ){
            this.props.onSave( this.state.model.parameters );
        }
    }

    onChange(obj){
        // obj is { parameter: '', value:''}, in this case, it will be a parameter
        // name and value.
        const newState = {}
        newState[obj.parameter] = obj.value;

        this.setState( Object.assign(this.state.model.parameters, newState) );
    }

    render(){
        //console.log("ParameterFormComponent.render: %o, %o",this.props.model, this.state.model);
        if( this.props.model ){
            let xslField = null;
            // Don't show an XSLT selector if we're using the defualt query?
            // Is this correct, or should it always be an option?
            if( this.state.model.parameters['RELATIONSHIP_QUERY_ID']  ){
                xslField = <XformSelectionInput value={this.state.model.parameters['RELATIONSHIP_QUERY_XFORM']||''}
                                        label="XSLT Xform" parameter="RELATIONSHIP_QUERY_XFORM" onChange={this.onChange}
                                        help="This controls the XSLT used to produce the display from the query." />;
            }

            return(
            <div>
                <h4 className="section-head">Properties</h4>

                <form onSubmit={this.stopIt}>
                    <ReadOnlyInputFormGroup value={this.state.model.relationID} help=""
                                            label="RelationID" />
                    <ReadOnlyInputFormGroup value={this.state.model.name} help=""
                                            label="Name" />
                    <ReadWriteInputFormGroup value={this.state.model.parameters['RELATIONSHIP_LABEL']||''}
                                            label="Label" parameter="RELATIONSHIP_LABEL" onChange={this.onChange}
                                            help="This label is used in the display." />
                    <FilterSelectionInput value={this.state.model.parameters['RELATIONSHIP_QUERY_ID']||'Automatic'}
                                            label="Query" parameter="RELATIONSHIP_QUERY_ID" onChange={this.onChange}
                                            help="This controls the query used to produce the display." />
                    {xslField}
                    <SelectInputGroup value={this.state.model.parameters['RELATIONSHIP_CONTROLLER']}
                                     label="Controller" parameter="RELATIONSHIP_CONTROLLER" onChange={this.onChange}
                                     help="This controls the editing features of the display."
                                     options={CONTROLLER_OPTIONS}
                                     defaultValue="None"/>

                    <OkCancelButtonGroup onsubmit={this.oncancel} onok={this.onok} saving={this.props.saving}/>
                </form>

            </div>
            )
        } else {
            return(<div>
                    <h4>Properties</h4>
                    </div>
            )
        }
    }

    stopIt(evt){
        evt.preventDefault();
        evt.stopPropagation();
    }
    oncancel(){}

}


export default ParameterFormComponent;
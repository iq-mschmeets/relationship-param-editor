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

const DISPLAY_OPTIONS = [
    {'text' : 'Normal', value: false},
    {'text' : 'Always Expand', value: true}
];

const RENDER_OPTIONS = [
    {'text' : 'Default', value: 'default'},
    {'text' : 'XSLT', value: 'xslt'}
    // {'text' : 'Stamp', value:'stamp'}
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
        if( obj.parameter == 'RELATIONSHIP_QUERY_ID' && !Number.isInteger(obj.value) ){
            obj.parameter = 'RELATIONSHIP_QUERY_LOOKUP';
        }
        newState[obj.parameter] = obj.value;
console.log("ParameterFormComp: %o, %o", this.state, newState);
        this.setState( Object.assign(this.state.model.parameters, newState) );
    }

    render(){
        //console.log("ParameterFormComponent.render: %o, %o",this.props.model, this.state.model);
        //TODO: Use RELATIONSHIP_QUERY_LOOKUP too.
        if( this.props.model ){
            let xslField = null;
// Need to shaw a Renderer selector!!!
            // Don't show an XSLT selector if we're using the defualt query?
            // Is this correct, or should it always be an option? No, only for optional queries.
            if( (this.state.model.parameters['RELATIONSHIP_QUERY_ID'] || this.state.model.parameters['RELATIONSHIP_QUERY_LOOKUP'])
                && (this.state.model.parameters['RELATIONSHIP_QUERY_RENDERER'] == 'xslt') ){
                xslField = <XformSelectionInput value={this.state.model.parameters['RELATIONSHIP_QUERY_XFORM']||''}
                                        label="XSLT Xform" parameter="RELATIONSHIP_QUERY_XFORM" onChange={this.onChange}
                                        help="This controls the (optional) XSLT used to produce the display from the query." />;
            }

            return(
            <div>
                <h4 className="section-head">Properties</h4>

                <form onSubmit={this.stopIt} className="rel-props">
                    <ReadOnlyInputFormGroup value={this.state.model.relationID} help=""
                                            label="RelationID" />
                    <ReadOnlyInputFormGroup value={this.state.model.name} help=""
                                            label="Name" />
                    <ReadWriteInputFormGroup value={this.state.model.parameters['RELATIONSHIP_LABEL']||''}
                                            label="Label" parameter="RELATIONSHIP_LABEL" onChange={this.onChange}
                                            help="This label is used in the EDR display." />
                    <ReadWriteInputFormGroup value={this.state.model.parameters['RELATIONSHIP_DESCRIPTION']||''}
                                            label="Description" parameter="RELATIONSHIP_DESCRIPTION" onChange={this.onChange}
                                            help="To provide the user with more information about the relationship." rows="5" />
                    <SelectInputGroup value={this.state.model.parameters['RELATIONSHIP_DISPLAY_EXPANDED']}
                                     label="Expanded" parameter="RELATIONSHIP_DISPLAY_EXPANDED" onChange={this.onChange}
                                     help="This controls the initial display. Should this replationship expand automatically on page load?"
                                     options={DISPLAY_OPTIONS}
                                     defaultValue="None"/>
                    <FilterSelectionInput value={this.state.model.parameters['RELATIONSHIP_QUERY_LOOKUP']
                                                 || this.state.model.parameters['RELATIONSHIP_QUERY_ID']
                                                 || 'Default'}
                                            label="Query" parameter="RELATIONSHIP_QUERY_ID" onChange={this.onChange}
                                            help="This controls the query used to produce the XSLT, or default, display." />
                    <SelectInputGroup value={this.state.model.parameters['RELATIONSHIP_QUERY_RENDERER']}
                                     label="Renderer" parameter="RELATIONSHIP_QUERY_RENDERER" onChange={this.onChange}
                                     help="This determines how the data is rendered."
                                     options={RENDER_OPTIONS}
                                     defaultValue="Default"/>
                    {xslField}

                    <ReadWriteInputFormGroup value={this.state.model.parameters['RELATIONSHIP_DISPLAY_SELECTOR']||''}
                                             label="Selector" parameter="RELATIONSHIP_DISPLAY_SELECTOR" onChange={this.onChange}
                                             help="To place this relationship in a specific place in the page, enter an HTML selector." />

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

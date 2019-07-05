import React from 'react';

import ReadWriteInputFormGroup from './common/ReadWriteInputFormGroup.js';
import SelectInputGroup from './common/SelectInputGroup.js';

const STAMP_PARAMETERS = {
    
    'RELATIONSHIP_SOURCE_STAMP':{ label:'Source Stamp', help:'The name of the function to use for creating source tiles -- not linked (optional)'},
    'RELATIONSHIP_TARGET_STAMP':{ label:'Target Stamp', help:'The name of the funciton to use for creating target tiles -- already linked (optional)'},
    //'RELATIONSHIP_TARGET_LABEL':{},
    'RELATIONSHIP_EDIT_LAYOUT':{ label:'Layout', help:'Arrangement for the \'target\' and \'source\' sides. Target is linked, source is not linked.'},

};


const LAYOUT_RENDER_OPTIONS = [
    {'text' : 'Side by Side', value: 'side-by-side'},
    {'text' : 'Stacked', value: 'stack'}
];



class StampPropertyEditor extends React.Component{
    constructor( props ){
        super( props );
        this.onChange = this.onChange.bind(this);

    }

    onChange( evt ){
        console.log("StampPropertyEditor.onChange: %o", evt);
        this.props.onChange( evt );
    }

    getStampSpecificParameterKeys(){
        return Object.keys(this.props.params).filter((p)=>{
            return STAMP_PARAMETERS.hasOwnProperty(p);
        });
    }

    render(){
        const stampSpecificParams = this.getStampSpecificParameterKeys();

        var rval =  React.createElement('fieldset', null, 
            stampSpecificParams.map( ( key )=>{
                const p = this.props.params[key];
                const local = STAMP_PARAMETERS[ p.parameter ];

                if( p.parameter == 'RELATIONSHIP_EDIT_LAYOUT' ){
                    return React.createElement(SelectInputGroup, {
                        value : p.value,
                        label : local.label,
                        parameter : p.parameter,
                        onChange : this.onChange,
                        help : local.help,
                        options : LAYOUT_RENDER_OPTIONS,
                        defaultValue : 'side-by-side'
                    }); 
                } else {

                    return React.createElement(ReadWriteInputFormGroup, { 
                            value :p.value||'',
                            label : local.label, 
                            parameter :  p.parameter, 
                            onChange :  this.onChange, 
                            help : local.help,
                            rows:"1"
                    });
                }

            
            })
        );
        return rval;
    }
}

export default StampPropertyEditor;


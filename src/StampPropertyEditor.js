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
        this.onAction = this.onAction.bind( this );
        this.filterSelectors = [];
        this.subscriptions = [];
    }

    componentDidMount() {
        this.subscriptions = this.filterSelectors.map( ( sel ) => {
            sel.addEventListener( "action", this.onAction );
            return () => { sel.removeEventListener( "action", this.onAction ) };
        } );
    }

    componentWillUnmount() {
        this.subscriptions.forEach( f => f() );
    }

    onChange( evt ){
        console.log("StampPropertyEditor.onChange: %o", evt);
        this.props.onChange( evt );
    }

    onAction( evt ) {
        console.log( "StampPropertyEditor.onAction %o, %o", evt.detail, this.onAction );
        if ( evt.detail.type === "named_text_selection" ) {
            // const p = this.props.params[key];
            // const local = STAMP_PARAMETERS[ p.parameter ];

            console.log( "StampPropertyEditor.onAction %o, %o, %s",
                evt.detail, evt.target, evt.target.getAttribute( "data-parameter" ) );

            if ( evt.detail.lookup && evt.detail.lookup.length > 1 ) {
                this.props.onChange( {
                    'value': evt.detail.lookup,
                    'type': evt.target.getAttribute( "data-parameter" ),
                    'parameter': evt.target.getAttribute( "data-parameter" )
                } );
            } else {
                this.props.onChange( {
                    'value': evt.detail.id,
                    'type': evt.target.getAttribute( "data-parameter" ),
                    'parameter': evt.target.getAttribute( "data-parameter" )
                } );
            }
        }
    }

    getStampSpecificParameterKeys(){
        return Object.keys(this.props.params).filter((p)=>{
            return STAMP_PARAMETERS.hasOwnProperty(p);
        });
    }

    render(){
        const stampSpecificParams = this.getStampSpecificParameterKeys();
console.log( "StampPropertyEditor.render %o", stampSpecificParams );
        return React.createElement( 'div', null,
            [React.createElement('hr', null)].concat(
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

                        return <iq-named-text-selector data-type="stamp"
                                data-initial-value={p.value}
                                data-label={local.label}
                                data-parameter={ p.parameter }
                                ref={( filterSelector ) => { this.filterSelectors.push( filterSelector ); }} />

                    }


                } )
            ));
    }
}

export default StampPropertyEditor;

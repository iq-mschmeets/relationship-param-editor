
import React from 'react';
import RelatedClassList from './RelatedClassList.js';
import ParameterFormComponent from './ParameterFormComponent.js';
import ParameterService from './ParameterService';

export const RELATIONSHIP_PARAMETER_TYPE = 157;
export const MESSAGE_DURATION = 1250;

class RelatedClassProperties extends React.Component{
    constructor( props ){
        super( props );
        this.handleClassSelection = this.handleClassSelection.bind( this );
        this.onSave = this.onSave.bind( this );
        this.state = {};
console.log('RelatedClassProperties.props %o',props);
    }

    handleClassSelection( obj ){
        this.setState({'selected': obj.selected});
    }

    getSelectedModel(){
        var val = this.state.selected;
        var rval = null;//{relationID:'', name:'',parameters:{}};
        if( val ){
            var mods = this.props.models.filter(function (model) {
                return val === model.relationID;
            });
            rval = mods[0];
            // console.log("APP: get selected model: %s, %o", val, rval);
        }
        return rval;
    }

    /* Specific to relationship parameters. */
    onSave( obj ){
        console.log("RelatedClasProperties.onSave args: %o, %o", obj, this.state.selected);
        const params = [];
        Object.keys(obj).forEach((key)=>{
            params.push( {
                'id' : this.state.selected,
                'parameter' : key,
                'value' : obj[key],
                'typeID' : RELATIONSHIP_PARAMETER_TYPE
            })
        });
        console.log("RelatedClasProperties.onSave params: %o", params);
        this.setState({'saving':true});
        ParameterService( params ).then((rsp)=>{
            setTimeout(()=>this.setState({'saving': false}), MESSAGE_DURATION);
            console.log("PSOT-SAVE: %o",rsp)
        });
    }

    render(){
        console.log("RelatedClassProperties.render: props: %o",this.props);
        return (
        <div className="row">
            <div className="col-xs-3">
                <RelatedClassList models={this.props.models} update={this.handleClassSelection} />
            </div>
            <div className="col-xs-9">
                <ParameterFormComponent model={this.getSelectedModel()}
                                        onSave={this.onSave} saving={this.state.saving}/>
            </div>
        </div>
        )
    }
}


export default RelatedClassProperties;
import React from 'react';

// No need to manage state, because read only.
class ReadOnlyInputFormGroup extends React.Component{
    _getValue(){
        if( !this.props.value ){
            return '';
        }
        if(Number.isInteger(this.props.value)){
            return this.props.value;
        }
        return this.props.value.length > 0 ? this.props.value.toString().replace('&gt;', '>') :'';
    }
    render(){
        console.log("ReadOnlyInputFormGroup: value = %s",this.props.value);

        return (<div className="form-group row">
                <label className="col-xs-2 control-label" htmlFor="relationship_name">{this.props.label}:</label>
                <div className="col-xs-10">
                    <input type="text"
                           placeholder="" className="form-control input-md"
                           readOnly="true" value={this._getValue()} />
                    <em className="help-block">{this.props.help}</em>
                </div>
            </div>);
    }
}

export default ReadOnlyInputFormGroup;

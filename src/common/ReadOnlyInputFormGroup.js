import React from 'react';

// No need to manage state, because read only.
class ReadOnlyInputFormGroup extends React.Component{
    render(){
        return (<div className="form-group row">
                <label className="col-xs-2 control-label" htmlFor="relationship_name">{this.props.label}:</label>
                <div className="col-xs-10">
                    <input type="text"
                           placeholder="" className="form-control input-md"
                           readOnly="true" value={this.props.value} />
                    <em className="help-block">{this.props.help}</em>
                </div>
            </div>);
    }
}

export default ReadOnlyInputFormGroup;

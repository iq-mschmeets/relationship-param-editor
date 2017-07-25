import React from 'react';


class ReadWriteInputFormGroup extends React.Component{
    constructor( props ){
        super( props );
        this.state = Object.assign({},props);
        this.handleChange = this.handleChange.bind( this );
    }

    handleChange(event) {
        this.setState({value: event.target.value});

        if( this.props.onChange ){
            this.props.onChange( { 'parameter': this.props.parameter, 'value': (event.target.value || event.value) });
        }
    }

    getValue(){
        return this.state.value;
    }

    componentWillReceiveProps( newProps ){
        this.setState(Object.assign({},newProps));
    }

    render(){
        //console.log("ReadWriteInputFormGroup.render: state %o", this.state);
        return (<div className="form-group row">
                <label className="col-xs-2 control-label" htmlFor="relationship_name">{this.state.label}:</label>
                <div className="col-xs-10">
                    <input type="text"
                           placeholder=""
                           className="form-control input-md"
                           value={this.state.value}
                           onChange={this.handleChange}/>
                    <em className="help-block">{this.state.help}</em>
                </div>
            </div>)
    }
}


export default ReadWriteInputFormGroup;

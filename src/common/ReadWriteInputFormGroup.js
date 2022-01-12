import React from 'react';


class ReadWriteInputFormGroup extends React.Component{
    constructor( props ){
        super( props );
        this.state = Object.assign({},props);
        this.handleChange = this.handleChange.bind( this );
    }

    handleChange(event) {
        console.log("ReadWriteInputFormGroup.handleChange: %o, %o",this.props, event);
        event.preventDefault();
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
        return (<div className="form-group">
                <label className=" control-label" htmlFor={this.state.parameter}>{this.state.label}:</label>
                <div className="">
                    <textarea placeholder=""
                           className="form-control input-md"
                           value={this.state.value}
                           onChange={this.handleChange}
                           name={this.state.parameter}
                           rows={ this.props.rows || 1 }/>
                    <em className="help-block">{this.state.help}</em>
                </div>
            </div>)
    }
}


export default ReadWriteInputFormGroup;

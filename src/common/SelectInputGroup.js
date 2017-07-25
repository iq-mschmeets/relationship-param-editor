import React from 'react';

/*
const searchPanelFormGroup={
  marginLeft: '0px',
  marginRight: '0px'
};
*/

/**
 Basic HTML Select functionality.
 props is a list of objects {text:'', value:''}
 TODO: State changes!
 */
class SelectInputGroup extends React.Component{
    constructor( props ){
        super( props );
        this.state = Object.assign({},props);;
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
        let obj = Object.assign({},newProps);
        if( !obj.value ){ obj.value = '';}
        this.setState(Object.assign({},newProps));
    }

    render(){
//console.log("SelectInputGroup.render: %o", this.props);
      return(
          <div className="form-group row">
            <label className="col-xs-2 control-label" htmlFor="relationship_name">{this.props.label}:</label>
            <div className="col-xs-10">
            <select className="form-control"
                    value={this.state.value || this.props.defaultValue}
                    onChange={this.handleChange}> {
                this.props.options.map(function(option, idx){
                    return <option key={idx} value={option.value || option.text} >{option.text}</option>
                })
            }
            </select>
            <em className="help-block">{this.props.help}</em>
            </div>
    </div>
      )
  }
}

  export default SelectInputGroup;
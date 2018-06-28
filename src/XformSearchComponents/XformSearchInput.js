import React from 'react';
import ReactDOM from 'react-dom';

import XformSelectionInput from './XformSelectionInput.js';

class XformSearchInput extends React.Component{
    constructor( props ){
        super( props );
        this.state = Object.assign({}, props);
        this.handleChange = this.handleChange.bind( this );
        this.onClick = this.onClick.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    onClick(event){
        this.props.onChange({'value':this.getValue()});
    }
    getValue(){
        return this.state.value;
    }
    componentWillReceiveProps( newProps ){
        this.setState(Object.assign(this.state,newProps));
    }
    render(){
        return (
            <div className="input-group">
                <input type="text" className="form-control"
                       placeholder="Search..." id="relationship_xform"
                       defaultValue={this.props.value}
                       />
                 <span className="input-group-btn">
                   <button className="btn btn-primary" type="button" onClick={this.onClick}>
                       Search
                       {/*<span className="glyphicon glyphicon-search"></span>*/}
                   </button>
                 </span>
            </div>
        );
    }


}


export default XformSearchInput;

import React from 'react';
import ReactDOM from 'react-dom';

import XformSelectionInput from './XformSelectionInput.js';

class XformSearchInput extends React.Component{
    constructor( props ){
        super( props );
        this.state = Object.assign({}, props);
        this.handleChange = this.handleChange.bind( this );

    }
    handleChange(event) {
        this.setState({value: event.target.value});
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
                       onChange={this.handleChange}/>
                 <span className="input-group-btn">
                   <button className="btn btn-primary" type="button">
                       Search
                       {/*<span className="glyphicon glyphicon-search"></span>*/}
                   </button>
                 </span>
            </div>
        );
    }
    componentDidMount() {
        // Hack to workaround event delegation in Bootstrap vs. React.
        // don't want click events in this component to reach Bootstrap.
        // The click event will close the Bootstrap drop down.
        ReactDOM.findDOMNode(this).addEventListener('click', (event) => {
          event.stopPropagation();
          if( event.target.tagName.toLowerCase() === "button" ){
              this.props.onChange({'value':this.getValue()});
          }
        }, false);
    }

}


export default XformSearchInput;

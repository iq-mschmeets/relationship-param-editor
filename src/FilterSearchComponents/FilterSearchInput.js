import React from 'react';
import ReactDOM from 'react-dom';


class FilterSearchInput extends React.Component{
    constructor( props ){
        super( props );
        this.state = Object.assign({}, props);
        this.onKeyUp = this.onKeyUp.bind( this );
        this.handleChange = this.handleChange.bind( this );

    }
    onKeyUp(event){
        if( event.keyCode === 13 ){
            this.setState({value: event.target.valule});
            this.props.onChange({'value':this.getValue()});
        } else if( event.keyCode === 27 ){
            // cancel...
        }
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    getValue(){
        return this.state.value;
    }
    componentWillReceiveProps( newProps ){
        this.setState(Object.assign({}, newProps));
    }
    render(){
        return (
            <div className="input-group">
                <input type="text" className="form-control"
                       placeholder="Search..." id="relationship_query"
                       defaultValue={this.props.value}
                       onChange={this.handleChange}
                       onKeyUp={this.onKeyUp}/>
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


export default FilterSearchInput;

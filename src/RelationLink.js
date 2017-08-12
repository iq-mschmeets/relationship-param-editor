import React from 'react';


var placeholder = document.createElement("li");
placeholder.className = "placeholder";


class RelationLink extends React.Component{
    constructor( props ) {
        super( props );
    }
    render(){
        let cname = "list-group-item";
        if( this.props.active ){
            cname += " active";
        }
       return (<li className={cname}
                    data-relation-id={this.props.relationID}
                    onClick={this.props.update}
                >
              {this.props.name}
            </li>);
    }
}

export default RelationLink;

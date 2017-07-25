import React from 'react';

class RelationLink extends React.Component{
  constructor( props ) {
        super( props );
        this._click = this._click.bind( this );
        console.log(props);
  }
  _click(){
  	console.log( this );
  }
  render(){
      let cname = "list-group-item";
      if( this.props.active ){
          cname += " active";
      }
  	return (<li className={cname}
              key={this.props.relationID}
              data-relation-id={this.props.relationID}
              onClick={this.props.update}>
              {this.props.name}
          </li>);
  }
}

export default RelationLink;

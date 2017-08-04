import React from 'react';
import RelationLink from './RelationLink.js';



class RelatedClassList extends React.Component{
	constructor( props ){
        super( props );
        this.state = {
            'selected' : null
        }
        console.log( props );
    }

    handleSelection(evt){
        let rid = Number(evt.target.getAttribute('data-relation-id'));
        this.setState({'selected':rid});
        if( this.props.update ){
            this.props.update( {'selected': rid} );
        }
        console.log( "RelatedClassList: %s, %s", this.state.selected,rid );
    }

	render(){
        let self = this;
  	    return (
			<div>
    	    <h4 className="section-head">Related Classes</h4>
            <ul className="list-group">
	            {this.props.models.map( function(relation, idx){
	            return <RelationLink key={idx}
	                                ref={idx}
	                                relationID={relation.relationID}
	                                name={relation.fkClassName}
									active={relation.relationID === self.state.selected}
	                                update={self.handleSelection.bind(self)}/>
	            })}
            </ul>
            </div>);
  }
}


export default RelatedClassList;

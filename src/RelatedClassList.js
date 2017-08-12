import React from 'react';
import RelationLink from './RelationLink.js';



class RelatedClassList extends React.Component{
	constructor( props ){
        super( props );
        this.state = {
            'selected' : null
        }

		this.handleSelection = this.handleSelection.bind(this);
		this.onMoveDown = this.onMoveDown.bind(this);
		this.onMoveUp = this.onMoveUp.bind(this);
    }

    handleSelection(evt){
        let rid = Number(evt.target.getAttribute('data-relation-id'));
        this.setState({'selected':rid});
        if( this.props.update ){
            this.props.update( {'selected': rid} );
        }
        console.log( "RelatedClassList: %s, %s", this.state.selected,rid );
    }

	onMoveDown(evt){

	}

	onMoveUp(evt){

	}


	/*
	draggable="true"
	onDragEnd={this.dragEnd}
	onDragStart={this.dragStart}
	 */

	render(){
		let cname = "list-group-item";
		console.log("%o, %o",this, this.props);
  	    return (
			<div>
				<div>
		    	    <h4 className="pull-left">Related Classes</h4>
					<div className="btn-group pull-right" style={{marginTop:"10px"}}>
						<button className="btn btn-default btn-xs"
							    onClick={this.onMoveDown}>
							<span className="glyphicon glyphicon-arrow-down" />
						</button>
						<button className="btn btn-default btn-xs"
								onClick={this.onMoveUp}>
							<span className="glyphicon glyphicon-arrow-up" />
						</button>

					</div>
				</div>
				<br style={{clear:"both"}} />
	            <ul className="list-group" >
		            {this.props.models.map( (relation, idx)=>{
						return <RelationLink key={relation.relationID}
				                            ref={idx}
				                            relationID={relation.relationID}
				                            name={relation.fkClassName}
				                            active={relation.relationID === this.state.selected}
				                            update={this.handleSelection}
				                            reorder={this.handleReorder}/>
		            })}
	            </ul>
            </div>);
  }
}


export default RelatedClassList;

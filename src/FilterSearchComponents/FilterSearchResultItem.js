import React from 'react';



class FilterSearchResultItem extends React.Component{
    constructor( props ){
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event){
        if( this.props.onClick ){
            this.props.onClick( this.props.item );
        }
    }
    
    render(){
        return (
            <li key={this.props.item.id}
                onClick={this.onClick}
                data-id={this.props.item.id}
                data-label={this.props.item.label}>
                <span className="itemLabel" >{this.props.item.label} </span>
                <span className="itemID" > {this.props.item.id} </span>
            </li>
        );
    }
}

export default FilterSearchResultItem;

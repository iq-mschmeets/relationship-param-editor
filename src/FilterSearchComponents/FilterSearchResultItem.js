import React from 'react';


/*
{id: 1260, label: "Current Person Address (Parameterized)", type: 20, lookup: "CURRENT_PERSON_ADDRESS"}
 */
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

    getClassForID(){
        return this.props.item.lookup ? 'itemLookup pull-right' : 'itemID pull-right';
    }

    getTitleForID(){
        return this.props.item.lookup ? 'Will use lookup: '+this.props.item.lookup : 'No lookup available.';
    }

    render(){
        return (
            <li key={this.props.item.id}
                onClick={this.onClick}
                data-id={this.props.item.id}
                data-label={this.props.item.label}>
                <span className="itemLabel" >{this.props.item.label} </span>
                <span className={this.getClassForID()} title={this.getTitleForID()}> {this.props.item.id} </span>
            </li>
        );
    }
}

export default FilterSearchResultItem;

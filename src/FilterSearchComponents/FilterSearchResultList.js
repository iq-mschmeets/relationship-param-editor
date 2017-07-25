import React from 'react';
import FilterSearchResultItem from './FilterSearchResultItem.js';



class FilterSearchResultList extends React.Component{
    constructor( props ){
        super( props );
        this.invokeChange = this.invokeChange.bind( this );
    }

    invokeChange( obj ){
        if( this.props.onClick ){
            this.props.onClick( obj );
        }
    }
    render(){
        if( !this.props.items ){ return <ul style={{minHeight:'100px',height:'100px'}}></ul>;}
        return (
            <ul className="filter-search-list list-unstyled">
                {this.props.items.map((item, idx)=>{
                    //var boundHandler = this.invokeChange.bind(this, item);
                    return <FilterSearchResultItem key={idx} item={Object.assign({},item)} onClick={this.invokeChange}/>
                })}
            </ul>
        );
    }
}

export default FilterSearchResultList;

import React from 'react';
import XSLTSearchResultItem from './XSLTSearchResultItem.js';



class XSLTSearchResultList extends React.Component{
    constructor( props ){
        super( props );
        this.invokeChange = this.invokeChange.bind( this );
    }

    invokeChange( obj ){
console.log('XSLT Search res lis invokeChange: %o, %o', obj, this.props.onClick);
        if( this.props.onClick ){
            this.props.onClick( obj );
        }
    }
    render(){
        if( !this.props.items ){ return <ul style={{minHeight:'100px',height:'200px'}}></ul>;}
        return (
            <ul className="filter-search-list list-unstyled">
                {this.props.items.map((item, idx)=>{
                    return <XSLTSearchResultItem key={idx} item={item} onClick={this.invokeChange}/>
                })}
            </ul>
        );
    }
}

export default XSLTSearchResultList;

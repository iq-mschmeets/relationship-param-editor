import React from 'react';



class XSLTSearchResultItem extends React.Component{
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
            <li onClick={this.onClick}>
                <span className="itemLabel" >{this.props.item} </span>
            </li>
        );
    }
}

export default XSLTSearchResultItem;

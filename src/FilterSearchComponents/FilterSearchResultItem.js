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

    getLookupText(){
        let txt = '';
        if( this.props.item.hasOwnProperty('lookup') ){
            txt = React.createElement('strong',{},this.props.item.lookup);
        }
        return txt;
    }

    render(){
        var editURL = "../request/filterEdit?qid="+this.props.item.id;
        var itemStyle = {display:'flex', flexDirection:"row", justifyContent:"space-between"};
        return (
            <li key={this.props.item.id}
                onClick={this.onClick}
                data-id={this.props.item.id}
                data-label={this.props.item.label}
                style={itemStyle}>
                <span className="itemLabel" style={{width:'45%',display:'inline-block'}}>
                    {this.props.item.label}
                </span>
                <span className={this.getClassForID()}
                      style={{width:'45%',display:'inline-block',textAlign:'left'}}
                      title={this.getTitleForID()} >
                    <em>id: {this.props.item.id} </em>
                    <span>
                    {this.getLookupText()}
                    </span>
                </span>
                <a href={editURL} title="Open in editor" style={{width:'10%',display:'inline-block',textAlign:'right'}}>
                    <iq-glyphicon glyph="edit"></iq-glyphicon>
                </a>
            </li>
        );
    }
}

export default FilterSearchResultItem;

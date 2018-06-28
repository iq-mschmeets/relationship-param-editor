import React from 'react';

import XSLTSearchService from './XSLTSearchService.js';
import XformSearchInput from './XformSearchInput.js';
import XSLTSearchResultList from './XSLTSearchResultList';

class XformSearchComponent extends React.Component{
    constructor( props ){
        super( props );
        this.state = {};
        this.invokeSearch = this.invokeSearch.bind( this );
        this.setXformSelection = this.setXformSelection.bind( this );
    }
    render(){
        return(
        <div className="filter-search-component">
            <XformSearchInput onChange={this.invokeSearch} />
            <XSLTSearchResultList items={this.state.searchItems} onClick={this.setXformSelection}/>
        </div>
        );
    }

    invokeSearch(obj){
    console.log("XformSelectionInput.invokeSearch: %o",obj);
        let searchTerm = obj.value;

        var prms = XSLTSearchService( searchTerm );
        prms.then((data)=>{
            let comp = data.files;
            console.log("data:%o",comp);
            this.setState({'searchItems' : comp})
        });
        // How it works for now.
        // Fetch is not as easy as $.ajax, and when used with webpack dev
        // server IQ is not same domain.
        this.setState({'searchItems': []});
    }
    setXformSelection( obj ){
        if( this.props.onXformSelection ){
            this.props.onXformSelection( obj );
        }
    }

}

export default XformSearchComponent;


/*

FilterSearchService( searchTerm )['components']
<FilterSearchInput onChange={this.invokeSearch} />
<FilterSearchResultList items={this.state.searchItems} onClick={this.setFilterSelection}/>
*/

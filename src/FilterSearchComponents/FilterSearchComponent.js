import React from 'react';
import FilterSearchInput from './FilterSearchInput.js';
import FilterSearchResultList from './FilterSearchResultList';
import FilterSearchService from './FilterSearchService';


class FilterSearchComponent extends React.Component{
    constructor( props ){
        super( props );
        this.state = {};
        this.invokeSearch = this.invokeSearch.bind( this );
        this.setFilterSelection = this.setFilterSelection.bind( this );
    }
    render(){
        return(
        <div className="filter-search-component">
            <FilterSearchInput onChange={this.invokeSearch} />
            <FilterSearchResultList items={this.state.searchItems} onClick={this.setFilterSelection}/>
        </div>
        );
    }

    invokeSearch(obj){

        let searchTerm = obj.value;
        // How it should work.
        //.then( (response)=>{return response.json()} )
        var prms = FilterSearchService( searchTerm );
        prms.then((data)=>{
            let comp = data;
            console.log("FilterSearchComponent return data: %o",comp);
            this.setState({'searchItems' : comp})
        });

        // How it works for now.
        // Fetch is not as easy as $.ajax, and when used with webpack dev
        // server IQ is not same domain.
        //this.setState({'searchItems': FilterSearchService( searchTerm )['components']});
    }
    setFilterSelection( obj ){
        if( this.props.onFilterSelection ){
            this.props.onFilterSelection( obj );
        }
    }

}

export default FilterSearchComponent;

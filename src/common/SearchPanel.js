import React from 'react';

import SearchButton from './SearchButton.js'
import SelectInputGroup from './SelectInputGroup.js'


class SearchPanel extends React.Component {
    render() {

        const advSearchStyle = {
            width: '500px',
            margin: '0px auto'
        };
        const searchPanelInputButtonGroup = {
            display: 'flex !important'
        };
        const searchPanelDropDownLG = {
            position: 'static !important'
        };
        const searchPanelDropDownMenu = {
            minWidth: '500px',
            marginTop: '-1px',
            padding: '6px 20px'
        };
        const searchPanelFormGroup = {
            marginLeft: '0px',
            marginRight: '0px'
        };

        return (
            <div className="input-group" style={advSearchStyle}>
                <input type="text" className="form-control" placeholder="Search for filters"/>
                <div className="input-group-btn">
                    <div className="btn-group" role="group" style={searchPanelInputButtonGroup}>
                        <div className="dropdown dropdown-lg" style={searchPanelDropDownLG}>
                            <SearchButton/>
                            <div className="dropdown-menu dropdown-menu-right" role="menu" style={searchPanelDropDownMenu}>
                                <form className="form-horizontal">
                                    <SelectInputGroup/>

                                    <div className="form-group" style={searchPanelFormGroup}>
                                        <label htmlFor="contain">Author</label>
                                        <input className="form-control" type="text"/>
                                    </div>
                                    <div className="form-group" style={searchPanelFormGroup}>
                                        <label htmlFor="contain">Contains the words</label>
                                        <input className="form-control" type="text"/>
                                    </div>
                                    <button type="submit" className="btn btn-primary pull-right">
                                        Search
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchPanel;

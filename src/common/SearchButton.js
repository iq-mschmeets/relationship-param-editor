import React from 'react';

class SearchButton extends React.Component{
  render(){
      const SearchPanelButtonGroupButton = {
        borderRadius: '0px',
        marginLeft: '-1px'
      }
      return (
        <button type="button" className="btn btn-primary dropdown-toggle"
                data-toggle="dropdown" aria-expanded="false"
                style={SearchPanelButtonGroupButton}
                onClick={this.props.onClick}>
          <span className="glyphicon glyphicon-search"></span>
        </button>
      )
  }
}

export default SearchButton;

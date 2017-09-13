import React from 'react';

class EditButton extends React.Component{
  render(){
      const SearchPanelButtonGroupButton = {
        borderRadius: '0px',
        marginLeft: '-1px',
        padding: '9px 12px'
      }
      return (
        <button type="button" className="btn btn-primary dropdown-toggle"
                data-toggle="dropdown" aria-expanded="false"
                style={SearchPanelButtonGroupButton}
                onClick={this.props.onClick}>
          <span className="glyphicon glyphicon-edit"></span>
        </button>
      )
  }
}

export default EditButton;

import React from 'react';

class EditClearButton extends React.Component{
  render(){
      const SearchPanelButtonGroupButton = {
        borderRadius: '0px',
        marginLeft: '-1px',
        padding: '8px 12px'
      }
      return (
        <span>
            <button className="btn btn-warning" type="button" title="Reset value to default"
                    onClick={this.props.onClearClick}
                    style={SearchPanelButtonGroupButton}>
                <span className="glyphicon glyphicon-remove"></span>
            </button>
            <button className="btn btn-primary" type="button"
                    title="Edit value"
                    aria-expanded="false"
                    style={SearchPanelButtonGroupButton}
                    onClick={this.props.onEditClick}>
                <span className="glyphicon glyphicon-edit"></span>
            </button>
        </span>
      )
  }
}

export default EditClearButton;

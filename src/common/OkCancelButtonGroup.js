
import React from 'react';

class OkCancelButtonGroup extends React.Component{
    render(){
        let messagePanel = null;
        if( this.props.saving ){
            messagePanel = <div className="alert alert-info"><h4><em>Saving...</em></h4></div>;
        }
        const styles = {marginTop: '25px',borderTop:'1px solid #eaeaea',paddingTop:'10px'};
        return (<div className="form-group row" style={styles}>
                <div className="col-xs-8">
                    {messagePanel}
                </div>
                <div className="col-xs-4">
                    <div className="btn-group pull-right">
                        <button onClick={this.props.oncancel} className="btn btn-default">Cancel</button>
                        <button onClick={this.props.onok} className="btn btn-success">Save</button>
                    </div>
                </div>
            </div>);
    }
}

export default OkCancelButtonGroup;

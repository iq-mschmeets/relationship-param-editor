import React from 'react';
import postal from 'postal';

import RelatedClassProperties from './RelatedClassProperties.js';


/*
This App should represent the Relationship Properties. For a given Relationship
collection, show a list of related classes, a relation properties form.
The "App" will also need services, for parameters, filter search, maybe xslt search.

*/
const PageBus = window.PageBus;

export default class RelationParamEditor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
           model : {models : props.models}
       };
       this.oncancel = this.oncancel.bind(this);
       this.onok = this.onok.bind(this);
       this.onUpdate = this.onUpdate.bind(this);
//this.handle = PageBus.subscribe('',function(topic,payload){console.log("%s,%o",topic,payload)});
        var that = this;
        this.subscription = postal.subscribe({
           	channel: "class-meta-data",
           	topic: "select-class",
           	callback: this.onUpdate
        });


console.log("RelationParamEditor: props: %o", props);
    }
    stopIt(evt){
        evt.preventDefault();
        evt.stopPropagation();
    }
    onUpdate( data, envelope ){
        // `data` is the data published by the publisher.
        // `envelope` is a wrapper around the data & contains
        // metadata about the message like the channel, topic,
        // timestamp and any other data which might have been
        // added by the sender.
console.log("postal-subscribe: %o, %o", data, envelope);
        this.setState({'model':{'models':data}});
    }
    oncancel(){}
    onok(){}

/*
    render() {
      return (
        <div>
          <button className="btn btn-default" onClick={() => this.openModal()}>Open modal</button>
          <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
            <PanelWrapper>
                <SearchPanel />
            </PanelWrapper>
            <p>
                <button className="btn btn-primary pull-right"
                        onClick={() => this.closeModal()}>Close</button>
            </p>
          </Modal>
        </div>
      )
    }
*/
    render(){
        try{
            var data = this.state.model.models;
console.log("RelationParamEditor.render: data: %o, state: %o", data, this.state);
            return <RelatedClassProperties models={data} />
        }catch(er){
            console.error(er);
            return null;
        }
    }
}




// export default App;
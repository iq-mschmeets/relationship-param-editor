import React from 'react';
import ReactDOM from 'react-dom';
import postal from 'postal';
import registerServiceWorker from './registerServiceWorker';
import RelationParamEditor from './RelationParamEditor';
import './index.css';

export default RelationParamEditor;

// Test data.
const models = [
    {pkColumn: "ELEMENT_ID", name: "Project Person-->Person", pkClassName: "Person", fkClassID: 55,
    fkClassName:"Project Person",fkColumn:"PERSON_ID",
    parameters:{RELATIONSHIP_LABEL: "Portfolio Projects this Person participates in"},
    pkClassID:31,relationID:67
    },
    {fkClassID:53,fkClassName:"Project Organization",fkColumn:"ORGANIZATION_ID",
    name:"Project Organization-->Organization",parameters:{'RELATIONSHIP_QUERY_ID' : 1045},
    pkClassID:34,pkClassName:"Organization",pkColumn:"ELEMENT_ID",relationID:65
    }
];

const PageBus = window.PageBus;

console.log("index.js: App: %o", RelationParamEditor);
try{
// ReactDOM.render(
//     React.createElement( RelationParamEditor, {'models':models}),
//     document.getElementById('propform')
// );
}catch(er){
    console.error( er );
}

//ReactDOM.render( <App models={models} />, document.getElementById('propform'));
// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

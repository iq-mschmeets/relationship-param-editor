
function getSpecification( term ){
    return JSON.stringify({
        id : 0,
        pageNumber : "-1",
        provider : "com.ee.server.requestHandlers.dataSources.services.folder.FolderComponentService",
        locator : {
            "type" : 'filter',
            "query" : term
        }
    });
}

/**
    NOTE: This function currently returns dummy test data if the XHR request
    fails. For Development use only.

*/
function FilterSearchService( term ){

    var respText =  JSON.stringify({"components":[
        {"id":67,"label":"All Filters that query Users","typeId":20},
        {"id":97,"label":"Most Active Users","typeId":20},
        {"id":1204,"label":"Pending Users (All)","typeId":20},
        {"id":88,"label":"Pending users that need attention","typeId":20},
        {"id":1233,"label":"Users in EE_USER Role, but not as default role","typeId":20},
        {"id":1234,"label":"Users in History with no User Record","typeId":20},
        {"id":175,"label":"Users not in EE_USER Role","typeId":20},
        {"id":1235,"label":"Users with Privs but no User Record","typeId":20},
        {"id":174,"label":"Users with mismatched Oracle IDs","typeId":20},
        {"id":1236,"label":"Users with no Named Text Privileges ","typeId":20},
        {"id":1270,"label":"Current Users Person (Parameterized) (Parameterized)","typeId":22}
        ]
    });

    //var data = new FormData();
    //data.append( "requestSpecification", getSpecification( term ) );
    var data = "requestSpecification="+getSpecification(term);

    return new Promise(function(resolve, reject){
        // Do the usual XHR stuff
         var req = new XMLHttpRequest();
         req.open('POST', '../request/jsonData');
         req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
         req.setRequestHeader('Accept' , "application/json");

         req.onload = function() {
           // This is called even on 404 etc
           // so check the status
           if (req.status === 200) {
               console.log("onload.200");
             // Resolve the promise with the response text
             resolve(JSON.parse(req.response));
           }
           else {
               console.log("onload.other");
             // Otherwise reject with the status text
             // which will hopefully be a meaningful error
            //  reject(Error(req.statusText));
                resolve(JSON.parse(respText));
           }
         };

         // Handle network errors
         req.onerror = function() {
           //reject(Error("Network Error"));
           console.log("ONERROR: %o", arguments);
           resolve(JSON.parse(respText));
         };

         // Make the request
         req.send( data );

    });

    /*
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    headers.append('Accept' , "application/json");

    var respText =  JSON.stringify({"components":[
        {"id":67,"label":"All Filters that query Users","typeId":20},
        {"id":97,"label":"Most Active Users","typeId":20},
        {"id":1204,"label":"Pending Users (All)","typeId":20},
        {"id":88,"label":"Pending users that need attention","typeId":20},
        {"id":1233,"label":"Users in EE_USER Role, but not as default role","typeId":20},
        {"id":1234,"label":"Users in History with no User Record","typeId":20},
        {"id":175,"label":"Users not in EE_USER Role","typeId":20},
        {"id":1235,"label":"Users with Privs but no User Record","typeId":20},
        {"id":174,"label":"Users with mismatched Oracle IDs","typeId":20},
        {"id":1236,"label":"Users with no Named Text Privileges ","typeId":20},
        {"id":1270,"label":"Current Users Person (Parameterized) (Parameterized)","typeId":22}
        ]
    });

    var responseLocal = new Response( respText, {'ok':true,'status':200,'Content-Type':'application/json'})


    return fetch('http://localhost:8082/ee/request/jsonData', {
            credentials: 'include',
            method : 'POST',
            headers : headers,
            'body' : 'requestSpecification='+ JSON.stringify({
                id : 0,
                pageNumber : "-1",
                provider : "com.ee.server.requestHandlers.dataSources.services.folder.FolderComponentService",
                locator : {
                    "type" : 'filter',
                    "query" : term
                }
            })
        }).then(function(response){
            console.log(response);
            if( response.status !== 200 ){
                return responseLocal.json();
            }
            return response.json();
        }).catch(function(err){console.log("catch handler: %o",arguments); return responseLocal.json();});


    // prms.fail(function(xhr,text,errorThrown){
    //     console.log("ERROR: %s, %o",text, errorThrown);
    //     deferred.fail( errorThrown );
    // });
    //
    // prms.done( function( data, textStatus, xhr ){
    //     console.log( data );
    //     deferred.resolve( data.components );
    // });
    //
    // return deferred.promise();

    */

}

export default FilterSearchService;

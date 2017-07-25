


/**
Just a stub.
How to reconcile the server returned parameters.
*/
function ParameterService( paramsToSave ){
    //var data = new FormData();
    //data.append( 'parameters', JSON.stringify(paramsToSave) );
    var data = JSON.stringify({'parameters':paramsToSave});

    //var data = "parameters="+


    return new Promise(function(resolve, reject){
        // Do the usual XHR stuff
         var req = new XMLHttpRequest();
         req.open('POST', '../resource/parameter');
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
                resolve(arguments);
           }
         };

         // Handle network errors
         req.onerror = function() {
           //reject(Error("Network Error"));
           console.log("ONERROR: %o", arguments);
           resolve(arguments);
         };

         // Make the request
         req.send( data );

    });


}





export default ParameterService;

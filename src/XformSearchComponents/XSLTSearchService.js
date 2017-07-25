


function XSLTSearchService( term ){
    return new Promise(function(resolve, reject){
        // Do the usual XHR stuff
         var req = new XMLHttpRequest();
         req.open('GET', '../request/xsltList?term='+term);
         req.setRequestHeader('Accept' , "application/json");

         req.onload = function() {
           // This is called even on 404 etc
           // so check the status
           if (req.status === 200) {
               console.log("XSLTSearchService.onload.200");
             // Resolve the promise with the response text
             resolve(JSON.parse(req.response));
           }
           else {
               console.log("XSLTSearchService.onload.other: %o",req);
             // Otherwise reject with the status text
             // which will hopefully be a meaningful error
            //  reject(Error(req.statusText));
                //resolve(JSON.parse(req.response));
                resolve({'files':['No response from server.']});
           }
         };

         // Handle network errors
         req.onerror = function() {
           reject(Error("Network Error"));
           console.log("ONERROR: %o", arguments);

         };

         // Make the request
         req.send( );

    });
}


export default XSLTSearchService;

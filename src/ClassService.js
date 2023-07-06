function ClassService(classID) {
    // console.log("ClassService data: %s",classID);

    return new Promise(function (resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open("GET", "../resource/class/" + classID);
        req.setRequestHeader("Content-type", "application/json");
        req.setRequestHeader("Accept", "application/json");

        req.onload = function () {
            // This is called even on 404 etc
            // so check the status
            if (req.status === 200 || req.status === 201) {
                console.log("ClassService.onload.200");
                // Resolve the promise with the response text
                resolve(JSON.parse(req.response));
            } else {
                console.trace("ClassService.not200: ", req);
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(req);
            }
        };

        // Handle network errors
        req.onerror = function () {
            console.log("ClassService.ONERROR: %o", arguments);
            reject(arguments);
        };

        // Make the request
        req.send();
    });
}

export default ClassService;


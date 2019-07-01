
    function extractSummary(str) {
        var rx = /500 - (.*)\n/g;
        var arr = rx.exec(str);
        if( arr != null && arr.length < 2){ console.log("couldnt get error: ",str); return 'Error';}
        return arr[1];
    }

    export default function getMessageFromXHR( xhr, summary ){
        // var re = new RegExp('^.*?ORA-\d*:\s*([^:]*).*$');
        var txt = xhr.responseText || xhr.response;
        console.log("xhr.responseText: ",txt);
        try{
            var start = txt.indexOf('<b>Message</b>');
            var end = txt.indexOf('<b>Description</b>')
            var prts = txt.split('ORA-');
            if( prts && prts.length > 1 ){
                txt = "ERROR: ORA-"+prts[1];
            } else {
                txt = "ERROR: "+txt.substring(start +10, end-5);
            }
        }catch(er){
            ee.erlog(er);
        }
        return txt;
    }



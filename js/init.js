 var userData = function(){
     var result={};
    fetch("https://ipapi.co/json/")
    .then(response=>response.json())
    .then((responseJson=>{
        console.log(responseJson)
        result=responseJson;
    }))
    return result;
 };
 
 var setAttributes = function(visitorData){s
 sm.getApi({version: 'v1'}).then(function(salemove) {
        salemove.updateInformation({ "customAttributes":{"Country":visitorData['country'], "country_name":visitorData['country_name'], "Quote Recall":"Yes", "currency":visitorData['currency'],"languages":visitorData['languages']}}).then(function() {
            console.log("success");
        }).catch(function(error) {
            console.log("error");
        });
    });
};
console.log("get user data");
var res = userData();
setAttributes(res);
console.log("Init script loaded");
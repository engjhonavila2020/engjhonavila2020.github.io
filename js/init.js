 var userData = function(){
     var result={};
    fetch("https://ipapi.co/json/")
    .then(response=>response.json())
    .then((responseJson=>{
        console.log(responseJson)
        result=JSON.stringify(responseJson);
        console.log("=> "+result);
    }))
    return result;
 };
 
 var setAttributes = function(visitorData){
 sm.getApi({version: 'v1'}).then(function(salemove) {
        salemove.updateInformation({ "customAttributes":{"Country":visitorData['country'], "country_name":visitorData['country_name'], "Quote Recall":"Yes", "currency":visitorData['currency'],"languages":visitorData['languages']}}).then(function() {
            console.log("success");
        }).catch(function(error) {
            console.log("error");
        });
    });
};
console.log("get user info");
var res = userData();
console.log("Parsing results "+res['city']);
setAttributes(res);

console.log("Init script loaded");
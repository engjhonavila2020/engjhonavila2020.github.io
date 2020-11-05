 var userData = function(){

    fetch("https://ipapi.co/json/")
    .then(response=>response.json())
    .then((responseJson=>{
        console.log("send response : "+responseJson);
        setAttributes(responseJson);
    }));
    
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
console.log("Parsing results as js "+res);


console.log("Init script loaded");
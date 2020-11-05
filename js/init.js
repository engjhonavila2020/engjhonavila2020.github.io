 var setAttributes = function(){
 sm.getApi({version: 'v1'}).then(function(salemove) {
        salemove.updateInformation({ "customAttributes":{"State":"MA", "Quote Phase":"bind", "Quote Recall":"Yes", "Insurance Product":"home"}}).then(function() {
            console.log("success");
        }).catch(function(error) {
            console.log("error");
        });
    });
}
setAttributes();
console.log("Init script loaded");
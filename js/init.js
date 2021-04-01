 var userData = function(){

    fetch("https://ipapi.co/json/")
    .then(response=>response.json())
    .then((responseJson=>{
        console.log(responseJson);
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

var requestEngagementOnclick = function(){
    sm.getApi({version: 'v1'}).then(function(salemove) {
        var engagementRequest = salemove.requestEngagement('text');
        engagementRequest.engagementPromise.then(function(engagement) {
          console.log(engagement);
          engagement.chat.sendMessage("Hi from the requestedEngagement");
        }).catch(function(error) {
          if (error.cause === salemove.ERRORS.OPERATOR_DECLINED) {
            console.log("error: ERRORS.OPERATOR_DECLINED");
          } else {
            console.log("error: "+error);
          }
        });
      });
}

var requestSetQueue = function() {
  sm.getApi({version: 'v1'}).then(function(salemove) {
    function onQueueStateUpdate(queueState) {
      if (queueState.state === queueState.QUEUE_STATES.CAN_QUEUE) {
        queueView.addEventListener('click', onClickToQueue);
        queueView.innerText = 'Click to queue.';
      } else if (queueState.state === queueState.QUEUE_STATES.QUEUED) {
        showWaitingView(queueState.ticket);
        salemove.getQueueWaitDuration()
          .then(showWaitingViewWithTimer(queueState.ticket));
      } else if (queueState.state === queueState.QUEUE_STATES.CANNOT_QUEUE) {
        queueView.removeEventListener('click', onClickToQueue);
        queueView.innerText = 'Cannot queue.';
      }
    }

    function onClickToQueue() {
      salemove.queueForEngagement('text').catch(showFailedToQueueView);
    }

    salemove.addEventListener(salemove.EVENTS.QUEUE_STATE_UPDATE, onQueueStateUpdate);
    salemove.addEventListener(salemove.EVENTS.ENGAGEMENT_START, showEngagedView);
    salemove.addEventListener(salemove.EVENTS.ENGAGEMENT_END, showNotEngagedView);
  });
  
}
console.log("get userr info");
var res = userData();  



console.log("Init script loaded");
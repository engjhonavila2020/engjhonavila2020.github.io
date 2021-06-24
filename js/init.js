 var userData = function(){

    fetch("https://ipapi.co/json/")
    .then(response=>response.json())
    .then((responseJson=>{
        console.log(responseJson);
        setAttributes(responseJson);
    }));
    
 };

 var installGlia = function (siteId, callback) {
  var gliaIntegrationScriptUrl = 'https://api.glia.com/salemove_integration.js?site_id=' + siteId;
  var scriptElement = document.createElement('script');

  scriptElement.async = 1;
  scriptElement.src = gliaIntegrationScriptUrl;
  scriptElement.type = 'text/javascript';
  if (typeof (callback) === 'function') {
    scriptElement.addEventListener('load', callback);
  }

  document.head.append(scriptElement);
};

/* 
siteId is a UUID for your site that needs to be requested from your Client Success Manager 
or via our Service Desk https://salemove.atlassian.net/servicedesk/customer/portal/1 
*/
var siteId = '2ef2e3a5-4593-4d9d-994e-f827243cc228';

installGlia(siteId, function () {
  // Any post-install configuration
  console.log("siteId "+siteId);
});





 
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
  var queueView = document.getElementById("startQue");
  var engagementView = document.getElementById('engView');
  changeLocaleDFC();
  

  sm.getApi({version: 'v1'}).then(function(salemove) {
    function onQueueStateUpdate(queueState) {
      if (queueState.state === queueState.QUEUE_STATES.CAN_QUEUE) {
        queueView.addEventListener('click', onClickToQueue);
        
      } else if (queueState.state === queueState.QUEUE_STATES.QUEUED) {
        showWaitingView(queueState.ticket);
        salemove.getQueueWaitDuration()
       

          .then( value => {
            showWaitingViewWithTimer(queueState.ticket); // Success!
          }, reason => {
            console.error(reason);
          });
      } else if (queueState.state === queueState.QUEUE_STATES.CANNOT_QUEUE) {
        queueView.removeEventListener('click', onClickToQueue);
        queueView.innerHTML = 'Cannot queue.';
      }
    }

    function onClickToQueue() {
      salemove.queueForEngagement('text').catch(showFailedToQueueView);
    }

    salemove.addEventListener(salemove.EVENTS.QUEUE_STATE_UPDATE, onQueueStateUpdate);
    salemove.addEventListener(salemove.EVENTS.ENGAGEMENT_START, showEngagedView);
    salemove.addEventListener(salemove.EVENTS.ENGAGEMENT_END, showNotEngagedView);
  });
  function showWaitingView(queueTicket) {
    queueView.innerHTML = 'Hang on.';
    queueView.appendChild(cancelButton(queueTicket));
  }

  function showWaitingViewWithTimer(queueTicket) {
    return function(waitDuration) {
      queueView.innerHTML = 'Hang on. This usually takes ' +
        waitDuration.averageDurationInSeconds + ' seconds.';
      queueView.appendChild(cancelButton(queueTicket));
    };
  }

  function showFailedToQueueView(error) {
    queueView.innerHTML = 'Failed to queue!';
  }

  function showEngagedView(engagement) {
    engagementView.innerText = 'Engaged with ' + engagement.operator.name + '!';
  }

  function showNotEngagedView(engagement) {
    engagementView.innerText = 'Not engaged.';
  }

  function cancelButton(queueTicket) {
    var button = document.createElement('p');
    
    button.setAttribute("class", "paraButton");
    button.innerHTML = ' Click here to cancel.';
    button.addEventListener('click', function() {
      queueTicket.cancel();
    });
    return button;
  }
  
}

var changeLocaleDFC= function(){
  sm.getApi({version: 'v1'}).then(function(api){api.setLocale('DFC-chat-pin')}); 
  sm.logger.log("DFC file loaded");

};


var changeLocaleQ2= function(){
  sm.getApi({version: 'v1'}).then(function(api){api.setLocale('en-US-Q2')}); 
  sm.logger.log("Q2 file loaded");

};
//---------
console.log("get userr info");
var res = userData();  



console.log("Init script loaded");


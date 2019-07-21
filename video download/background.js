var url_search = "https://www.urlgot.com/";
var url_cloud = "https://www.urlgot.profile/*";
function doUrl(){
    chrome.webNavigation.onCompleted.removeListener(doUrl);
	chrome.tabs.sendMessage(tabId, {"message": "paste the url","key":url0});
}
function doSee(){
    chrome.webNavigation.onCompleted.removeListener(doSee);
	chrome.tabs.sendMessage(tabId, {"message": "see the cloud"});
}
function doClick(){
    chrome.webNavigation.onCompleted.removeListener(doClick);
	chrome.tabs.sendMessage(tabId, {"message": "download"});
}
function download1(){
    chrome.downloads.onCreated.addListener(download1);
	chrome.tabs.sendMessage(tabId, {"message": "download begin"});
}
//initial 
var url0;
var tabId;
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
	tabId = activeTab.id;
    chrome.tabs.sendMessage(tabId, {"message": "clicked_browser_action"});
  });
});

//receive
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.joke == "Knock knock"){
			//alert(request.key);
			chrome.tabs.sendMessage(tabId, {"message": "give me the url"});
		}
		else if (request.joke == "url"){
			url0 = request.key;
			chrome.tabs.create({ url: url_search });
			
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				var activeTab = tabs[0];
				tabId = activeTab.id;
			});
			//chrome.tabs.update(tabId,{url: url_search});
			chrome.webNavigation.onCompleted.addListener(doUrl, {url: [{urlMatches : url_search}]});
		}
		else if (request.joke == "cloud"){	
			chrome.webNavigation.onCompleted.addListener(doSee, {url: [{urlMatches : url_search}]});
		}
		else if (request.joke == "cloud page"){	
			chrome.tabs.update(tabId,{url: request.key});
			chrome.webNavigation.onCompleted.addListener(doClick, {url: [{urlMatches : request.key}]});
		}
		else if (request.joke == "download url"){	
			//alert(request.key);
			chrome.tabs.update(tabId,{url: request.key});
			chrome.downloads.onCreated.addListener(download1);	
		}
		else if (request.joke == "close tab"){	
			//alert(request.joke);
			chrome.tabs.remove(tabId, function() { });	
		}
		
	}
)

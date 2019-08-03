var xhr = new XMLHttpRequest();
var publonsUrl='https://publons.com/search/';
var ID;
var u;
var times;
var hindex;
var authorName;
var authorDes;
function pageListener(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tabId, {"message": "paste the ID","content":ID[u]});
        chrome.tabs.onUpdated.removeListener(pageListener);
        return;
    }
};
function Listener(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tabId, {"message": "get the hindex","content":u});
        chrome.tabs.onUpdated.removeListener(Listener);
        return;
    }
};
function saveText(filename, text) {
    var tempElem = document.createElement('a');
    for (var i=0; i<text.length;i++){
        text[i]+="\n";
    }
    tempElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    tempElem.setAttribute('download', filename);
    tempElem.click();
 }
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        tabId = activeTab.id;
        //u=40;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', chrome.extension.getURL('authorID.txt'), true);
        xhr.onreadystatechange = function()
        {
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
            {
                chrome.tabs.sendMessage(tabId, {"message": "clicked_browser_action","content":xhr.responseText});
                //chrome.tabs.sendMessage(tabId, {"message": "get the hindex"});
            }
        };
        xhr.send();
    })       
});
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
        if (request.joke == "Ready"){
            ID= request.key;
            times=ID.length;
            u=0;
            hindex=new Array(times);
            authorName=new Array(times);
            authorDes=new Array(times);
            chrome.tabs.sendMessage(tabId, {"message": "Ready"});
        }
        else if (request.joke == "begin"){
            chrome.tabs.update(tabId,{url: publonsUrl});
            chrome.tabs.onUpdated.addListener(pageListener);
        }
        else if (request.joke == "wait for update"){
            chrome.tabs.onUpdated.addListener(Listener);
        }
        else if (request.joke == "hindex"){
            //alert();
            hindex[u]=request.key;
            authorName[u]=request.name;
            authorDes[u]=request.des;
            u=u+1;
            if (u<times){
                chrome.tabs.update(tabId,{url: publonsUrl});
                chrome.tabs.onUpdated.addListener(pageListener);
            }
            else{
                saveText("A_name.txt", authorName);
                saveText("A_description.txt", authorDes);
                saveText("A_hindex.txt", hindex);
                alert('done!'+ hindex);
            }
            
        }
    }
)



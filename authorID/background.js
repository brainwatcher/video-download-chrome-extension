var p;
var t;
var u;
var t;
var publonsUrl='https://publons.com/search/';
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      tabId = activeTab.id;
      chrome.tabs.sendMessage(tabId, {"message": "clicked_browser_action"});
      //chrome.tabs.sendMessage(tabId, {"message": "get the author number"});
    
    });
});
var authorNum;
var authorID=new Array();
var authorTitle=new Array();
var authorHindex;
function pageListener(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tabId, {"message": "get the article link"});
        //alert();
        /* Now, let's relieve ourselves from our listener duties */
        chrome.tabs.onUpdated.removeListener(pageListener);
        return;
    }
};
function tListener(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tabId, {"message": "get the author number"});
        //alert();
        /* Now, let's relieve ourselves from our listener duties */
        chrome.tabs.onUpdated.removeListener(tListener);
        return;
    }
};

function myListener(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tabId, {"message": "enter the search ID", "content": authorID[u]});
        //alert();
        /* Now, let's relieve ourselves from our listener duties */
        chrome.tabs.onUpdated.removeListener(myListener);
        return;
    }
};
function myListener2(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.tabs.sendMessage(tabId, {"message": "get the hindex"});
        //alert();
        /* Now, let's relieve ourselves from our listener duties */
        chrome.tabs.onUpdated.removeListener(myListener2);
        return;
    }
};
var pageNum;
var articleNum;
var articleLink;
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
        if (request.joke == "pageNum"){
            //pageNum=1;
            pageNum = request.key;
            p=0;
            t=0;
            u=0;
            articleLink = new Array();
            chrome.tabs.sendMessage(tabId, {"message": "get the article link"});
        }
        else if (request.joke == "articleLink"){
            articleLink[request.num+10*p]=request.key;
        }
        else if (request.joke == "articleLinkDone?"){
            p=p+1;
            if(p<pageNum){
                chrome.tabs.sendMessage(tabId, {"message": "next page"});
            }
            else{
                chrome.tabs.sendMessage(tabId, {"message": "articleLinkDone!"});
                articleNum=articleLink.length;
                alert("articleLink "+ articleLink);
            }
        }
        else if (request.joke == "next page link"){
            chrome.tabs.update(tabId,{url: request.key});
            chrome.tabs.onUpdated.addListener(pageListener);
        }
        //
        //
        // begin get the author link and hindex
        else if (request.joke == "get the author link"){
            chrome.tabs.update(tabId,{url: articleLink[t]});
            chrome.tabs.onUpdated.addListener(tListener);
        }

		else if (request.joke == "authorID"){
           // alert("authorName "+request.num + " " + request.key);
            authorID[request.num+u]=request.key;
            authorTitle[request.num+u]=request.title;
        }
        else if(request.joke == "authorNumdone?"){
            //alert("authorLink"+request.num + " " + request.key);
            u = u+request.key; 
            t=t+1; 
            if(t<articleNum) {
            //if(t<2) {    
                chrome.tabs.update(tabId,{url: articleLink[t]});
                chrome.tabs.onUpdated.addListener(tListener);
                //alert(t);
            }
            else{
                //authorNum = u;
                //alert(u);
                //authorHindex=new Array(u);
                

               // alert(authorName);
                saveText("A_title.txt", authorTitle);
                saveText("A_authorID.txt", authorID);
                alert(u+' authors '+authorID);
                u=0;
                //saveText("authorLink.txt", authorLink);
               // 
                //chrome.tabs.sendMessage(tabId, {"message": "section3. get hindex"});
            }   
        }
        //
        //
        //begin for hindex
        else if(request.joke == "go to publons page"){
                chrome.tabs.update(tabId,{url: publonsUrl});
                chrome.tabs.onUpdated.addListener(myListener);
        }
        else if(request.joke == "go to hindex page"){
            chrome.tabs.onUpdated.addListener(myListener2);
        }
        else if(request.joke === "hindex"){
            //alert('hindex[' + i +'] = '+ request.key);
            authorHindex[u]=request.key;
            u=u+1;
            //if(u<10){
            if(u<authorNum){
                chrome.tabs.update(tabId,{url: publonsUrl});
                chrome.tabs.onUpdated.addListener(myListener);   
            }
            else{
                alert('All ' +u + 'authors done!');
                saveText("authorHindex.txt", authorHindex);
                
            }    
        }   
    }
)

function saveText(filename, text) {
    var tempElem = document.createElement('a');
    for (var i=0; i<text.length;i++){
        text[i]+="\n";
    }
    tempElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    tempElem.setAttribute('download', filename);
    tempElem.click();
 }
 //alert(authorName);
            //alert(authorLink);
           // saveText("authorName.txt", authorName);
           // saveText("authorLink.txt", authorLink);
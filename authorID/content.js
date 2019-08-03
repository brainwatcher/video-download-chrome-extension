var node;
var node1;

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if( request.message === "clicked_browser_action" ) {
            console.log('content initial');
            //node = document.querySelectorAll('[title="Find more records by this author"]');
            //node1 =  document.getElementsByClassName("smallV110 snowplow-full-record");
            var pageNumNode =  document.getElementById("pageCount.top");
            var pageNum = document.getElementById("pageCount.top").textContent;
            console.log(pageNumNode);
            console.log('pageNum '+ pageNum);
            chrome.runtime.sendMessage({joke: "pageNum",key: pageNum}, function(response) {
            });
            //console.log(node1);
            //console.log(node1.length);
            //chrome.runtime.sendMessage({joke: "authorNum",key: node.length}, function(response) {
            //});
        }
        else if( request.message === "get the article link" ) { 
            console.log(request.message);
            var articleLink =  document.getElementsByClassName("smallV110 snowplow-full-record");
            for(var i=0 ; i< articleLink.length ; i++){
                console.log(articleLink[i].href);
                chrome.runtime.sendMessage({joke: "articleLink",num: i ,key: articleLink[i].href}, function(response) {
                });
            }
            chrome.runtime.sendMessage({joke: "articleLinkDone?"}, function(response) {
            });
        }
        else if( request.message === "next page" ) {
            var nextPage = document.getElementsByClassName("paginationNext snowplow-navigation-nextpage-top" );
            chrome.runtime.sendMessage({joke: "next page link",key: nextPage[0].href}, function(response) {
            });
        }
        else if( request.message === "articleLinkDone!" ) {
            chrome.runtime.sendMessage({joke: "get the author link"}, function(response) {
            });
        }
        //
        else if( request.message === "get the author number"){
            var authorNode =document.getElementsByClassName("snowplow-RIDnumber");
            var title = document.getElementsByClassName("title");
            console.log(title);
            console.log(title[0].innerText)
            //var authorNode = document.querySelectorAll('[title="Find more records by this author"]');
            console.log(authorNode)
            for(var i=0 ; i<(authorNode.length-1); i++){
                var authorID = authorNode[i].innerText;
                console.log(authorID);
                chrome.runtime.sendMessage({joke: "authorID",num: i ,key: authorID, title :title[0].innerText }, function(response) {
                });    
            }
            chrome.runtime.sendMessage({joke: "authorNumdone?",key: (authorNode.length-1)}, function(response) {
            });
        }
        //
        //
        else if (request.message ==="section3. get hindex"){
            chrome.runtime.sendMessage({joke: "go to publons page"}, function(response) {
            });
        }
        else if (request.message === "enter the search ID"){
            //console.log(request.message);
            //console.log(request.content);
            var search=document.getElementsByClassName("textfield right-control");
            //console.log(search)
            var searchc=search[0].childNodes;
            //console.log(searchc);
            //console.log(searchc[0]);
            searchc[0].setAttribute('value',request.content);
            var button = document.getElementsByClassName("search-button");
            console.log(button);
            button[0].click();
            chrome.runtime.sendMessage({joke: "go to hindex page"}, function(response) {
            });
        }

            /*console.log(request.message);
            try {
                var citationNode = document.querySelectorAll('[title="View Citation Report"]');
                console.log(citationNode);
                chrome.runtime.sendMessage({joke:"citation report",key: citationNode[0].href}, function(response) {
                });
            }
            catch(err){
                chrome.runtime.sendMessage({joke:"citation report",key: "no exact href"}, function(response) {
                });
            }
            */
        

        else if(request.message ==="get the hindex"){
                console.log('DOM fully loaded and parsed');
                try {
                    var parent = document.getElementsByClassName("left-bar-figure left-bar-figure-large");
                    var hindex0 = parent[0].childNodes[3].innerText;
                    var hindexsplit = hindex0.split(/(\s+)/);
                    var hindex= hindexsplit[0];
                    console.log('hindex = '+ hindex );
                    chrome.runtime.sendMessage({joke:"hindex", key: hindex}, function(response) {
                    });
                }
                catch(err)
                {   
                    var hindex=-1;
                    chrome.runtime.sendMessage({joke:"hindex", key: hindex}, function(response) {
                    });
                }
        }
    }
)

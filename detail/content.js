var ID;
var hindex;
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if( request.message === "clicked_browser_action" ) {
            ID = request.content.split(',');
            console.log(ID);
            chrome.runtime.sendMessage({joke: "Ready",key:ID}, function(response) {
            }); 
        }
        else if ( request.message === "Ready" ) {
            chrome.runtime.sendMessage({joke: "begin"}, function(response) {
            }); 
        }
        else if ( request.message === "paste the ID" ) {
            var search=document.getElementsByClassName("textfield right-control");
            var searchc=search[0].childNodes;
            searchc[0].setAttribute('value',request.content);
            var button = document.getElementsByClassName("search-button");
            console.log(button);
            button[0].click();
            chrome.runtime.sendMessage({joke: "wait for update"}, function(response) {
            }); 
        }
        else if(request.message ==="get the hindex"){
            console.log('author num'+request.content);
            var author = document.getElementsByClassName("margin-right-md"); 
            if (author.length==0){
                chrome.runtime.sendMessage({joke:"hindex", key: -1, name:"no exist",des:"no exist"}, function(response) {
                });
                return;
            }
            else{
                var authorName = author[0].textContent;
                var authorDesNode =  document.getElementsByClassName("researcher-card-institution");
                var authorDes = authorDesNode[0].textContent;
                console.log(authorName);
                console.log(authorDes);
                Auto = window.setInterval(function(){
                    var parent = document.getElementsByClassName("left-bar-figure left-bar-figure-large");
                    console.log(parent);
                    if(parent.length==0){
                        hindex=-1;
                        console.log('hindex = '+ hindex );
                        clearInterval(Auto);
                        chrome.runtime.sendMessage({joke:"hindex", key: hindex, name:authorName,des:authorDes}, function(response) {
                        });
                        return;
                    }
                else{
                        var hindex0 = parent[0].childNodes[3].innerText;
                        var hindexsplit = hindex0.split(/(\s+)/);
                        var hindex= hindexsplit[0];
                        console.log('hindex = '+ hindex );
                        if(hindex!='-'){
                            clearInterval(Auto);
                            console.log('hhh hindex = '+ hindex );
                            chrome.runtime.sendMessage({joke:"hindex", key: hindex, name:authorName,des:authorDes}, function(response) {
                            });
                        }
                    }
                })
            }  
            
        }

    }
)






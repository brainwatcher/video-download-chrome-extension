//initial
var download_link_num = 1;
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if( request.message === "clicked_browser_action" ) {
			console.log('content initial');
			chrome.runtime.sendMessage({joke: "Knock knock",key:"initial from content"}, function(response) {
			});
		}
		else if(request.message === "give me the url" ) {
			var url0 = window.location.toString();
			console.log('record current url');
			chrome.runtime.sendMessage({joke: "url",key:url0}, function(response) {
			});
		}
		else if(request.message === "paste the url" ) {
			console.log('paste the url '+request.key);
		
			document.getElementById('mediaWebUrl').setAttribute('value',request.key);
			document.getElementById("parseButton").click();
			chrome.runtime.sendMessage({joke: "cloud",key:url0}, function(response) {
			});
			
		}
		else if(request.message === "see the cloud" ) {
			console.log(request.message);
			var x = document.getElementsByClassName("button button-rounded button-primary button-tiny cloudDownload");
			var xlength=document.getElementsByClassName("button button-rounded button-primary button-tiny cloudDownload").length;
			console.log(x);
			console.log(xlength);
			x[xlength-download_link_num].click();
			var label0=document.getElementsByClassName("button button-rounded button-primary button-tiny cloudDownload").length;
			console.log("label0 = " + label0);
			Auto = window.setInterval(function(){
				var label=document.getElementsByClassName("button button-rounded button-primary button-tiny cloudDownload").length;
				console.log('Hi '+ label);
				if(label!=label0){
					var y = document.getElementsByClassName("button button-action button-rounded button-tiny");
					var ylength = document.getElementsByClassName("button button-action button-rounded button-tiny").length;
					var yhref = y[ylength-1].href;
					console.log('quit normally');
					chrome.runtime.sendMessage({joke: "cloud page",key:yhref}, function(response) {
					});
					clearInterval(Auto);	
				}
				  /// call your function here
			}, 2000);		
		}
		else if(request.message === "download" ) {
			console.log(request.message);
			var zhref = document.getElementById("fileDownloadBtn").href;
			chrome.runtime.sendMessage({joke: "download url",key:zhref}, function(response) {
			});	
		}
		else if(request.message === "download begin" ) {
			console.log(request.message);
			chrome.runtime.sendMessage({joke: "close tab"}, function(response) {
			});
		}
			
	}
);


/*
port.onMessage.addListener(function(msg) {
	if (msg.question == "Knock knock success!"){
		console.log(msg.question);
		var url0 = window.location.toString();
		port.postMessage({joke: "url",key: url0});
	}
	else if (msg.question == "Next"){
		//alert(msg.question);
	}
	
})

	
/*
port.onMessage.addListener(function(msg) {
	console.assert(port.name == "click");
	if (msg.background == "step1"){
		console.log('back');
	}
});
var logout = document.getElementById('ytbInfo');
			console.log("hello");
			var x = document.getElementsByClassName("button button-action button-rounded button-tiny");
			var xlength = document.getElementsByClassName("button button-action button-rounded button-tiny").length;
			var xhref = x[xlength-1].href;
			//console.log(xlength);
			//console.log(x[xlength-1]);
			console.log(xhref);
			//port.postMessage({url: xhref});
*/
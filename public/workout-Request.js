

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
	alert("Loaded buttons");

	document.getElementById('wSubmit').addEventListener('click', function(event) {
		alert("clicked");
		viewLog(event);
	});	
}


function viewLog(event){
	
	var req = new XMLHttpRequest();
	req.open('GET', 'http://52.24.243.214:3000/view', true);

	req.addEventListener('load', function() {
		if(req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			console.log(response);
			
			for (var i in response) {
				console.log("Name " + response[i].name + "\n");
				console.log("ID " + response[i].id + "\n");
				console.log("Done " + response[i].done + "\n");
				console.log("Due " + response[i].done + "\n");	
			}
	
		}
		else {
			console.log("Error in network request: " + request.statusText);
		}
	});
	req.send(null);
	event.preventDefault();
}
	/*
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);

	xhr.onload = function(){
		if(xhr.status === 200){
			var responseObject = JSON.parse(xhr.responseText);
			console.log(responseObject);
			console.log("server OK");
		}
	};

	xhr.send(null);
	event.preventDefault();
	
}
*/

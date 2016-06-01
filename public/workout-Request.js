

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
	alert("Loaded buttons");

	document.getElementById('wSubmit').addEventListener('click', function(event) {
		alert("clicked");
		addWorkout(event);
		viewLog(event);
	});	
}


function addWorkout(event) {
	//Base URL for 'insert' request
	var url = 'http://52.24.243.214:3000/insert?';
	
	//Get workout Name
	var name = document.getElementById('wName').value;
	console.log("Name: " + name);
	if (name === '') {
		name = undefined;
	}
	else {
		// Add workout if not blank
		url = url + 'name=' + name + '&';
	}
	console.log("Name after: " + name);
	
	//Get workout Reps 
	var reps = document.getElementById('wReps').value;
	console.log("Reps: " + reps);
	if (reps === '') {
		reps = undefined;

	}
	else {
		// Add reps if not blank
		url = url + 'reps=' + reps + '&';
	}
	console.log("Reps after: " + reps);
	
	//Get workout weight
	var weight = document.getElementById('wWeight').value;
	console.log("Weight: " + weight);
	if (weight === '') {
		weight = undefined;
	}
	else {
		// Add weight if not blank	
		url = url + 'weight=' + weight + '&';
	}
	console.log("Weight after: " + weight);

	//Get workout date
	var date = document.getElementById('wDate').value;
	console.log("Date before: " + date);
	if (date === '') {
		date = undefined;
	}
	else {
		// Add date if not blank
		url = url + 'date=' + date + '&';
	}
	console.log("Date after: " + date);
	
	//Get workout units (pound or kilogram)
	var lbs = document.getElementById('wlbs').checked;
	var kgs = document.getElementById('wkgs').checked;
	console.log("Pounds before: " + lbs);
	if (lbs === true) {
		// Add workout in pounds
		console.log("in pounds");
		lbs = 1;
		url = url + 'lbs=' + lbs;  
	}
	else if (kgs === true ) {
		// Add workout in kilograms
		console.log("in kgs");
		lbs = 0;
		url = url + 'lbs=' + lbs;
	}	
	else {
		console.log("unit not selected");
		lbs = undefined;
	}
	console.log("Pounds after: " + lbs);

	console.log("Url: " + url);

	var insert = new XMLHttpRequest();
	insert.open('GET', url, true);

	insert.addEventListener('load', function() {
		if(insert.status >= 200 && insert.status < 400) {
			console.log("Insertion successful");
		}
		else {
			console.log("Error in network request: " + insert.statusText);
		}
	});
	insert.send(null);
	event.preventDefault();	
	
	
	
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
				console.log("Reps " + response[i].reps + "\n");
				console.log("Weight " + response[i].weight + "\n");
				console.log("Date " + response[i].date + "\n");
				console.log("Lbs " + response[i].lbs + "\n");	
			}
	
		}
		else {
			console.log("Error in network request: " + req.statusText);
		}
	});
	req.send(null);
	event.preventDefault();
}
	

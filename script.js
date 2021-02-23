// Event Datastructure
class tevent {
	constructor (title, type, repeat, start, end, description, clicked) {
		this.title = title;
		this.type = type;
		this.repeat = repeat;
		this.start = start;
		this.end = end;
		this.description = description;
		this.color = "";
		this.clicked = clicked;
	}

	get getclicked() {
		return this.clicked;
	}

	/**
	 * @param {any} x
	 */
	set sclicked(x) {
		this._clicked = x;
	}
}


// Bootstrap Declarations
// for popovers
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
	return new bootstrap.Popover(popoverTriggerEl)
})

var eventData = new Map();
var corner_size = "1-9am";

// Global Variables
var gridDrag = false;
var clickdown = false;
var curclick = -1;
var curclickend = -1;

// Helper Functions ///////////////////////////////////////////////////////////////////////////////
function convertidtoTime (string) {
	var ans = "";
	for (var i=2; i<string.length; i++) {
		if (string[i] == "a" || string[i] == "p") break;
		ans += string[i];
	}
	return ans;
}

function timetonum(string) {
	var ans = "";
	for (var i=0; i<string.length; i++) {
		if (string[i] == ":") break;
		ans += string[i];
	}
	ans = parseInt(ans);
	if (string[string.length-2] == "p") ans += 12
	return ans;
}

function createEvent (title, type, des, start ,end) {
	let tmp = new tevent(title, type, 1, start, end, des, curclick);
	let id = curclick[0] + ": " + timetonum(start) + "-" + timetonum(end);
	eventData.set(id, tmp);
	return id;
}
///////////////////////////////////////////////////////////////////////////////////////////////////

// Initialize cells
function initcells() {
	var a = document.getElementsByClassName("cells");
	for (var i=0; i<a.length; i++) {
		a[i].addEventListener("mouseover", function( event ) {
			if (clickdown == true && gridDrag == true) {
				var curday = curclick[0];
				if (this.id[0] == curday) {
					this.style.backgroundColor = '#34EBE5';
				}
			} else {
				this.style.backgroundColor = '#34EBE5';
				document.body.style.cursor = 'crosshair';
			}
		}, false);

		a[i].addEventListener("mouseout", function( event ) {
			if (gridDrag == true && clickdown == true) {

			} else {
				this.style.backgroundColor = 'white';
				document.body.style.cursor = 'default';
			}
		}, false);

		a[i].addEventListener("mousedown", function( event ) {
			// highlight the mouseover target
			//a[i].style.backgroundColor = 'white';
			this.style.backgroundColor = '#34EBE5';
			document.body.style.cursor = 'row-resize';
			clickdown = true;
			curclick = this.id;
		}, false);

		a[i].addEventListener("mouseup", function( event ) {
			// highlight the mouseover target
			//a[i].style.backgroundColor = 'white';
			this.style.backgroundColor = 'green';
			gridDrag = false;
			clickdown = false;
			curclickend = this.id;
			console.log(this);
			// we create a popup modal here
			let modal = new bootstrap.Modal(document.getElementById('timeModal'), {
			});
			modal.show();

			let reset = document.getElementsByClassName("cells");
			for (let i=0; i<reset.length; i++) {
				reset[i].style.backgroundColor = "white";
			}
		}, false);
	}
}

// Setting up all the documents event listener
// For detecting movement in the grid -> changing cursor
document.getElementById("gridting").addEventListener("mousemove", function (event) {
	gridDrag = true;
	if (clickdown == true) {
		document.body.style.cursor = 'row-resize';
	}
});

// Setting up the modal -> creating the eventmodal for the when it appears
var timemodal = document.getElementById('timeModal')
timemodal.addEventListener('show.bs.modal', function (event) {
	var reset = timemodal.querySelectorAll('.form-check-input');
	for (var i=0; i<reset.length; i++) {
		reset[i].checked = false;
	}
	timemodal.querySelector("#eventtitlemodal").value = "";
	timemodal.querySelector("#eventtypemodal").value = "";
	timemodal.querySelector("#eventdesmodal").value = "";

	getcurday = curclick[0];
	if (getcurday == 1) {
		timemodal.querySelector('#rMon').checked = true;
	} else if (getcurday == 2) {
		timemodal.querySelector('#rTue').checked = true;
	} else if (getcurday == 3) {
		timemodal.querySelector('#rWed').checked = true;
	} else if (getcurday == 4) {
		timemodal.querySelector('#rThu').checked = true;
	} else if (getcurday == 5) {
		timemodal.querySelector('#rFri').checked = true;
	} else if (getcurday == 6) {
		timemodal.querySelector('#rSat').checked = true;
	} else {
		timemodal.querySelector('#rSun').checked = true;
	}

	let start = timemodal.querySelectorAll('.modalstart');
	start[0].innerHTML = convertidtoTime(curclick) + ":00" + curclick[curclick.length-2] + curclick[curclick.length-1];
	start[1].innerHTML = convertidtoTime(curclick) + ":15" + curclick[curclick.length-2] + curclick[curclick.length-1];
	start[2].innerHTML = convertidtoTime(curclick) + ":30" + curclick[curclick.length-2] + curclick[curclick.length-1];
	start[3].innerHTML = convertidtoTime(curclick) + ":45" + curclick[curclick.length-2] + curclick[curclick.length-1];
	start[4].innerHTML = parseInt(convertidtoTime(curclick))+1 + ":00" + curclick[curclick.length-2] + curclick[curclick.length-1];

	start = timemodal.querySelectorAll('.modalend');
	start[0].innerHTML = parseInt(convertidtoTime(curclickend))+1 + ":00" + curclickend[curclickend.length-2] + curclickend[curclickend.length-1];
	start[1].innerHTML = convertidtoTime(curclickend) + ":45" + curclickend[curclickend.length-2] + curclickend[curclickend.length-1];
	start[2].innerHTML = convertidtoTime(curclickend) + ":30" + curclickend[curclickend.length-2] + curclickend[curclickend.length-1];
	start[3].innerHTML = convertidtoTime(curclickend) + ":15" + curclickend[curclickend.length-2] + curclickend[curclickend.length-1];
	start[4].innerHTML = convertidtoTime(curclickend) + ":00" + curclickend[curclickend.length-2] + curclickend[curclickend.length-1];
});

// function to create the event once button is clicked -> add checker to make sure information is passed
var y = document.getElementById("dick");
y.onclick = function () {
	var start = parseInt(document.getElementById("start").value);
	var end = parseInt(document.getElementById("end").value);
	if (end <= start) {
		let msg = `Invalid Input: Currently the only valid inputs are when the start time is strictly
		earlier than the end time. We are currently expanding the avaliable combinations :)`;
		document.getElementById("exampleModal").childNodes[1].childNodes[1].appendChild(createAlert(msg));
		return;
	}

	//create the header row
	var curgrid = document.getElementById("gridting");
	curgrid.innerHTML = daysTemplate

	//update the root information
	document.documentElement.style.setProperty('--rowNum', end-start);
	document.documentElement.style.setProperty('--start', start);
	document.documentElement.style.setProperty('--end', end);

	//update the row
	for (var i=start; i<end; i++) {
		var tmp = document.createElement("div");
		tmp.className = "row2";
		tmp.innerHTML = rowTemplate(i);
		document.getElementById("gridting").appendChild(tmp);
	}
	initcells();

	//we gotta insert the stuff again
	var tmp_event_data = new Map(); // new tmp map
	for (let[k, v]of eventData) {//k -> id, v -> event data
		//console.log(k,v.start, v.end);
		let new_start = timetonum(v.start); // current event's start
		let new_end = timetonum(v.end); // current event's end
		let start_12h = valuetostring(start); // new start string
		let end_12h = valuetostring(end); // new end string

		//reset the sizing cell
		corner_size = document.querySelector(".cells").id;

		//check to make sure event is still valid if not delete
		if (new_start >= end || new_end <= start) {
			console.log("we are deleting:", k);
			document.getElementById(k).remove();
			eventData.delete(k);
			continue;
		}

		let new_id = k;
		//if the time slots affect it -> check affect start/ end/ both
		if (start > new_start && end < new_end) {
			//console.log(k + ": adjusts for start and end");
			v.start = start_12h;
			v.end = end_12h;
			v.clicked = k[0] + "-" + valuetoCellID(start);
			new_id = k[0] + ": " + start + "-" + end;
		} else {
			if (start > new_start) {
				//console.log(k + ": adjusts for start");
				v.start = start_12h;
				v.clicked = k[0] + "-" + valuetoCellID(start);
				new_id = k[0] + ": " + start + "-" + new_end;
			} else if (end < new_end) {
				//console.log(k + ": adjusts for end");
				v.end = end_12h;
				new_id = k[0] + ": " + new_start + "-" + end;
			}
		}
		updateEventSizing(k, corner_size, v.start, v.end, new_id, v.clicked);
		tmp_event_data.set(new_id, v);
		document.getElementById(new_id).setAttribute("title", v.title + ` (${v.start} - ${v.end})`);
		//console.log("--------------------------")
	}
	eventData = tmp_event_data;
	$('#exampleModal').modal('hide');
}

var eventbutton = document.getElementById("neweventbutton");
eventbutton.onclick = function () {
	let newevent = document.getElementById('timemodal');
	let title = document.getElementById('eventtitlemodal').value;
	let type = document.getElementById('eventtypemodal').value;
	let des = document.getElementById('eventdesmodal').value;
	//need to do check her to make sure that start is before end
	let start = document.getElementById("curstime").value;
	let end = document.getElementById("curetime").value;
	if (title == "" || des == "") {
		let msg = `Invalid Input: Missing title and/or description, please enter this information and 
		try again.`;
		document.getElementById("timeModal").childNodes[1].childNodes[1].appendChild(createAlert(msg));
		return;
	}

	//WE CHECK IF THIS EVENT CAN BE ADDED 
	for (let [k,v] of eventData) {
		console.log(curclick,":", timetonum(start), timetonum(v.end), timetonum(v.start), timetonum(end));
		if (curclick[0] != v.clicked[0]) continue;
		console.log(timetonum(start), timetonum(v.end), timetonum(end), timetonum(v.start));
		if (timetonum(v.start) < timetonum(end) || timetonum(start) > timetonum(v.end)) {
			let msg = `Invalid Input: The times you have selected clash with another event. Please
			enter a different time slot.`;
			document.getElementById("timeModal").childNodes[1].childNodes[1].appendChild(createAlert(msg));
			return;
		}
	}

	if (timetonum(end) <= timetonum(start)) {
		let msg = `Invalid Input: The start time you selected is later than your end time. Please
		enters a valid start and end time.`;
		document.getElementById("timeModal").childNodes[1].childNodes[1].appendChild(createAlert(msg));
		return;
	}

	cur_id = createEvent(title, type, des, start, end, curclick);
	var event_tmp = createEventObject(cur_id, des, title, start, end, corner_size, curclick);
	createPopover(event_tmp, cur_id);
	$('#timeModal').modal('hide');
}

////////////////////////////////////////////////////////////////////////////////////////// fix from here
window.addEventListener('resize', function () {
	for (let[k, v]of eventData) {
		document.getElementById(k).style.transform = "translate(" + document.getElementById(v.getclicked).offsetLeft + "px," + document.getElementById(v.getclicked).parentNode.offsetTop +"px)";
		document.getElementById(k).style.width  = document.getElementById(corner_size).clientWidth + "px";
		let event_tmp = document.getElementById(k);
		//might do dynamic resizing here
		if (document.getElementById(k).clientHeight < document.getElementById(k).scrollHeight) {
			console.log("we have an overflow");
			event_tmp.style.display = "flex";
			event_tmp.style.alignItems = "center";
			event_tmp.style.justifyContent = "center"
			event_tmp.innerHTML = `
			<button id="d${k}" class="eventDelete" type="button"></button>
			<h5 style="color: white; word-wrap: break-word; margin-bottom: 0px; font-size: 1.3vw;">HOVER ME!</h5>`;
		} else if (document.getElementById(k).clientHeight > document.getElementById(k).scrollHeight) {
			event_tmp.style.display = "block";
			event_tmp.style.alignItems = "stretch";
			event_tmp.style.justifyContent = "stretch";
			event_tmp.innerHTML = `
				<button id="d${k}" class="eventDelete" type="button"></button>
				<h5 style="color: white; word-wrap: break-word; margin-bottom: 0px; font-size: 1.3vw;">${v.title}</h5>
				<p style="color: white; word-wrap: break-word; margin-bottom: 4px; font-size: 0.7vw;">(${v.start} - ${v.end})</p>
				<div style="border-bottom: 1px solid white; margin-bottom: 2px;"></div>
				<p style="color: white; word-wrap: break-word; font-size: 0.9vw;">${v.description}</p>
			`;
		}
		var popover = bootstrap.Popover.getInstance(document.getElementById(k));

		document.getElementById("d" + k).addEventListener("mouseenter", function () {
			popover.hide();
		});
		document.getElementById("d" + k).addEventListener("mouseleave", function () {
			popover.show();
		});
		document.getElementById("d" + k).addEventListener("click", function () {
			this.parentElement.remove();
		});
	}
});

const reset_button = document.getElementById("reset");
reset_button.addEventListener("click", function () {
	let boxes = document.getElementsByClassName("box");
	console.log("trying to delete");
	for (let i=boxes.length-1; i>=0; i--) {
		console.log(boxes[i]);
		boxes[i].remove();
	}
	eventData = new Map();
});

// main function 
let title = "Event Title"
let type = "unknown"
let des = "Add a short or long description of this event :D"
let start = "11:00am";
let end = "5:00pm";
let clicked = "1-11am";
curclick = clicked;
cur_id = createEvent(title, type, des, start, end, clicked);
var event_tmp = createEventObject(cur_id, des, title, start, end, corner_size, clicked);
createPopover(event_tmp, cur_id);
document.getElementById(cur_id).style.backgroundColor = "red";

title = "Welcome!";
des = "Hello, this a simple website that allows you to create a weekly timetable to help you keep track of your routine.";
start = "9:00am";
end = "4:00pm";
clicked = "3-9am";
curclick = clicked;
cur_id = createEvent(title, type, des, start, end, clicked);
var event_tmp = createEventObject(cur_id, des, title, start, end, corner_size, clicked);
createPopover(event_tmp, cur_id);
document.getElementById(cur_id).style.backgroundColor = "dodgerBlue";

title = "Reset Button"
des = "The button above when clicked will delete all events in the current grid. Click it to get started!!!"
start = "9:00am";
end = "1:00pm";
clicked = "7-9am";
curclick = clicked;
cur_id = createEvent(title, type, des, start, end, clicked);
var event_tmp = createEventObject(cur_id, des, title, start, end, corner_size, clicked);
createPopover(event_tmp, cur_id);
document.getElementById(cur_id).style.backgroundColor = "darkViolet";

title = "Clock Button"
des = "Use this button to change the start and end times, it will dynamically resize and delete events."
start = "10:00am";
end = "2:00pm";
clicked = "2-10am";
curclick = clicked;
cur_id = createEvent(title, type, des, start, end, clicked);
var event_tmp = createEventObject(cur_id, des, title, start, end, corner_size, clicked);
createPopover(event_tmp, cur_id);
document.getElementById(cur_id).style.backgroundColor = "darkViolet";

title = "Dynamic Sizing"
des = "When event information cannot fit inside the allocated space the information will look like this."
start = "11:00am";
end = "12:00am";
clicked = "4-11am";
curclick = clicked;
cur_id = createEvent(title, type, des, start, end, clicked);
var event_tmp = createEventObject(cur_id, des, title, start, end, corner_size, clicked);
createPopover(event_tmp, cur_id);
document.getElementById(cur_id).style.backgroundColor = "#088400";

title = "Instructions"
des = "Click and drag and then release within the grid to create a new event. Then enter some information and watch the information appear."
start = "1:00pm";
end = "5:00pm";
clicked = "5-1pm";
curclick = clicked;
cur_id = createEvent(title, type, des, start, end, clicked);
var event_tmp = createEventObject(cur_id, des, title, start, end, corner_size, clicked);
createPopover(event_tmp, cur_id);
document.getElementById(cur_id).style.backgroundColor = "Orange";

title = "Gym & Lunch"
des = "Gym with an instructor. Remember to bring towel and water!"
start = "10:00am";
end = "3:00pm";
clicked = "6-10am";
curclick = clicked;
cur_id = createEvent(title, type, des, start, end, clicked);
var event_tmp = createEventObject(cur_id, des, title, start, end, corner_size, clicked);
createPopover(event_tmp, cur_id);
document.getElementById(cur_id).style.backgroundColor = "red";

title = "More Features"
des = "More features and updates will be coming!!"
start = "3:00pm";
end = "6:00pm";
clicked = "4-3pm";
curclick = clicked;
cur_id = createEvent(title, type, des, start, end, clicked);
var event_tmp = createEventObject(cur_id, des, title, start, end, corner_size, clicked);
createPopover(event_tmp, cur_id);
document.getElementById(cur_id).style.backgroundColor = "red";

title = "Link"
des = "Link to repository: https://github.com/a-x-liu/a-x-liu.github.io"
start = "3:00pm";
end = "6:00pm";
clicked = "7-3pm";
curclick = clicked;
cur_id = createEvent(title, type, des, start, end, clicked);
var event_tmp = createEventObject(cur_id, des, title, start, end, corner_size, clicked);
createPopover(event_tmp, cur_id);
document.getElementById(cur_id).style.backgroundColor = "dodgerblue";

/*for (let[k,v] of eventData) {
	console.log(k,v);
}*/

initcells();

//MUST WAIT CHECK TO DELETE FOR THE CHECK WHEN RESIZING
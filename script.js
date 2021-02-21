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

//for popovers
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

var corner_size = "1-9am";

//key: day and time slot (id should match the html id) -> value: event
var eventData = new Map();

var event_tmp = document.createElement("div");
event_tmp.innerHTML = '<div class="box"></div>';
event_tmp.style.width = document.getElementById("1-9am").offsetLeft;

function convertidtoTime (string) {
	var ans = "";
	for (var i=2; i<string.length; i++) {
		if (string[i] == "a" || string[i] == "p") break;
		ans += string[i];
	}
	return ans;
}


var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
})

var gridDrag = false;
var clickdown = false;
var curclick = -1;
var curclickend = -1;

document.getElementById("gridting").addEventListener("mousemove", function (event) {
	gridDrag = true;
	if (clickdown == true) {
		document.body.style.cursor = 'row-resize';
	}
});

var timemodal = document.getElementById('timeModal')
timemodal.addEventListener('show.bs.modal', function (event) {
	// need to deal with
	// - start is later than end
	// - mouse up on a different day -> we just do the same time on the same day

	//reset everything -> repeat title type des
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

function rowdrag() {
	var a = true;
}

function initcells() {
	var a = document.getElementsByClassName("cells");
	for (var i=0; i<a.length; i++) {
		a[i].addEventListener("mouseover", function( event ) {
			// highlight the mouseover target
			//a[i].style.backgroundColor = 'blue';
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
			// highlight the mouseover target
			//a[i].style.backgroundColor = 'white';
			//if drag equal tru
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

initcells();

var y = document.getElementById("dick");

y.onclick = function () {
	var start = parseInt(document.getElementById("start").value);
	var end = parseInt(document.getElementById("end").value);

	if (end <= start) return;

	var curgrid = document.getElementById("gridting");
	var childs = curgrid.children;
	curgrid.innerHTML = `<div class="row2">
							<div class="corner">
								<!-- <a tabindex="0" class="btn btn-lg btn-danger" role="button" data-toggle="popover" data-trigger="focus" title="Dismissible popover" data-content="And here's some amazing content. It's very engaging. Right?">Dismissible popover</a> -->
								<!-- <button type="button" id = "dick" class="btn btn-outline-secondary" data-toggle="popover" data-placement="top" title="adjust times" data-html="true">
									<svg class = "clock-hover" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16" style="display:flex;">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
									</svg>
								</button> -->
								<!-- <a tabindex="0" id="dick" class="btn btn-outline-secondary" role="button" data-bs-toggle="popover" data-bs-placement="right" title="Dismissible popover" data-bs-html="true" sanitize="false" data-bs-content='
								<h1>hello there</h1>
								<div class="mb-3">
									yoooooo nigella
									<label for="exampleFormControlInput1" class="form-label">Email address</label>
									<input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
								</div>
								'>
									<svg class = "clock-hover" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16" style="display:flex;">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
									</svg>
								</a> -->
							
								<!-- <button id = "dick" class="svg-hover">
									<svg class = "clock-hover" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
									</svg>
								</button> -->
								<button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
									<svg class = "clock-hover" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16" style="display:flex;">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
									</svg>
								</button>
							</div>

							<div class="weekdays">
								<span class="full-text">Monday</span>
								<span class="short-text">Mon</span>
							</div>
							<div class="weekdays">
								<span class="full-text">Tuesday</span>
								<span class="short-text">Tue</span>
							</div>
							<div class="weekdays">
								<span class="full-text">Wednesday</span>
								<span class="short-text">Wed</span>
							</div>
							<div class="weekdays">
								<span class="full-text">Thursday</span>
								<span class="short-text">Thu</span>
							</div>
							<div class="weekdays">
								<span class="full-text">Friday</span>
								<span class="short-text">Fri</span>
							</div>
							<div class="weekdays">
								<span class="full-text">Saturday</span>
								<span class="short-text">Sat</span>
							</div>
							<div class="weekdays">
								<span class="full-text">Sunday</span>
								<span class="short-text">Sun</span>
							</div>
						</div>`;

	document.documentElement.style.setProperty('--rowNum', end-start+1);
	document.documentElement.style.setProperty('--start', start);
	document.documentElement.style.setProperty('--end', end);

	for (var i=start; i<=end; i++) {
		var tmp = document.createElement("div");
		tmp.className = "row2";
		if (i<12) {
			tmp.innerHTML = `<div class="times">${i}am</div>
							<div id="1-${i}am" class="cells"></div>
							<div id="2-${i}am" class="cells"></div>
							<div id="3-${i}am" class="cells"></div>
							<div id="4-${i}am" class="cells"></div>
							<div id="5-${i}am" class="cells"></div>
							<div id="6-${i}am" class="cells"></div>
							<div id="7-${i}am" class="cells"></div>`
		} else if (i === 12) {
			tmp.innerHTML = `<div class="times">Noon</div>
							<div id="1-${i}am" class="cells"></div>
							<div id="2-${i}am" class="cells"></div>
							<div id="3-${i}am" class="cells"></div>
							<div id="4-${i}am" class="cells"></div>
							<div id="5-${i}am" class="cells"></div>
							<div id="6-${i}am" class="cells"></div>
							<div id="7-${i}am" class="cells"></div>`
		} else if (i === 24) {
			tmp.innerHTML = `<div class="times">Midnight</div>
							<div id="1-12pm" class="cells"></div>
							<div id="2-12pm" class="cells"></div>
							<div id="3-12pm" class="cells"></div>
							<div id="4-12pm" class="cells"></div>
							<div id="5-12pm" class="cells"></div>
							<div id="6-12pm" class="cells"></div>
							<div id="7-12pm" class="cells"></div>`
		} else {
			tmp.innerHTML = `<div class="times">${i-12}pm</div>
							<div id="1-${i-12}pm" class="cells"></div>
							<div id="2-${i-12}pm" class="cells"></div>
							<div id="3-${i-12}pm" class="cells"></div>
							<div id="4-${i-12}pm" class="cells"></div>
							<div id="5-${i-12}pm" class="cells"></div>
							<div id="6-${i-12}pm" class="cells"></div>
							<div id="7-${i-12}pm" class="cells"></div>`
		}
		document.getElementById("gridting").appendChild(tmp);
	}
	initcells();
	//we gotta insert the stuff again
	console.log(end);
	for (let[k, v]of eventData) {//k -> id, v -> event data
		//for each k check if the new timeslot affect it
		var tmp_event_data = new Map();
		let new_start = timetonum(v.start);
		let new_end = timetonum(v.end);
		let start_12h = start;
		let end_12h = end;
		if (document.getElementById("start").value <= 12) start_12h += "am";
		else {
			start_12h -= 12;
			start_12h += "pm";
		}
		if (document.getElementById("end").value <= 12) end_12h += "am";
		else {
			end_12h -= 12;
			end_12h += "pm";
		}
		corner_size = "1-" + start_12h;
		console.log(corner_size)

		let new_id = "";
		//if the time slots affect it -> check affect start/ end/ both
		if (start > new_start && end < new_end) {
			v.start = start_12h;
			v.end = end_12h;
			v.clicked = k[0] + "-" + start_12h;
			new_id = k[0] + ": " + start + "-" + end;
			console.log(v.getclicked);
			document.getElementById(k).style.width = document.getElementById(corner_size).clientWidth + "px";
			document.getElementById(k).style.height = (document.getElementById(corner_size).clientHeight * (timetonum(v.end) - timetonum(v.start))) + "px";
			document.getElementById(k).style.transform = "translate(" + document.getElementById(v.getclicked).offsetLeft + "px," + document.getElementById(v.getclicked).parentNode.offsetTop +"px)";
			console.log(document.getElementById(k).childNodes);
			document.getElementById(k).childNodes[3].innerHTML = `(${v.start} - ${v.end})`;
			document.getElementById(k).id = new_id; 
			k = new_id;
		} else {
			if (start > new_start) {
				v.start = start_12h;
				v.clicked = k[0] + "-" + start_12h;
				new_id = k[0] + ": " + start + "-" + new_end;
				document.getElementById(k).style.width = document.getElementById(corner_size).clientWidth + "px";
				document.getElementById(k).style.height = (document.getElementById(corner_size).clientHeight * (timetonum(v.end) - timetonum(v.start))) + "px";
				document.getElementById(k).style.transform = "translate(" + document.getElementById(v.getclicked).offsetLeft + "px," + document.getElementById(v.getclicked).parentNode.offsetTop +"px)";
				document.getElementById(k).childNodes[3].innerHTML = `(${v.start} - ${v.end})`;
				document.getElementById(k).id = new_id; 
				k = new_id;
			} else if (end < new_end) {
				v.end = end_12h;
				new_id = k[0] + ": " + new_start + "-" + end;
				//bug when the id changes idk why
				document.getElementById(k).style.width = document.getElementById(corner_size).clientWidth + "px";
				document.getElementById(k).style.height = (document.getElementById(corner_size).clientHeight * (timetonum(v.end) - timetonum(v.start))) + "px";
				document.getElementById(k).style.transform = "translate(" + document.getElementById(v.getclicked).offsetLeft + "px," + document.getElementById(v.getclicked).parentNode.offsetTop +"px)";
				document.getElementById(k).childNodes[3].innerHTML = `(${v.start} - ${v.end})`;
				document.getElementById(k).id = new_id; 
				k = new_id;
			}
		}

		tmp_event_data.set(new_id, v);
		//gotta update popover
		document.getElementById(new_id).setAttribute("title", v.title + ` (${v.start} - ${v.end})`)
		
		//if new start > current start: adjust v data (start, end, clicked) and the id(k)

		//if new end < current start: adjust v data and the id(k)
	}
	eventData = tmp_event_data;
	for (let[k,v] in eventData) {
		console.log(k,v);
	}
}

var eventbutton = document.getElementById("neweventbutton");

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

eventbutton.onclick = function () {
	let newevent = document.getElementById('timemodal');
	let title = document.getElementById('eventtitlemodal').value;
	let type = document.getElementById('eventtypemodal').value;
	let des = document.getElementById('eventdesmodal').value;
	//need to do check her to make sure that start is before end
	let start = document.getElementById("curstime").value;
	let end = document.getElementById("curetime").value;

	let num = timetonum(end) - timetonum(start);
	console.log(num);

	var event_tmp = document.createElement("div");
	// function to create id and add it to the db
	// tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Disabled popover
	cur_id = createEvent(title, type, des, start, end, curclick);
	event_tmp.id = cur_id;
	event_tmp.className = "box";
	//event_tmp.tabIndex = "0"; event_tmp.setdatabstoggle = "popover"; event_tmp.databstrigger = "hover focus"; event_tmp.databscontent = "Disabled popover";
	event_tmp.setAttribute("tabIndex", "0"); event_tmp.setAttribute("data-bs-toggle", "popover"); event_tmp.setAttribute("data-bs-content", des);
	event_tmp.setAttribute("data-bs-container", "body"); event_tmp.setAttribute("title", title + ` (${start} - ${end})`);
	event_tmp.innerHTML = `
		<button id="d${cur_id}" class="eventDelete" type="button"></button>
		<h5 style="color: white; word-wrap: break-word; margin-bottom: 0px; font-size: 1.3vw;">${title}</h5>
		<p style="color: white; word-wrap: break-word; margin-bottom: 4px; font-size: 0.7vw;">(${start} - ${end})</p>
		<div style="border-bottom: 1px solid white; margin-bottom: 2px;"></div>
		<p style="color: white; word-wrap: break-word; font-size: 0.9vw;">${des}</p>
	`;

	document.getElementsByClassName("container2")[0].append(event_tmp);
	document.getElementById(cur_id).style.backgroundColor = document.getElementById("colorpicker").value;
	document.getElementById(cur_id).style.width = document.getElementById(corner_size).clientWidth + "px";
	document.getElementById(cur_id).style.height = document.getElementById(corner_size).clientHeight * num + "px";
	//needa do smthing about this when the size of the window gets changed
	document.getElementById(cur_id).style.transform = "translate(" + document.getElementById(curclick).offsetLeft + "px," + document.getElementById(curclick).parentNode.offsetTop +"px)";

	var popover = new bootstrap.Popover(event_tmp, "");
	document.getElementById(cur_id).addEventListener("mouseenter", function () {
		popover.show();
	});
	document.getElementById(cur_id).addEventListener("mouseleave", function () {
		popover.hide();
	});

	console.log(popover)

	const cur_box = document.getElementById(cur_id);
	if (cur_box.clientHeight < cur_box.scrollHeight) {
		//we have a overflow
		console.log("we have an overflow");
		event_tmp.style.display = "flex";
		event_tmp.style.alignItems = "center";
		event_tmp.style.justifyContent = "center"
		event_tmp.innerHTML = `
		<button id="d${cur_id}" class="eventDelete" type="button">
		</button>
		<h5 style="color: white; word-wrap: break-word; margin-bottom: 0px; font-size: 1.3vw;">HOVER ME!</h5>`;
	}
	document.getElementById("d" + cur_id).addEventListener("mouseenter", function () {
		popover.hide();
	});
	document.getElementById("d" + cur_id).addEventListener("mouseleave", function () {
		popover.show();
	});
	document.getElementById("d" + cur_id).addEventListener("click", function () {
		this.parentElement.remove();
	});
}

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
/*
var a = document.getElementsByClassName("cells");
a[0].addEventListener("mouseover", function( event ) {
  // highlight the mouseover target
a[0].style.backgroundColor = 'blue';
}, false);
a[0].addEventListener("mouseout", function( event ) {
  // highlight the mouseover target
a[0].style.backgroundColor = 'white';
}, false);
*/


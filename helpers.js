let daysTemplate = `<div class="row2">
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

function rowTemplate(i) {
    let ans = '';
    if (i<12) {
        ans = `<div class="times">${i}am</div>
                        <div id="1-${i}am" class="cells"></div>
                        <div id="2-${i}am" class="cells"></div>
                        <div id="3-${i}am" class="cells"></div>
                        <div id="4-${i}am" class="cells"></div>
                        <div id="5-${i}am" class="cells"></div>
                        <div id="6-${i}am" class="cells"></div>
                        <div id="7-${i}am" class="cells"></div>`
    } else if (i === 12) {
        ans = `<div class="times">Noon</div>
                        <div id="1-${i}am" class="cells"></div>
                        <div id="2-${i}am" class="cells"></div>
                        <div id="3-${i}am" class="cells"></div>
                        <div id="4-${i}am" class="cells"></div>
                        <div id="5-${i}am" class="cells"></div>
                        <div id="6-${i}am" class="cells"></div>
                        <div id="7-${i}am" class="cells"></div>`
    } else if (i === 24) {
        ans = `<div class="times">Midnight</div>
                        <div id="1-12pm" class="cells"></div>
                        <div id="2-12pm" class="cells"></div>
                        <div id="3-12pm" class="cells"></div>
                        <div id="4-12pm" class="cells"></div>
                        <div id="5-12pm" class="cells"></div>
                        <div id="6-12pm" class="cells"></div>
                        <div id="7-12pm" class="cells"></div>`
    } else {
        ans= `<div class="times">${i-12}pm</div>
                        <div id="1-${i-12}pm" class="cells"></div>
                        <div id="2-${i-12}pm" class="cells"></div>
                        <div id="3-${i-12}pm" class="cells"></div>
                        <div id="4-${i-12}pm" class="cells"></div>
                        <div id="5-${i-12}pm" class="cells"></div>
                        <div id="6-${i-12}pm" class="cells"></div>
                        <div id="7-${i-12}pm" class="cells"></div>`
    }
    return ans;
}

function valuetostring(num) {
    let ans = num;
    if (num <= 12) ans += ":00am";
    else {
        ans -= 12;
        ans += ":00pm";
    }
    return ans;
}

function valuetoCellID(num) {
    let ans = num;
    if (num <= 12) ans += "am";
    else {
        ans -= 12;
        ans += "pm";
    }
    return ans;
}

function updateEventLocation(id, corner_size, start, end, clicked) {
    //console.log(clicked, start, end);
    document.getElementById(id).style.width = document.getElementById(corner_size).clientWidth + 1 + "px";
    document.getElementById(id).style.height = (document.getElementById(corner_size).clientHeight * (timetonum(end) - timetonum(start))) + (timetonum(end) - timetonum(start)-1) + "px";
    document.getElementById(id).style.transform = "translate(" + document.getElementById(clicked).offsetLeft + "px," + document.getElementById(clicked).parentNode.offsetTop +"px)";
    if (document.getElementById(id).clientHeight < document.getElementById(id).scrollHeight) {
        switchEventDisplay(document.getElementById(id), id);
    }
}

function updateEventSizing(id, corner_size, start, end, new_id, clicked) {
    updateEventLocation(id, corner_size, start, end, clicked);
    if (document.getElementById(id).childNodes.length != 4) document.getElementById(id).childNodes[5].innerHTML = `(${start} - ${end})`;
    document.getElementById("d" + id).id = "d" + new_id;
    document.getElementById(id).id = new_id; 
}

function switchEventDisplay(event_tmp, cur_id) {
    event_tmp.style.display = "flex";
    event_tmp.style.alignItems = "center";
    event_tmp.style.justifyContent = "center"
    event_tmp.innerHTML = `
    <button id="d${cur_id}" class="eventDelete" type="button">
    </button>
    <h5 style="color: white; word-wrap: break-word; margin-bottom: 0px; font-size: 1.3vw;">HOVER ME!</h5>`;
}

function getSelectedColor () {
    const colors = document.getElementsByName("colors");
    for (let i=0; i<colors.length; i++) {
        if (colors[i].checked == true) {
            return colors[i].value;
        }
    }
    return "invalid";
}

function createEventObject (cur_id, des, title, start, end, corner_size, clicked, color) {
    let num = timetonum(end) - timetonum(start);
    let event_tmp = document.createElement("div");
    event_tmp.id = cur_id;
	event_tmp.className = "box";
    event_tmp.setAttribute("tabIndex", "0"); event_tmp.setAttribute("data-bs-toggle", "popover"); event_tmp.setAttribute("data-bs-content", des);
	event_tmp.setAttribute("data-bs-container", "body"); event_tmp.setAttribute("title", title);
	event_tmp.innerHTML = `
		<button id="d${cur_id}" class="eventDelete" type="button"></button>
		<h5 style="color: white; word-wrap: break-word; margin-bottom: 0px; font-size: 1.3vw;">${title}</h5>
		<p style="color: white; word-wrap: break-word; margin-bottom: 4px; font-size: 0.7vw;">(${start} - ${end})</p>
		<div style="border-bottom: 1px solid white; margin-bottom: 2px;"></div>
		<p style="color: white; word-wrap: break-word; font-size: 0.9vw;">${des}</p>
	`;

    document.getElementsByClassName("container2")[0].append(event_tmp);
	document.getElementById(cur_id).style.backgroundColor = color;

    updateEventLocation(cur_id, corner_size, start, end, clicked);
    
    if (event_tmp.clientHeight < event_tmp.scrollHeight) {
		switchEventDisplay(event_tmp, cur_id);
	}
    return event_tmp;
}

function createPopover(event, id) {
    var popover = new bootstrap.Popover(event, "");
	document.getElementById(id).addEventListener("mouseenter", function () {
		popover.show();
	});
	document.getElementById(id).addEventListener("mouseleave", function () {
		popover.hide();
	});
    document.getElementById("d" + id).addEventListener("mouseenter", function () {
		popover.hide();
	});
	document.getElementById("d" + id).addEventListener("mouseleave", function () {
		popover.show();
	});
	document.getElementById("d" + id).addEventListener("click", function () {
		this.parentElement.remove();
	}); 
}

function createAlert (string) {
    let doc = new DOMParser().parseFromString(`
    <div class="alert alert-warning alert-dismissible fade show" role="alert" style="margin-left: 10px; margin-right: 10px; word-wrap: break-word;">
        ${string}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`,
    'text/html');
    
    //console.log(doc.body.firstChild);
    return doc.body.firstChild;
}
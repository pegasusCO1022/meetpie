var config = {
    apiKey: "AIzaSyAZVk8YI5PR8nfXyoSjvCbBTBB01_RhbTY",
    authDomain: "meetpie-3c64a.firebaseapp.com",
    databaseURL: "https://meetpie-3c64a.firebaseio.com",
    projectId: "meetpie-3c64a",
    storageBucket: "meetpie-3c64a.appspot.com",
    messagingSenderId: "941417946944"
};
firebase.initializeApp(config);

database = firebase.database();

var eventName = "";
var eventDate = "";
var eventTime = "";

var eventRef = "";

var userEmail = "";

function addEvent(event) {
    event.preventDefault();

    eventName = $("#event-name").val().trim();
    eventDate = $("#event-date").val().trim();
    eventTime = $("#event-time").val().trim();

    if (!moment(eventDate, "MM/DD/YY").isValid()) {
        console.log("Date must be in format MM/DD/YY");
    } else if (!moment(eventDate, "hh:mmA").isValid()) {
        console.log("Time must be in format hh:mmAM or hh:mmPM")
    } else {
        var event = {
            eventname: eventName,
            eventdate: eventDate,
            eventtime: eventTime
        };

        eventRef = database.ref("events/").push(event);

        changeForm();
    }
}

function changeForm() {
    $("#event-name").prop("readonly", "true");
    $("#event-name").prop("value", eventName);

    $("#event-date").prop("readonly", "true");
    $("#event-date").prop("value", eventDate);

    $("#event-time").prop("readonly", "true");
    $("#event-time").prop("value", eventTime);

    $("#create-event").detach();

    $("#event-form").append(`
        <div class="form-group">
            <label for="member-email">Enter Event Member Email</label>
            <input type="email" class="form-control" id="member-email">
        </div>
        <div class="form-group">
            <label for="event-members">Event Members</label>
            <textarea class="form-control" id="event-members" rows="11"></textarea>
        </div>
        <button type="submit" class="btn btn-primary" id="add-member">Add Member</button>
        <button type="submit" class="btn btn-primary" id="done">Done</button>
    `)
}

function addEventMember(event) {
    event.preventDefault();
    userEmail = $("#member-email").val().trim();
    console.log(userEmail);

    database.ref("users/").once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            console.log(childSnapshot);
            if (userEmail === childSnapshot.val().email) {
                $("#event-members").val($("#event-members").val() +
                    userEmail + "\n");

                database.ref("users/" + childSnapshot.key + "/events").update({
                    [eventRef.key]: true
                });
                database.ref("events/" + eventRef.key + "/users").update({
                    [childSnapshot.key]: true
                });
                $("#member-email").val("");
            } else {
                console.log("user not found");
            }
        })
    });
}

function escapePage() {
    window.location.href("index.html");
}

$("#create-event").on("click", addEvent);

$("form").on("click", "#add-member", addEventMember);

$("form").on("click", "#done", escapePage);


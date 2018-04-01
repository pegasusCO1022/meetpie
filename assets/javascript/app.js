function goToMain() {
    window.location.href("index.html");
}

function gotoEvent() {
    window.location.href("event.html");
}

$("create-event").on("click", goToMain);
$("#edit-user").on("click", gotoEvent);
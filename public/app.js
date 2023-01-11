
// import { SERVER_WEBSOCKET_END_POINT } from '../src/utils/defines';

var stompClient = null;
const headerToken = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };


function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {

    var socket = new SockJS('http://localhost:8081/api/ws');
    // var socket = new SockJS(SERVER_WEBSOCKET_END_POINT);
    stompClient = Stomp.over(socket);
    stompClient.connect(headerToken, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/signal-update', function (greeting) {
            showGreeting(JSON.parse(greeting.body).content);
        }, headerToken);
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/api/signal/update", headerToken, JSON.stringify({ 'name': "zizipog" }));
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $("#connect").on('click', function () { connect(); });
    $("#disconnect").on('click', function () { disconnect(); });
    $("#send").on('click', function () { sendName(); });
});
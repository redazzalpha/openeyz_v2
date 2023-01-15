
import { SERVER_WS_END_POINT_URL, SERVER_WS_SEND_URL, SERVER_WS_SUBSCRIBE_URL, POST_GET_LIMIT } from '../utils/defines';
import { Stomp } from '@stomp/stompjs';
import { getNotifs, getPosts } from '../utils/functions';

let stompClient = null;
let socket = null;
let received = null;
const headerToken = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };

function signalHandler(signal) {

    /* check signal here to know what action to do */

    //TODO : better check signal here before do action



    received = signal.body;

    if (received == 'POST')
        getPosts(POST_GET_LIMIT);
    if (received == 'NOTIF')
        getNotifs();
    console.log(received);
}

export const socketHandler = {
    connect: () => {
        stompClient = Stomp.over(function(){
            return new WebSocket(SERVER_WS_END_POINT_URL);
          });
        stompClient.connect(headerToken, function (frame) {
            localStorage.setItem("ws-user-name", frame.headers["user-name"]);
            stompClient.subscribe(SERVER_WS_SUBSCRIBE_URL, signal => {
                signalHandler(signal);
            }, headerToken);
        });
        stompClient.reconnect_delay = 5000;
    },
    disconnect: () => {
        if (stompClient !== null) {
            stompClient.disconnect();
        }
    },
    sendSignal: (signal) => {
        stompClient.send(SERVER_WS_SEND_URL, headerToken, JSON.stringify({ 'content': signal }));
    },
};







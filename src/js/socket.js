
import { SERVER_WS_END_POINT_URL, SERVER_WS_SEND_URL, SERVER_WS_SUBSCRIBE_URL, POST_GET_LIMIT, SERVER_USER_WS_INIT_URL } from '../utils/defines';
import { Stomp } from '@stomp/stompjs';
import { getNotifs, getPosts } from '../utils/functions';
import { httpRequest } from '@/utils/http';

let stompClient = null;
let received = null;

function signalHandler(signal) {

    /* check signal here to know what action to do */

    //TODO : better check signal here before do actionGIT 

    received = signal.body;

    if (received == 'POST')
        getPosts(POST_GET_LIMIT);
    if (received == 'NOTIF')
        getNotifs();
}

export const socketHandler = {

    connect: async () => {
        const token = localStorage.getItem("token");

        if (token) {

            stompClient = Stomp.over(function () {
                return new WebSocket(SERVER_WS_END_POINT_URL);
            });

            stompClient.debug = () => {/**/ };
            stompClient.connectHeaders = token;
            stompClient.disconnectHeaders = token;
            stompClient.heartbeatIncoming = 1000;
            stompClient.heartbeatOutgoing = 1000;
            stompClient.reconnect_delay = 5000;

            stompClient.beforeConnect = async () => {
                await httpRequest.post(SERVER_USER_WS_INIT_URL);
            };

            stompClient.connect({ 'Authorization': 'Bearer ' + token }, function (frame) {
                localStorage.setItem("ws-user-name", frame.headers["user-name"]);

                stompClient.subscribe(SERVER_WS_SUBSCRIBE_URL, signal => {
                    signalHandler(signal);
                }, { 'Authorization': 'Bearer ' + token });
            });
        }
    },
    disconnect: () => {
        if (stompClient !== null) {
            stompClient.disconnect(null, { 'Authorization': 'Bearer ' + localStorage.getItem("token") });
        }
    },
    sendSignal: (signal) => {
        console.log("send the message here ws-user-name -> " + localStorage.getItem("ws-user-name"));
        stompClient.send(SERVER_WS_SEND_URL, { 'Authorization': 'Bearer ' + localStorage.getItem("token") }, JSON.stringify({ 'content': signal }));
    },
    isConnected: () => {
        return stompClient != null;
    }
};







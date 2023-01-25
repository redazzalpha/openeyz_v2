
import { SERVER_WS_END_POINT_URL, SERVER_WS_SEND_URL, SERVER_WS_SUBSCRIBE_URL, POST_GET_LIMIT } from '../utils/defines';
import { Stomp } from '@stomp/stompjs';
import { getNotifs, getPosts } from '../utils/functions';
import router from '@/router';

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

    connect: () => {
        const token = localStorage.getItem("token");
        if(token) {

            stompClient = Stomp.over(function () {
                return new WebSocket(SERVER_WS_END_POINT_URL);
            });
            stompClient.debug = () => {/**/ };
    
            stompClient.connect({ 'Authorization': 'Bearer ' + token }, function () {
                stompClient.subscribe(SERVER_WS_SUBSCRIBE_URL, signal => {
                    signalHandler(signal);
                }, { 'Authorization': 'Bearer ' + token });
            });
            if ( router.currentRoute.name != "access")
                stompClient.reconnect_delay = 5000;
        }
    },
    disconnect: () => {
        if (stompClient !== null) {
            stompClient.disconnect(null, { 'Authorization': 'Bearer ' + localStorage.getItem("token") });
        }
    },
    sendSignal: (signal) => {
        stompClient.send(SERVER_WS_SEND_URL, { 'Authorization': 'Bearer ' + localStorage.getItem("token") }, JSON.stringify({ 'content': signal }));
    },
    isConnected: () => {
        return stompClient != null;
    }
};







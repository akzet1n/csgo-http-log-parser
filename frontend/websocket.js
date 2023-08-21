import { addContent } from "./logic.js";

const URL = "ws://PUBLIC_IP:3000";
const ws = new WebSocket(URL);

function scrollToBottom() {
    var logs = document.querySelector("#logs");
    logs.scrollTop = logs.scrollHeight;
};

ws.addEventListener("message", (event) => {
    try {
        const data = JSON.parse(event.data);
        addContent(data);
        scrollToBottom();
    } catch (error) {
        console.log("Error parsing JSON: ", error);
    }
});
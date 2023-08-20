const URL = "ws://127.0.0.1:3000";
const ws = new WebSocket(URL);

const logs = document.getElementById("logs");

function scrollToBottom() {
    var logs = document.querySelector("#logs");
    logs.scrollTop = logs.scrollHeight;
};

ws.addEventListener("message", (event) => {
    const message = event.data;
    const log = document.createElement("p");
    log.textContent = message;
    logs.appendChild(log);
    scrollToBottom();
});
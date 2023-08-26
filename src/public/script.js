const URL = "ws://PUBLIC_IP:3000";
const ws = new WebSocket(URL);

ws.addEventListener("message", (event) => {
    try {
        const data = JSON.parse(event.data);
        addContent(data);
        scrollToBottom();
    } catch (error) {
        console.log("Error parsing JSON: ", error);
    }
});

function addContent(data) {

    const logs = document.getElementById("logs");
    var log = document.createElement("p");
    log.classList.add("log");

    const status = document.getElementById("status");
    status.classList.add("hide");

    if (data.round) {
        log.innerHTML = `Round ${data.round} | `;
        if (data.type === "kill") {
            log.innerHTML += `<span class=${data.killerTeam === "CT" ? "ct" : "t"}>${data.killer}</span> killed `;
            log.innerHTML += `<span class=${data.victimTeam === "CT" ? "ct" : "t"}>${data.victim}</span> with `;
            log.innerHTML += `${data.weapon} `;
            if (data.extras)
                log.innerHTML += `(${data.extras})`;
        } else if (data.type === "bomb" || data.type === "player")
            log.innerHTML += `<span class=${data.team === "CT" ? "ct": "t"}>${data.player}</span> ${data.message}`;
        else if (data.type === "say")
            log.innerHTML += `<span class=${data.team === "CT" ? "ct": "t"}>${data.player}</span> wrote: ${data.message}`;
        else if (data.type === "gg" || data.type === "world" || data.type === "freezetime" || data.type === "round" || data.type === "pause")
            log.innerHTML += `${data.message}`;
        else if (data.type === "status")
            log.innerHTML += `Match score: <span class="ct">CT</span> (${data.ctScore}) vs (${data.tScore}) <span class="t">T</span>`;
    } else {
        if (data.type === "connection")
            log.innerHTML += `${data.message}`;
    }

    logs.appendChild(log);

};

function scrollToBottom() {
    var logs = document.querySelector("#logs");
    logs.scrollTop = logs.scrollHeight;
};
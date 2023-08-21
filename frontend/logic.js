const divElement = (className) => {
    const div = document.createElement("div");
    if (className)
        div.classList.add(className);
    return div;
};

const pElement = (content, className) => {    
    const p = document.createElement("p");
    if (className)
        p.classList.add(className);
    p.textContent = content;
    return p;
};

const logs = document.getElementById("logs");

const addContent = (data) => {

    const div = divElement("log");
    let round;

    if (data.round) {
        round = pElement("Round " + data.round + " | ");
        div.appendChild(round);
        if (data.type === "kill") {
            const killer = pElement(data.killer, data.killerTeam === "CT" ? "ct" : "terrorist");
            div.appendChild(killer);
            var text = pElement("killed");
            div.appendChild(text);
            const victim = pElement(data.victim, data.victimTeam === "CT" ? "ct" : "terrorist");
            div.appendChild(victim);
            text = pElement("with");
            div.appendChild(text);
            const weapon = pElement(data.weapon);
            div.appendChild(weapon);
            if (data.extras) {
                const extras = pElement("(" + data.extras + ")");
                div.appendChild(extras);
            }
        } else if (data.type === "bomb") {
            const player = pElement(data.player, data.team === "CT" ? "ct": "terrorist");
            div.appendChild(player);
            const message = pElement(data.message);
            div.appendChild(message);
        } else if (data.type === "say") {
            const player = pElement(data.player, data.team === "CT" ? "ct": "terrorist");
            div.appendChild(player);
            const text = pElement("wrote:");
            div.appendChild(text);
            const message = pElement(data.message);
            div.appendChild(message);
        } else if (data.type === "player") {
            const player = pElement(data.player, data.team === "CT" ? "ct": "terrorist");
            div.appendChild(player);
            const message = pElement(data.message);
            div.appendChild(message);
        } else if (data.type === "gg" || data.type === "world" || data.type === "freezetime" || data.type === "round" || data.type === "pause") {
            const p = pElement(data.message);
            div.appendChild(p);
        } else if (data.type === "status") {
            const text = pElement("Match score:");
            div.appendChild(text);
            const ctText = pElement("CT", "ct");
            div.appendChild(ctText);
            const ctScore = pElement(data.ctScore);
            div.appendChild(ctScore);
            const sep = pElement("vs");
            div.appendChild(sep);
            const tScore = pElement(data.tScore);
            div.appendChild(tScore);
            const tText = pElement("T", "terrorist");
            div.appendChild(tText);
        }
    }

    if (data.type === "connection") {
        const p = pElement(data.message);
        div.appendChild(p);
    }

    logs.appendChild(div);

};

export { addContent };
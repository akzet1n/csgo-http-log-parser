import { regex } from "../utils/regex.util.js";
import { match } from "../utils/match.util.js";
import { emit } from "../utils/websocket.util.js";
import { messages } from "../utils/messages.util.js";

// @desc    Parse the logs coming from the CS:GO server
// @route   POST /log
// @access  Public
const getLogs = (req, res) => {

    const data = req.body;
    var logs = data.split("\n");
    logs.pop();
    
    if (match.firstRequest) {
        emit(req.wss, { type: "connection", message: `Connection established with game server ${req.headers["x-server-addr"]}` });
        match.firstRequest = false;
    }

    logs.forEach(line => {
        const result = regex(line);
        if (result && match.statusCode == 200) {
            if (result.key === "BOMB")
                emit(req.wss, {
                    type: "bomb",
                    round: match.round, 
                    player: result.match[1].trimStart(),
                    team: result.match[4],
                    message: messages[result.match[5]]
                });
            else if (result.key === "FREEZETIME") {
                match.round++;
                if (match.round === 16)
                    emit(req.wss, { type: "freezetime", round: match.round,  message: "Halftime, changing sides" });
                else if (match.round == 31)
                    emit(req.wss, { type: "freezetime", round: match.round,  message: "Overtime has started" });
                else if (match.round > 31 && match.round % 6 == 4)
                    emit(req.wss, { type: "freezetime", round: match.round,  message: "Halftime of the overtime, changing sides" });
                emit(req.wss, { type: "freezetime", round: match.round,  message: "Freezetime has started" });
            } else if (result.key === "GAMEOVER") {
                emit(req.wss, { type: "gg", round: match.round,  message: "The match has ended" });
                match.statusCode = 410;
                return;
            } else if (result.key === "KILL")
                emit(req.wss, {
                    type: "kill",
                    round: match.round, 
                    killer: result.match[1].trimStart(),
                    killerTeam: result.match[3],
                    victim: result.match[4].trimStart(),
                    victimTeam: result.match[6],
                    weapon: result.match[7],
                    extras: result.match[8] || null
                });
            else if (result.key === "PLAYER")
                emit(req.wss, {
                    type: "player",
                    round: match.round, 
                    player: result.match[1].trimStart(),
                    team: result.match[3],
                    message: messages[result.match[4]]
                });
            else if (result.key === "WORLD") {
                if (result.match[1] === "Round_Start")
                    emit(req.wss, { type: "world", round: match.round, message: "Freezetime has ended" });
                else if (result.match[1] === "Match_Start")
                    match.round = 1;
                emit(req.wss, {
                    type: "world",
                    round: match.round,
                    message: messages[result.match[1]]
                });
            } else if (result.key === "SAY")
                emit(req.wss, {
                    type: "say",
                    round: match.round, 
                    player: result.match[1],
                    team: result.match[3],
                    message: result.match[4]
                });
            else if (result.key === "PAUSE")
                emit(req.wss, {
                    type: "pause",
                    round: match.round,  
                    message: result.match[1] === "enabled" ? messages[result.match[2]] : "The match has been resumed"
                });
            else if (result.key === "ROUND") {
                emit(req.wss, {
                    type: "round",
                    round: match.round, 
                    message: messages[result.match[1]]
                });
                emit(req.wss, {
                    type: "status",
                    round: match.round,
                    ctScore: result.match[2],
                    tScore: result.match[3]
                });
            }
        }
    });

    if (match.statusCode == 410) {
        match.reset();
        emit(req.wss, { type: "connection", message: `Connection closed with game server ${req.headers["x-server-addr"]}` });
        res.status(410).send("The match has ended");
    } else {
        res.status(200).send("Receiving logs");
    }

};


// @desc    Page where the logs are being displayed
// @route   GET /
// @access  Public
const displayPage = (req, res) => {
    res.sendFile("index.html");
};

export { getLogs, displayPage };
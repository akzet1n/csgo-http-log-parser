import { regex } from "../utils/regex.util.js";
import { match } from "../utils/match.util.js";
import { emit } from "../utils/websocket.util.js";

// @desc    Parse the logs coming from the CS:GO server
// @route   POST /log
// @access  Public
const getLogs = (req, res) => {

    const info = `${req.headers["x-server-addr"]} | ${req.headers["x-timestamp"]} | Round ${match.round} | `;
    
    const data = req.body;
    var logs = data.split("\n");
    logs.pop();

    const wss = req.wss;
    
    if (match.firstRequest) {
        emit(info + "Connection established");
        match.firstRequest = false;
    }
    
    logs.forEach(line => {
        const result = regex(line);
        if (result && match.statusCode == 200) {
            var msg = info;
            if (result.key === "BOMB") {
                if (result.match[5] === "Planted_The_Bomb") {
                    msg += `${result.match[1].trimStart()} planted the bomb`;
                } else if (result.match[5] === "Defused_The_Bomb")   
                    msg += `${result.match[1].trimStart()} defused the bomb`;
                else if (result.match[5] === "Begin_Bomb_Defuse_Without_Kit")
                    msg += `${result.match[1].trimStart()} started to defuse the bomb without defuse kit`;
                else if (result.match[5] === "Begin_Bomb_Defuse_With_Kit")
                    msg += `${result.match[1].trimStart()} started to defuse the bomb with defuse kit`;
            } else if (result.key === "FREEZETIME") {       
                if (match.round === 16)
                    msg += "Halftime, changing sides\n";
                else if (match.round == 31)
                    msg += "Overtime has started\n";
                else if (match.round > 31 && match.round % 6 == 4)
                    msg += "Halftime of the overtime, changing sides\n";
                msg += "Freezetime has started";
            } else if (result.key === "GAMEOVER") {
                emit(info + "Match has ended");
                match.statusCode = 410;
                return;
            } else if (result.key === "KILL") {
                msg += `${result.match[1]} killed ${result.match[3]} with ${result.match[5]}`;
            } else if (result.key === "CONNECTION") {
                if (result.match[3] === "entered")
                    msg += `${result.match[1].trimStart()} entered the server`;
                else if (result.match[3] === "disconnected")
                    msg += `${result.match[1].trimStart()} disconnected from the server`;
            } else if (result.key === "WORLD") {
                if (result.match[1] === "Match_Start") {
                    match.round = 1;
                    msg += "The match has started";
                } else if (result.match[1] === "Round_Start") {
                    msg += "Freezetime has ended\n"
                    msg += info + "Round has started"
                } else if (result.match[1] === "Round_End") {
                    match.round++;
                    msg += "Round has ended";
                }
            } else if (result.key === "SAY") {
                msg += `${result.match[1]} wrote: ${result.match[3]}`;
            } else if (result.key === "PAUSE") {
                if (result.match[1] === "enabled") {
                    match.isPaused = true;
                    if (result.match[2] === "mp_pause_match")
                        msg += "The match has been paused";
                    else if (result.match[2] === "TimeOutCTs")
                        msg += "The match has been paused by the CTs";
                    else if (result.match[2] === "TimeOutTs")
                        msg += "The match has been paused by the Ts";
                } else if (result.match[1] === "disabled") {
                    match.isPaused = false;
                    msg += "The match has been resumed";
                }
            } else if (result.key === "ROUND") {
                if (result.match[1] === "SFUI_Notice_CTs_Win")
                    msg += "CTs have won the round by killing all T before the bomb has been planted";
                else if (result.match[1] === "SFUI_Notice_Terrorists_Win")
                    msg += "Ts have won the round by killing all CTs";
                else if (result.match[1] === "SFUI_Notice_Target_Saved")
                    msg += "CTs have won the round by reaching the end of the round without killing all the Ts or without bomb planted";
                else if (result.match[1] === "SFUI_Notice_Bomb_Defused")
                    msg += "CTs have won the round by defusing the bomb";
                else if (result.match[1] === "SFUI_Notice_Target_Bombed")
                    msg += "Ts have won the round by detonating the bomb";
                msg += "\n" + info + `Match score: CTs (${result.match[2]}) vs (${result.match[3]}) Ts`
            }
            emit(wss, msg);
        }
    });

    if (match.statusCode == 410) {
        match.reset()
        emit(info + "Connection closed");
        res.status(410).send("The match has ended");
    } else {
        res.status(200).send("Receiving logs");
    }

}

export { getLogs };
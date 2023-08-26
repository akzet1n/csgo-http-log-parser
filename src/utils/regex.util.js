const REGEX = {
    BOMB: /\d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}:\d{2}.\d{3} - "(.+)<(\d+)><(.+)><(.+)>" triggered "(Planted_The_Bomb|Defused_The_Bomb|Begin_Bomb_Defuse_Without_Kit|Begin_Bomb_Defuse_With_Kit)"/,
    FREEZETIME: /\d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}:\d{2}.\d{3} - Starting Freeze period/,
    GAMEOVER: /\d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}:\d{2}.\d{3} - Game Over: (?:\w*) (?:\w*) (?:\w*) score (\d*):(\d*) after (?:.*)/,
    KILL: /\d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}:\d{2}.\d{3} - "(.*)<(?:\d*)><(.*)><(CT|TERRORIST)>" \[(?:.*)\] killed "(.*)<(?:\d*)><(.*)><(CT|TERRORIST)>" \[(?:.*)\] with "(.*)"(?: \((.*?)\))?/,
    PLAYER  : /\d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}:\d{2}.\d{3} - "(.*)<(?:\d*)><(.*)><(CT|TERRORIST)>" ((entered)\w*|disconnected)/,
    WORLD: /\d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}:\d{2}.\d{3} - World triggered "(\w*)"(?: \(CT "(\d*?)"\) \(T "(\d*?)"\))?/,
    SAY: /\d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}:\d{2}.\d{3} - "(.*)<(?:\d*)><(.*)><(CT|TERRORIST)>" say "(.*)"/,
    PAUSE: /\d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}:\d{2}.\d{3} - Match pause is (\w*) - (\w*)/,
    ROUND: /\d{2}\/\d{2}\/\d{4} - \d{2}:\d{2}:\d{2}.\d{3} - Team "(?:\w*)" triggered "(\w*)" \(CT "(\d*)"\) \(T "(\d*)"\)/
};

const regex = (line) => {
    for (const [key, value] of Object.entries(REGEX)) {
        const match = line.match(value);
        if (match)
            return { key, match };
    }
}

export { regex };
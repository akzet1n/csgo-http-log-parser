# csgo-http-log-parser
An application that parses the live events coming from the CS:GO game server. Parsed events are sent to a websocket server, so logs can be viewed live via an HTML web page. This app should benefit tournament operators that are streaming delayed matches. The observer can be receiving the live logs from the match and see if some good play happened so they don't miss it when the stream passes that moment.

> This application is focused on competitive matches. It might work on other game modes, but it hasn't been tested yet.

> The parser can receive logs from just one match at a time, if you want to get logs from more matches at the same time, you can run multiple instances of the app on different ports and it will work fine.

## Events parsed
- Bomb
- Freezetime
- Game Over
- Kills
- Connections
- World 
- Say
- Pause
- Rounds

## Installation

### Backend
The default port for the application is 3000, you can change it in ``backend/config.js``.
- Clone this repository
```
git clone github.com/akzet1n/csgo-http-log-parser
```
- Install the required packages
```
npm install
```
- Run the application
```
npm start
```

### Frontend
The frontend will comunicate with the backend at the same port, but with a Websocket protocol.
Make sure to set the correct Websocket address in the ``index.html`` file, at the line 38. You can host the frontend on your local host if you want to. 

## Usage
After configuring both the backend and frontend, now it's time to link it with the game server.
Before adding the parser to your game server, check the following steps:

1. Your instance of the parser is running.
2. There's no other match linked with your parser.
3. You have RCON access to the game server.
4. The match hasn't started yet.

After you checked those 4 steps, you can now add the parser to the game server. You can add it while the players are in warmup, even if all the players haven't joined yet. Enter the following command on your console:

If you are using RCON:
- ```rcon log on; rcon mp_logdetail 3; rcon logaddress_add_http "[URL]"```

If you are using the server console:
- ```log on; mp_logdetail 3; logaddress_add_http "[URL]"```

Now head over to your HTML web page, and you should be receiving the game logs live from the game server!
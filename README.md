# csgo-http-log-parser
An application that parses the live events coming from the CS:GO game server. Parsed events are sent to a websocket server, so logs can be viewed in real time via an HTML web page. This app should benefit tournament operators that are streaming delayed matches. The observer can be receiving the live logs from the match and see if some good play happened so they don't miss it when the stream passes that moment in the match.

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

## Usage
The app is listening on port 3000 by default, this port will listen for both HTTP and Websocket protocols.

The endpoint for the HTTP POST requests is ``http://127.0.0.1:3000/log``. This is the URL that you will need to enter on your game server to start receiving logs in your backend.

The endpoint for the Websocket server is `ws://127.0.0.1:3000`. With this endpoint, you will be able to connect to the Websocket server thats sending the parsed logs from the backend in real time, so you will be able to see them live via a web browser.

If you wanna change the port where the app is listening, change the port in ``backend/config.js`` file. Also, make sure to change the port of the Websocket endpoint in ``frontend/websocket.js``.

Now that your app is configured correctly, check the following steps to start receiving your logs:

1. Your instance of the parser is running.
2. There's no other live match linked with your parser.
3. You have RCON access to the game server.
4. The match hasn't started yet.

After you checked those 4 steps, you can now add the parser to the game server. You can add it while the players are in warmup, even if all the players haven't joined yet. Enter the following command on your console:

If you are using RCON:
- ```rcon log on; rcon mp_logdetail 3; rcon logaddress_add_http "URL"```

If you are using the server console:
- ```log on; mp_logdetail 3; logaddress_add_http "URL"```

Now head over to your HTML web page, and you should be receiving the game logs live from the game server!

## Upcoming features

- Round timing
- Custom player names
- Multiple instances on the same app
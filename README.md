# csgo-http-log-parser
An application that parses the live events coming from the CS:GO game server. Parsed events are sent to a websocket server, so logs can be viewed in real time via an HTML web page. This app should benefit tournament operators that are streaming delayed matches. The observer can be receiving the live logs from the match and see if some good play happened so they don't miss it when the stream pass that moment in the match.

> This application is focused on competitive matches. It might work on other game modes, but it hasn't been tested yet.

> The parser can receive logs from just one match at a time, if you want to get logs from more matches at the same time, you can run multiple instances of the app on different ports and it will work fine.

## Events parsed
- Bomb
- Game Over
- Freezetime
- Halftime
- Overtime
- Kills
- Player connections
- World
- Chat
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

## Usage
The app is listening on port 3000 by default, this port will be listening both HTTP and Websocket protocols.

The endpoint where the CS:GO game server will be sending all the HTTP POST requests is ``http://127.0.0.1:3000/log``. This is the URL that you will need to enter on your game server to start receiving logs.

The endpoint where the application will send the parsed logs via Websocket is `ws://127.0.0.1:3000`. This is were all the parsed logs are sent to then show them in real time in your web browser. 

If you wanna change the port where the app is listening, change the port in ``backend/config.js``. Also, make sure to change the port of the Websocket endpoint in ``frontend/websocket.js``.

You can run the app by accessing the root folder that contains the ``backend`` and ``frontend`` folders and then typing ``npm start``.

The website  where you can see your logs in real time can be accessed at ``http://127.0.0.1:3000/``.

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

- Support match restore
- Show the live round time of the match
- Custom player names
- Parse multiple matches at the same time
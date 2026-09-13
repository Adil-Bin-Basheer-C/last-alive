
import rooms from "../state/rooms.js"
import {
  generateRandomPositionOfOther,
  sendCoordinates,
  willCollide,
  move,
  go,
  edgeMove
} from "../game/movement.js"

import { centerX, centerY, zoom, widthOfCharecter, heightOfCharecter, speed, currentPositionXMax, currentPositionXMin, currentPositionYMax, currentPositionYMin } from "../config/constants.js"
import { initializePlayers } from "../utils/playerUtils.js";
export function gameHandler(io, socket) {

  socket.on("send_dim", (inputs) => {

    let enteredid = inputs[5]
    socket.roomID = enteredid


    if (rooms[enteredid].moveInterval) {

      clearInterval(rooms[enteredid].moveInterval);
      rooms[enteredid].moveInterval = null;
    }


    if (rooms[enteredid]["lasttime"]) {
      clearTimeout(rooms[enteredid]["lasttime"])
      rooms[enteredid]["lasttime"] = null
    }
    rooms[enteredid]["players"][socket.id]["boxes"] = inputs[0]
    rooms[enteredid]["players"][socket.id]["leftedge"] = inputs[1]
    rooms[enteredid]["players"][socket.id]["rightedge"] = inputs[2]
    rooms[enteredid]["players"][socket.id]["topedge"] = inputs[3]
    rooms[enteredid]["players"][socket.id]["bottomedge"] = inputs[4]


    if (!rooms[enteredid]["players"][socket.id]["block"]) {

      let pos = generateRandomPositionOfOther(rooms[enteredid]["players"][socket.id]["boxes"])
      rooms[enteredid]["players"][socket.id]["posx"] = pos.x
      rooms[enteredid]["players"][socket.id]["posy"] = pos.y
      rooms[enteredid]["players"][socket.id]["iposx"] = pos.x
      rooms[enteredid]["players"][socket.id]["iposy"] = pos.y
      rooms[enteredid]["players"][socket.id]["angle"] = 0
      rooms[enteredid]["players"][socket.id]["arrow"] = ""
      rooms[enteredid]["players"][socket.id]["prevDir"] = ""

      if (!willCollide(20, 0, centerX - rooms[enteredid]["players"][socket.id]["iposx"], centerY - rooms[enteredid]["players"][socket.id]["iposy"], rooms[enteredid]["players"][socket.id]["boxes"])) {
        let sign = (Math.random() < 0.5 ? 1 : -1)
        rooms[enteredid]["players"][socket.id]["prevMotion"] = () => { move(speed * sign, 0, socket, enteredid, rooms[enteredid]["players"][socket.id]["boxes"]) };
        rooms[enteredid]["players"][socket.id]["prevDir"] = sign === 1 ? "left" : "right"
      }
      else {
        let sign = (Math.random() < 0.5 ? 1 : -1)
        rooms[enteredid]["players"][socket.id]["prevMotion"] = () => { move(0, speed * sign, socket, enteredid, rooms[enteredid]["players"][socket.id]["boxes"]) };
        rooms[enteredid]["players"][socket.id]["prevDir"] = sign === 1 ? "up" : "down"
      }

      rooms[enteredid]["players"][socket.id]["block"] = true;
      let playerstate = {}

      for (let player in rooms[enteredid]["players"]) {
        const p = rooms[enteredid]["players"][player]
        playerstate[player] = {}
        playerstate[player]["posx"] = p["posx"]
        playerstate[player]["posy"] = p["posy"]
        playerstate[player]["angle"] = p["angle"]
        playerstate[player]["becomeZombie"] = p["becomeZombie"]
        playerstate[player]["name"] = p["name"]
      }

      socket.emit("receive_player_state", playerstate)
    }

    rooms[enteredid]["initialized"] += 1
    const totalPlayers =
      Object.keys(rooms[enteredid]["players"]).length;
    console.log(`${rooms[enteredid]["initialized"]}/${totalPlayers}`)
    if (rooms[enteredid]["initialized"] >= totalPlayers) {
      console.log("Loading Cancelled")
      io.to(enteredid).emit("all_initialized", false);

    }
    else {
      console.log("Loading")
      io.to(enteredid).emit("all_initialized", true);
    }

    if (rooms[enteredid]["initialized"] >= totalPlayers) {

      if (rooms[enteredid].moveInterval) {
        clearInterval(rooms[enteredid].moveInterval);
        rooms[enteredid].moveInterval = null;
      }

      rooms[enteredid].moveInterval = setInterval(() => {
        const players = rooms[enteredid].players;
        for (const playerId of Object.keys(players)) {
          const playerSocket = io.sockets.sockets.get(playerId);

          let [prevDir, prevMotion] = edgeMove(centerX - rooms[enteredid]["players"][playerSocket.id]["iposx"], centerY - rooms[enteredid]["players"][playerSocket.id]["iposy"], rooms[enteredid]["players"][playerSocket.id]["prevDir"], rooms[enteredid]["players"][playerSocket.id]["prevMotion"], playerSocket.id, playerSocket, rooms[enteredid]["players"][playerSocket.id]["boxes"], enteredid);
          [prevDir, prevMotion] = go(rooms[enteredid]["players"][playerSocket.id]["arrow"], prevDir, prevMotion, centerX - rooms[enteredid]["players"][playerSocket.id]["iposx"], centerY - rooms[enteredid]["players"][playerSocket.id]["iposy"], playerSocket.id, playerSocket, rooms[enteredid]["players"][playerSocket.id]["boxes"], enteredid);

          rooms[enteredid]["players"][playerSocket.id]["prevDir"] = prevDir;
          rooms[enteredid]["players"][playerSocket.id]["prevMotion"] = prevMotion


          if (rooms[enteredid]["players"][playerSocket.id]["becomeZombie"] == false) {

            Object.entries(rooms[enteredid]["players"]).forEach(([socketid, info]) => {
              if (playerSocket.id != socketid && info["becomeZombie"] == true) {
                if (info["posx"] + widthOfCharecter > rooms[enteredid]["players"][playerSocket.id]["posx"] - widthOfCharecter / 2 && info["posy"] + heightOfCharecter > rooms[enteredid]["players"][playerSocket.id]["posy"] - heightOfCharecter / 2 && info["posy"] < rooms[enteredid]["players"][playerSocket.id]["posy"] + heightOfCharecter / 2 &&
                  info["posx"] < rooms[enteredid]["players"][playerSocket.id]["posx"] + widthOfCharecter / 2) {
                  rooms[enteredid]["players"][playerSocket.id]["becomeZombie"] = true
                }
              }


            })

          }
        }
        let human = 0
        let lastman
        for (const [socketid, info] of Object.entries(rooms[enteredid]["players"])) {
          if (info["becomeZombie"] == false) {
            human++;
            lastman = socketid;
          }
        }

        if (human == 0) {
          rooms[enteredid]["gameOver"] = true
          io.to(enteredid).emit("timer", false)
          io.to(enteredid).emit("survived", [false, ""])

          for (const [id, player] of Object.entries(rooms[enteredid].players)) {
            initializePlayers(enteredid, id, player["name"])

          }
          if (rooms[enteredid]["lasttime"]) {
            clearTimeout(rooms[enteredid]["lasttime"])
            rooms[enteredid]["lasttime"] = null
          }
          if (rooms[enteredid].moveInterval) {

            clearInterval(rooms[enteredid].moveInterval);
            rooms[enteredid].moveInterval = null;
          }


        }
        if (human == 1 && rooms[enteredid]["gameOver"] == false) {
          io.to(enteredid).emit("timer", true)
          rooms[enteredid]["lasttime"] = setTimeout(() => {

            if (rooms[enteredid]["players"][lastman]["becomeZombie"] == true) {
              io.to(enteredid).emit("survived", [false, rooms[enteredid]["players"][lastman]["name"]])
            }
            else {

              io.to(enteredid).emit("survived", [true, rooms[enteredid]["players"][lastman]["name"]])
            }


            for (const [id, player] of Object.entries(rooms[enteredid].players)) {

              initializePlayers(enteredid, id, player["name"])
            }
            if (rooms[enteredid].moveInterval) {

              clearInterval(rooms[enteredid].moveInterval);
              rooms[enteredid].moveInterval = null;
            }


          }, 20 * 1000);

          rooms[enteredid]["gameOver"] = true



        }
        let playerstate = {}

        for (let player in rooms[enteredid]["players"]) {
          const p = rooms[enteredid]["players"][player]
          playerstate[player] = {}
          playerstate[player]["posx"] = p["posx"]
          playerstate[player]["posy"] = p["posy"]
          playerstate[player]["angle"] = p["angle"]
          playerstate[player]["becomeZombie"] = p["becomeZombie"]
          playerstate[player]["name"] = p["name"]
        }

        io.to(enteredid).emit("receive_player_state", playerstate)

      }, 16)


    }

  })


  socket.on("send_arrow", (inputs) => {
    let enteredid = inputs[1]
    let arrow = inputs[0]
    rooms[enteredid]["players"][socket.id]["arrow"] = arrow
  })



}


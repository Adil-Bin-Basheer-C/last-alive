
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
    for (const playerId of Object.keys(rooms[enteredid]["players"])) {
    const playerSocket = io.sockets.sockets.get(playerId);
        if (playerSocket.moveInterval) {

      clearInterval(playerSocket.moveInterval);
      playerSocket.moveInterval = null;
    }
    }

    if (rooms[enteredid]["lasttime"]) {
      clearTimeout(rooms[enteredid]["lasttime"])
      rooms[enteredid]["lasttime"] = null
    }
    rooms[enteredid]["players"][socket.id]["boxes"]=inputs[0]
    rooms[enteredid]["players"][socket.id]["leftedge"]=inputs[1]
    rooms[enteredid]["players"][socket.id]["rightedge"]=inputs[2]
    rooms[enteredid]["players"][socket.id]["topedge"]=inputs[3]
    rooms[enteredid]["players"][socket.id]["bottomedge"]=inputs[4]


    if (!rooms[enteredid]["players"][socket.id]["block"]) {

      let pos = generateRandomPositionOfOther(rooms[enteredid]["players"][socket.id]["boxes"])
      rooms[enteredid]["players"][socket.id]["posx"] = pos.x
      rooms[enteredid]["players"][socket.id]["posy"] = pos.y
      rooms[enteredid]["players"][socket.id]["iposx"] = pos.x
      rooms[enteredid]["players"][socket.id]["iposy"] = pos.y
      rooms[enteredid]["players"][socket.id]["angle"] = 0
      rooms[enteredid]["players"][socket.id]["arrow"] = "downKey"
      rooms[enteredid]["players"][socket.id]["prevDir"] = "right"

      if (!willCollide(20, 0, centerX - rooms[enteredid]["players"][socket.id]["iposx"], centerY - rooms[enteredid]["players"][socket.id]["iposy"], rooms[enteredid]["players"][socket.id]["boxes"])) {
        rooms[enteredid]["players"][socket.id]["prevMotion"] = () => { move(-speed, 0, socket, enteredid, rooms[enteredid]["players"][socket.id]["boxes"]) };
      }
      else {
        rooms[enteredid]["players"][socket.id]["prevMotion"] = () => { move(0, -speed, socket, enteredid, rooms[enteredid]["players"][socket.id]["boxes"]) };
      }

      rooms[enteredid]["players"][socket.id]["block"] = true;
   

      socket.emit("receive_player_state", [rooms[enteredid]["players"][socket.id]["posx"], rooms[enteredid]["players"][socket.id]["posy"], rooms[enteredid]["players"][socket.id]["angle"], rooms[enteredid]["players"][socket.id]["becomeZombie"], rooms[enteredid]["players"]])
    }
  
        rooms[enteredid]["initialized"]+=1
    const totalPlayers =
    Object.keys(rooms[enteredid]["players"]).length;
  if (rooms[enteredid]["initialized"] >= totalPlayers) {

    io.to(enteredid).emit("all_initialized",false);

  }
  else{
    io.to(enteredid).emit("all_initialized",true);
  }

    if(rooms[enteredid]["initialized"] >= totalPlayers){
      for (const playerId of Object.keys(rooms[enteredid]["players"])) {

    const playerSocket = io.sockets.sockets.get(playerId);
    playerSocket.moveInterval = setInterval(() => {
      let enteredid = playerSocket.roomID;

      if (!enteredid) return;

      if (!rooms[enteredid]) return;

      if (!rooms[enteredid]["players"][playerSocket.id]) {
        clearInterval(playerSocket.moveInterval);
        playerSocket.moveInterval = null;
        return;
      }

      let [prevDir, prevMotion] = edgeMove(centerX - rooms[enteredid]["players"][playerSocket.id]["iposx"], centerY - rooms[enteredid]["players"][playerSocket.id]["iposy"], rooms[enteredid]["players"][playerSocket.id]["prevDir"], rooms[enteredid]["players"][playerSocket.id]["prevMotion"], playerSocket.id, playerSocket, rooms[enteredid]["players"][playerSocket.id]["boxes"], enteredid);
      [prevDir, prevMotion] = go(rooms[enteredid]["players"][playerSocket.id]["arrow"], prevDir, prevMotion, centerX - rooms[enteredid]["players"][playerSocket.id]["iposx"], centerY - rooms[enteredid]["players"][playerSocket.id]["iposy"], playerSocket.id, playerSocket, rooms[enteredid]["players"][playerSocket.id]["boxes"], enteredid);

      rooms[enteredid]["players"][playerSocket.id]["prevDir"] = prevDir;
      rooms[enteredid]["players"][playerSocket.id]["prevMotion"] = prevMotion


      if (rooms[enteredid]["players"][playerSocket.id]["becomeZombie"] == false) {
        let human = 0
        let lastman
        let total = 0
        let id;
        Object.entries(rooms[enteredid]["players"]).forEach(([socketid, info]) => {
          if (playerSocket.id != socketid && info["becomeZombie"] == true) {
            if (info["posx"] + widthOfCharecter > rooms[enteredid]["players"][playerSocket.id]["posx"] - widthOfCharecter / 2 && info["posy"] + heightOfCharecter > rooms[enteredid]["players"][playerSocket.id]["posy"] - heightOfCharecter / 2 && info["posy"] < rooms[enteredid]["players"][playerSocket.id]["posy"] + heightOfCharecter / 2 &&
              info["posx"] < rooms[enteredid]["players"][playerSocket.id]["posx"] + widthOfCharecter / 2) {
              rooms[enteredid]["players"][playerSocket.id]["becomeZombie"] = true
            }
          }

          total++

        })
        for (const [socketid, info] of Object.entries(rooms[enteredid]["players"])) {
          if (info["becomeZombie"] == false) {
            human++;
            lastman = socketid;
          }
        }
  
        if (human == 0) {
          rooms[enteredid]["gameOver"] = true
          io.to(enteredid).emit("timer",false)
          io.to(enteredid).emit("survived", [false, ""])

          for (const [id, player] of Object.entries(rooms[enteredid].players)) {
            initializePlayers(enteredid, id, player["name"])

          }
          if (rooms[enteredid]["lasttime"]) {
            clearTimeout(rooms[enteredid]["lasttime"])
            rooms[enteredid]["lasttime"] = null
          }
          for (const id of Object.keys(rooms[enteredid].players)) {

            const s = io.sockets.sockets.get(id);

            if (s?.moveInterval) {
              clearInterval(s.moveInterval);
              s.moveInterval = null;
            }
          }


        }
        if (human == 1 && rooms[enteredid]["gameOver"] == false) {
          io.to(enteredid).emit("timer",true)
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
            for (const id of Object.keys(rooms[enteredid].players)) {

              const s = io.sockets.sockets.get(id);

              if (s?.moveInterval) {
                clearInterval(s.moveInterval);
                s.moveInterval = null;
              }
            }


          }, 30 * 1000);
         
          rooms[enteredid]["gameOver"] = true



        }
      }

    }, 16)
    }
  }

  })


  socket.on("send_arrow", (inputs) => {
    let enteredid = inputs[1]
    let arrow = inputs[0]
    rooms[enteredid]["players"][socket.id]["arrow"] = arrow
  })



}


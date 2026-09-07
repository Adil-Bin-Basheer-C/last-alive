
import express from 'express';
const app=express();
import http from 'http';
const server=http.createServer(app)
import cors from 'cors';
app.use(cors())
import { Server } from 'socket.io';
import { Socket } from 'net';

import rooms from './state/rooms.js';

import { roomHandler } from './socket/roomHandler.js';
import { gameHandler } from './socket/gameHandler.js';
import { joinedPlayersStatus } from './utils/playerUtils.js';

const io=new Server(server,{
  cors:{
    origin:"*", 
    methods: ["GET","POST"],
  },
})

io.on("connection",(socket)=>{

  socket.on("joinsocket",(enteredid)=>{
    socket.join(enteredid)
  })
  console.log(`user connected: ${socket.id}`)
  roomHandler(io,socket)
  gameHandler(io,socket)
  socket.on("disconnect", () => {

    console.log(`User disconnected: ${socket.id}`);
    let roomid=Object.keys(rooms).find(roomId => socket.id in rooms[roomId]["players"]);
    if (socket.moveInterval) {
    clearInterval(socket.moveInterval);
    socket.moveInterval = null;
}
    if(roomid){
      delete rooms[roomid]["players"][socket.id]
      let [joinedplayers,startmatch]=joinedPlayersStatus(roomid)
      io.to(roomid).emit("start_match",[joinedplayers,startmatch])
    }
    
    
    
  });
})


server.listen(3001,'0.0.0.0',()=>{
  console.log("server is running")
})
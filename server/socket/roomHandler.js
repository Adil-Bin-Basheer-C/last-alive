import rooms from "../state/rooms.js"
import { joinedPlayersStatus,initializePlayers } from "../utils/playerUtils.js"
export function roomHandler(io,socket){
     socket.on("create_room",(name)=>{
      
    const chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    let id;
    do{
      id=""
      for(let i=0;i<6;i++){
        id=id+chars[Math.floor(Math.random()*chars.length)]
      }
    }while(id in rooms)

    socket.join(id)
    rooms[id]={}
    rooms[id]["block"]=false
    rooms[id]["gameOver"]=false
    rooms[id]["initialized"]=0
    rooms[id]["players"]={}
    initializePlayers(id,socket.id,name)
  
    let [joinedplayers,startmatch]=joinedPlayersStatus(id)
    socket.emit("get_room_id",[id,joinedplayers])
   
  })
  socket.on("enteredRoomID",(input)=>{
    let enteredid=input[0]
    
    let name=input[1]
    
    if(!(enteredid in rooms)){
      socket.emit("room_state","invalidID")
    }
    else{
      let [joinedplayers,startmatch]=joinedPlayersStatus(enteredid)
      if(startmatch){
        socket.emit("room_state","using")
      }
      else{
        socket.join(enteredid)
        initializePlayers(enteredid,socket.id,name)
        let [joinedplayers,startmatch]=joinedPlayersStatus(enteredid)
        
        io.to(enteredid).emit("validOrNot",[joinedplayers,enteredid])
      }
      
    }
    
  })
  socket.on("i_am_ready",(input)=>{
      let enteredid=input[1]
      
      
      rooms[enteredid]["players"][socket.id]["readyToMatch"]=input[0];
      rooms[enteredid]["gameOver"]=false
      rooms[enteredid]["block"]=false
      rooms[enteredid]["players"][socket.id]["becomeZombie"]=false
  
      let [joinedplayers,startmatch]=joinedPlayersStatus(enteredid)
      io.to(enteredid).emit("start_match",[joinedplayers,startmatch])
    
      if(startmatch){
  
        let pl=Object.keys(rooms[enteredid]["players"])
        let k=pl[Math.floor(Math.random()*pl.length)]
        rooms[enteredid]["players"][k]["becomeZombie"]=true
      }
    
  })
  socket.on("show_room_page",(input)=>{
    let pls=joinedPlayersStatus(input)
    socket.emit("get_players",pls[0])
  })
  socket.on("leave_room",(id)=>{
    socket.leave(id)
    delete rooms[id]["players"][socket.id]
    let [joinedplayers,startmatch]=joinedPlayersStatus(id)
    io.to(id).emit("start_match",[joinedplayers,startmatch])
  })
}
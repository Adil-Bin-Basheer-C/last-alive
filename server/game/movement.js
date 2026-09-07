import rooms from "../state/rooms.js";
import {centerX,centerY,zoom,widthOfCharecter,heightOfCharecter,speed,currentPositionXMax,currentPositionXMin,currentPositionYMax,currentPositionYMin } from "../config/constants.js";
 function generateRandomPositionOfOther(boxes){
  var didntGet=true;
    while(didntGet){
      var currentPositionX=Math.random()*(currentPositionXMax-currentPositionXMin)+currentPositionXMin;
  var currentPositionY=Math.random()*(currentPositionYMax-currentPositionYMin)+currentPositionYMin;
    if(!willCollide(-zoom*currentPositionX,-zoom*currentPositionY,centerX,centerY,boxes)){
      didntGet=false;
      return {x:currentPositionX,y:currentPositionY}
    }

    
    }
}
 function sendCoordinates(x,y,socketid,enteredid){
  if(x>0){
    rooms[enteredid]["players"][socketid]["angle"]=180;
  }
  else if(x<0){
    rooms[enteredid]["players"][socketid]["angle"]=0;
  }
  else if(y>0){
    rooms[enteredid]["players"][socketid]["angle"]=-90;
  }
  else if(y<0){
    rooms[enteredid]["players"][socketid]["angle"]=90;
  }
}
function willCollide(x,y,px,py,boxes){
  if(Array.isArray(boxes)){
    for(let ardim of boxes){
    if( px-widthOfCharecter/2+x < ardim.right && 
        px+widthOfCharecter/2+x  > ardim.left && 
        py-heightOfCharecter/2+y< ardim.bottom && 
        py+heightOfCharecter/2+y > ardim.top ) {
          
      return true;
      return;
      
    }
  };
  }
   

  return false;
}
 function move(dx,dy,socket,enteredid,boxes){

    rooms[enteredid]["players"][socket.id]["posx"]=rooms[enteredid]["players"][socket.id]["posx"]+dx;
    rooms[enteredid]["players"][socket.id]["posy"]=rooms[enteredid]["players"][socket.id]["posy"]+dy;
    if(Array.isArray(boxes)){
      for(let box of boxes){
      box.right+=dx
      box.left+=dx
      box.top+=dy
      box.bottom+=dy
    }
    }
    
    rooms[enteredid]["players"][socket.id]["leftedge"]+=dx
    rooms[enteredid]["players"][socket.id]["rightedge"]+=dx
    rooms[enteredid]["players"][socket.id]["topedge"]+=dy
    rooms[enteredid]["players"][socket.id]["bottomedge"]+=dy
    let playerstate={}

    for(let player in rooms[enteredid]["players"]){
      const p=rooms[enteredid]["players"][player]
      playerstate[player]={}
      playerstate[player]["posx"]=p["posx"]
      playerstate[player]["posy"]=p["posy"]
      playerstate[player]["angle"]=p["angle"]
      playerstate[player]["becomeZombie"]=p["becomeZombie"]
      playerstate[player]["name"]=p["name"]
    }
    socket.emit("receive_player_state",[rooms[enteredid]["players"][socket.id]["posx"],rooms[enteredid]["players"][socket.id]["posy"],rooms[enteredid]["players"][socket.id]["angle"],rooms[enteredid]["players"][socket.id]["becomeZombie"],playerstate])
      
    
    sendCoordinates(dx,dy,socket.id,enteredid);
  
  
  }
  function go(key,prevDirection,prevMotion,a,b,socketid,socket,boxes,enteredid){
    if(key=="rightKey" && !willCollide(20,0,a,b,boxes) && prevDirection!="left"){
      move(-speed,0,socket,enteredid,boxes);
      prevDirection="right";
      prevMotion=()=>{move(-speed,0,socket,enteredid,boxes)};
    }
    else if(key=="leftKey"  && !willCollide(-20,0,a,b,boxes) && prevDirection!="right"){
      move(speed,0,socket,enteredid,boxes);
      prevDirection="left";
      prevMotion=()=>{move(speed,0,socket,enteredid,boxes)};
    }
    else if(key=="upKey"  && !willCollide(0,-20,a,b,boxes) && prevDirection!="down"){
      move(0,speed,socket,enteredid,boxes);
      prevDirection="up";
      prevMotion=()=>{move(0,speed,socket,enteredid,boxes)};
    }
    else if(key=="downKey"  && !willCollide(0,20,a,b,boxes) && prevDirection!="up"){
      move(0,-speed,socket,enteredid,boxes);
      prevDirection="down";
      prevMotion=()=>{move(0,-speed,socket,enteredid,boxes)};
    }
    else{
        if(typeof prevMotion==="function"){
          prevMotion()
        }
           
    }

    return [prevDirection,prevMotion]
  } 
  function edgeMove(x,y,prevDirection,prevMotion,socketid,socket,boxes,enteredid){
  let player=rooms[enteredid]["players"][socket.id]
  if(player["leftedge"]>=x-widthOfCharecter/2){
      move(-speed,0,socket,enteredid,boxes);
      prevDirection="right";
      prevMotion=()=>{move(-speed,0,socket,enteredid,boxes)};
      sendCoordinates(-speed,0,socketid,enteredid)
      
      
  }
  else if(player["rightedge"]<=x+widthOfCharecter/2){
      move(speed,0,socket,enteredid,boxes);
      prevDirection="left";
      prevMotion=()=>{move(speed,0,socket,enteredid,boxes)};
      sendCoordinates(speed,0,socketid,enteredid)
      
  }
  else if(player["topedge"]>=y-heightOfCharecter/2){
      move(0,-speed,socket,enteredid,boxes);
      prevDirection="down";
      prevMotion=()=>{move(0,-speed,socket,enteredid,boxes)};
      sendCoordinates(0,-speed,socketid,enteredid)
      
  }
  else if(player["bottomedge"]<=y+heightOfCharecter/2){
      move(0,speed,socket,enteredid,boxes);
      prevDirection="up";
      prevMotion=()=>{move(0,speed,socket,enteredid,boxes)};
      sendCoordinates(0,speed,socketid,enteredid)
  }
  return [prevDirection,prevMotion]
  }


export {
    generateRandomPositionOfOther,
    sendCoordinates,
    willCollide,
    move,
    go,
    edgeMove
  }
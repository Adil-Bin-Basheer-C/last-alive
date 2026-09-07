import rooms from "../state/rooms.js"
function joinedPlayersStatus(enteredid){
    let joinedplayers=[]
    let startmatch=true
 
      Object.entries(rooms[enteredid]["players"]).forEach(([key,value])=>{
        let temp=[]
        temp.push(value.name)
        temp.push(value.readyToMatch)
        if(value.readyToMatch==false){
          startmatch=false
        }
        joinedplayers.push(temp)
      })

    return [joinedplayers,startmatch]
  }
  function initializePlayers(enteredid,socketid,name){

    rooms[enteredid]["players"][socketid]={}
      rooms[enteredid]["players"][socketid]["name"]=name
      rooms[enteredid]["players"][socketid]["becomeZombie"]=false
      rooms[enteredid]["players"][socketid]["block"]=false;
      rooms[enteredid]["players"][socketid]["readyToMatch"]=false;
  }


 export {
    joinedPlayersStatus,
    initializePlayers
  }

import { useState,useRef,useEffect, useMemo } from 'react'
import './App.css'
import Me from './components/Me';
import Others from './components/Others'
import Room from './components/Room'
import forest from './assets/images/forest.png'
import GameMap from './components/GameMap';
import Winner from './components/Winner';
import Timer from './components/Timer'
import Loading from './components/Loading'
import { useRoom } from './components/useRoom';
import { useGame } from './components/useGame';
import { socket } from './socket/socket';
import { gap,centerX,centerY,zoom,widthOfCharecter,heightOfCharecter } from './config/constants';
console.log("socket connected?", socket.connected);


function App(){
const edgeOfContainer=useRef();

const {roomID,players,createRoom,enteredRoomID,iamReady,enterMatch,leaveRoom,roomState,showRoomPage}=useRoom()
const {currentPositionOfOthers,angle,currentPosition,becameZombie,winner,loading}=useGame(edgeOfContainer,roomID,enterMatch)
const noOfColumns=Math.max(30,8)
const noOfRows=Math.max(30,8)
const widthOfBox=1800/10
const heightOfBox=1500/10
const ultimateContainer=useRef();
const lastTime=useRef(0);
const flip=useRef(false);


useEffect(()=>{
  socket.on("connect",()=>{
  })
},[])


useEffect(()=>{
  let animationid
  function flipFunction(timestamp){
  if(!lastTime.current || timestamp-lastTime.current>100){
    lastTime.current=timestamp;
    flip.current=!flip.current;
  }
  animationid=requestAnimationFrame(flipFunction)
}
  animationid=requestAnimationFrame(flipFunction)
  return ()=>{
    if(animationid){
      cancelAnimationFrame(animationid)
    }
  }
},[])


useEffect(()=>{
  let translateid
  let lastTime1=0
  function translateField(timestamp){
    if(edgeOfContainer.current){
        if (enterMatch){
          edgeOfContainer.current.style.transform=`translate(${currentPosition.current.x}px,${currentPosition.current.y}px)`
        }
        else{
          edgeOfContainer.current.style.transform=`translate(${0}px,${0}px)`
        }
        
        lastTime1=timestamp
    }
    
    translateid=requestAnimationFrame(translateField)
  }
  translateid=requestAnimationFrame(translateField)

  return ()=>{
    cancelAnimationFrame(translateid)
  }
},[enterMatch])
 


  return(
    <>
    {(enterMatch && loading) && <Loading/>}
    {!enterMatch && <Room setRoomCreate={createRoom} setReady={iamReady} roomid={roomID} players={players} setEnteredRoomID={enteredRoomID} setLeaveRoom={leaveRoom} roomState={roomState}/>}
    

    {enterMatch && <div ref={ultimateContainer} style={{background:"#1B4332",position: 'absolute'}}> 
      
        {
          winner && <Winner winner={winner} showRoomPage={showRoomPage} />
        }
        {
          !winner && <Timer />
        }
       
        <Me angle={angle} flip={flip.current} becameZombie={becameZombie} />

        <div 
          ref={edgeOfContainer}
          style={{
          display:'grid',
          gap: `${gap}px ${gap}px`,
          gridTemplateColumns:`repeat(${noOfColumns},${widthOfBox}px)`,
          position:'relative',
          border:"8px solid #0d1116",
          zIndex:6
        }}>
         <GameMap noOfColumns={noOfColumns} noOfRows={noOfRows} widthOfBox={widthOfBox} heightOfBox={heightOfBox} />
        </div>
          {
          currentPosition.current.x!=null && currentPositionOfOthers && Object.entries(currentPositionOfOthers).filter(([socketId,position])=>{
            return  socketId!=socket.id;
          }).map(([socketId, position], index) => {
    
            
            var left = (centerX-position.posx) +currentPosition.current.x;    
            var top = (centerY-position.posy) +currentPosition.current.y;
           
        
            
  return <Others angle={position.angle} flip={flip.current} left={left} top={top} key={socketId} img={position.becomeZombie} name={position.name} />;
})

        }

      
    </div>}
    </>
  )
}

export default App

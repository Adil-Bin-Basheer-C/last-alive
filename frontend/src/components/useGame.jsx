import { useEffect,useState,useRef } from "react";
import { socket } from "../socket/socket";

export function useGame(edgeOfContainer,roomid,enterMatch){
    const currentPosition=useRef({ x:null,y:null})
    const [angle,setAngle]=useState(0)
    const [currClickedKey,setCurrClickedKey]=useState("")
    const [becameZombie,setBecameZombie]=useState(false)
    const [currentPositionOfOthers,setcurrentPositionOfOthers]=useState({})
    const [winner,setWinner]=useState("")
    const [roomID,setRoomID]=useState("")
    const [loading,setLoading]=useState(null)
    const inte=useRef(null)

    
  useEffect(()=>{
        socket.on("all_initialized",(input)=>{

            setLoading(input)
        });
  },[])
    useEffect(()=>{
     
        setWinner("")
        if(edgeOfContainer.current && enterMatch){

        let boxes=Array.from(document.getElementsByClassName('boxes')).map(el=>{
          
          return {
            right: el.getBoundingClientRect().right,
            left: el.getBoundingClientRect().left,
            bottom: el.getBoundingClientRect().bottom,
            top: el.getBoundingClientRect().top
          };
        });
      let edges=edgeOfContainer.current.getBoundingClientRect()
      let leftedge=edges.left
      let rightedge=edges.right
      let topedge=edges.top
      let bottomedge=edges.bottom

        socket.emit("send_dim",[boxes,leftedge,rightedge,topedge,bottomedge,roomid]);
      
      
  
      }
    },[enterMatch])
 
  let last = performance.now();
    useEffect(()=>{
      socket.on("receive_player_state",(playerState)=>{
       
          currentPosition.current={x:playerState[0],y:playerState[1]}
          setAngle(playerState[2])
          setBecameZombie(playerState[3])
          setcurrentPositionOfOthers(playerState[4])
          const now = performance.now();

    last = now;
        
    
        })
        return ()=>{
          socket.off("receive_player_state")
       }
    },[])

    useEffect(()=>{
 
      socket.on("survived",(input)=>{

        if(input[0]){
          setWinner(input[1])
        }
        else{
          setWinner("No one survived")
        }

      })
       return ()=>{
          socket.off("survived")
       }
    },[])
    


    useEffect(()=>{
      function movement(e){
        if(e.key=="ArrowRight"){
          setCurrClickedKey("rightKey")
        }
        else if(e.key=="ArrowLeft"){
          setCurrClickedKey("leftKey")
        }
        else if(e.key=="ArrowUp"){
          setCurrClickedKey("upKey")
        }
        else if(e.key=="ArrowDown"){
          setCurrClickedKey("downKey")
        }
        
      }
    
      document.addEventListener("keydown",movement)
      if(roomid && enterMatch){
    
        socket.emit("send_arrow",[currClickedKey,roomid]);
     
       return()=>{
       
        document.removeEventListener("keydown",movement);
      }
      }
     
     },[enterMatch,currClickedKey])

 
    return{
        currentPositionOfOthers,
        angle,
        currentPosition,
        becameZombie,
        winner,
        loading
    }
    
}


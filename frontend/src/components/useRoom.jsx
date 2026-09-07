import { useEffect,useState } from "react";
import { socket } from "../socket/socket";
import { initializePlayers,joinedPlayersStatus } from "../../../server/utils/playerUtils";
import rooms from "../../../server/state/rooms";
export function useRoom(){

    const [roomID,setRoomID]=useState("")
    const [players,setPlayers]=useState("")
    const [enterMatch,setEnterMatch]=useState(false)
    const [roomState,setRoomState]=useState("ok")
    const [name,setName]=useState("")


    const createRoom=(name)=>{
        setName(name)
        socket.emit("create_room",name)
    }
    const enteredRoomID=(input)=>{
        setName(input[1])
        socket.emit("enteredRoomID",input)
    }
    const iamReady=(ready)=>{
        socket.emit("i_am_ready",[ready,roomID])
    }
    const leaveRoom=()=>{
        socket.emit("leave_room",roomID)
    }
    const showRoomPage=()=>{
        socket.emit("show_room_page",roomID)
    }


    useEffect(()=>{
        socket.on("get_room_id",(input)=>{
            setRoomID(input[0])
            setPlayers(input[1])
        })
        socket.on("validOrNot",(input)=>{  
            setRoomID(input[1])
            setPlayers(input[0])
            setRoomState("ok")
        })
        socket.on("start_match",(input)=>{
            setPlayers(input[0])
            if(input[1]){
                setEnterMatch(input[1])
            }
            
        })
       
        socket.on("room_state",(input)=>{
            setRoomState(input)
        })
        socket.on("get_players",(pls)=>{
            setPlayers(pls)
            setEnterMatch(false)
        })

        return ()=>{
          socket.off("get_room_id")
          socket.off("validOrNot")
          socket.off("start_match")
          socket.off("room_state")
       }
    },[])

    return {roomID,players,createRoom,enteredRoomID,iamReady,enterMatch,leaveRoom,roomState,showRoomPage}
}
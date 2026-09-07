import { useEffect, useState, useRef } from "react"
import { socket } from "../socket/socket"

function Timer(){
    const [timer,setTimer]=useState(false)
    const [timeLeft,setTimeLeft]=useState(30)
    const interval=useRef(null)
    
    useEffect(()=>{
        socket.on("timer",(input)=>{
      
                setTimer(input)
           
        })
        return () => {
            socket.off("timer")
        }
    },[])

    useEffect(()=>{
        if(!timer){
            if(interval.current){
                clearInterval(interval.current)
                return
            }
        }
        interval.current=setInterval(()=>{
            setTimeLeft((prev)=>{
                if(prev<=1){
                    clearInterval(interval.current)
                    return 0
                }
                return prev-1
            })
        },1000)
    },[timer])

    return(
        <div style={styles.wrapper}>
            {
                timer && (
                    <div style={styles.timerBadge}>
                        <span style={styles.timeText}>{timeLeft}s</span>
                    </div>
                )
            }
        </div>
    )
}

const styles = {
    wrapper: {
        position: "fixed",
        top: "16px",
        right: "16px",
        zIndex: 9999,
    },
    timerBadge: {
        backgroundColor: "#1e293b",
        color: "#f8fafc",
        padding: "8px 16px",
        borderRadius: "9999px",
        border: "1px solid #38bdf8",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontWeight: "bold",
        fontSize: "0.95rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    timeText: {
        color: "#38bdf8",
        letterSpacing: "0.5px",
    }
}

export default Timer
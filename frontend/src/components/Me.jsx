import React from "react";
import { useState,useRef,useEffect } from "react";
import manRunning from '../assets/images/man-running.png'
import zombie from '../assets/images/police.png'
import {centerX,centerY,widthOfCharecter,heightOfCharecter } from "../config/constants"; 

function Me({angle,flip,becameZombie}){
  const imgOfMe=useRef(manRunning);
  const manRef=useRef();
  useEffect(()=>{
     imgOfMe.current=becameZombie ? zombie : manRunning;
  },[becameZombie])
    return(
        <img src={imgOfMe.current}
        ref={manRef}
        style={{
          position:'absolute',
          width:`${widthOfCharecter}px`,
          height:`${heightOfCharecter}px`,
          left:`${centerX}px`,
          top:`${centerY}px`,
          transform:`translate(-50%,-50%) rotateZ(${angle}deg) scaleY(${flip ? -1 : 1})`,
          zIndex:5,
   
        }}
        />
    )
}
export default Me;
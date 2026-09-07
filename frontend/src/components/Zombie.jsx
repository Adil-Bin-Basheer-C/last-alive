import React from 'react'
import { useState,useRef,useEffect } from 'react'
import manRunning from '../assets/images/police.png'
import { widthOfCharecter,heightOfCharecter } from '../config/constants'
function Zombie({angle,flip,left,top}){

    return(
        <img src={manRunning}
        style={{
          position:'absolute',
          width:`${widthOfCharecter}px`,
          height:`${heightOfCharecter}px`,
          left:`${left}px`,
          top:`${top}px`,
          transform:`translate(-50%,-50%) rotateZ(${angle}deg) scaleY(${flip ? -1 : 1})`,
          zIndex: 10
        }}
        />
    )
}
export default Zombie;
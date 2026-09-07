import React from "react";
import { useRef, useEffect } from "react";
import manRunning from "../assets/images/man-running.png";
import zombie from "../assets/images/police.png";
import { widthOfCharecter, heightOfCharecter } from "../config/constants";

function Others({ angle, flip, left, top, img, name }) {
  const imgOfMe = useRef(manRunning);

  useEffect(() => {
    imgOfMe.current = img ? zombie : manRunning;
  }, [img]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${left}px`,
        top: `${top}px`,
        transform: "translate(-50%, -50%)",
        zIndex: 10,
        textAlign: "center",
      }}
    >
   
      <div
        style={{
          position: "absolute",

          left: "50%",
          bottom: `${heightOfCharecter / 2 + 16}px`,

          transform: "translateX(-50%)",

          color: "#ffffff",

          fontSize: "12px",
          fontWeight: "300",
          letterSpacing: "2px",

          whiteSpace: "nowrap",

          textShadow: `
      -1px -1px 2px rgba(0,0,0,0.9),
       1px -1px 2px rgba(0,0,0,0.9),
      -1px  1px 2px rgba(0,0,0,0.9),
       1px  1px 2px rgba(0,0,0,0.9)
    `,

          pointerEvents: "none",

          zIndex: 20,
        }}
      >
        {name}
      </div>

  
      <img
        src={imgOfMe.current}
        style={{
          width: `${widthOfCharecter}px`,
          height: `${heightOfCharecter}px`,

          transform: `rotateZ(${angle}deg) scaleY(${flip ? -1 : 1})`,

          display: "block",
        }}
      />
    </div>
  );
}

export default Others;

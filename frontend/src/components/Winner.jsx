import { useState,useEffect } from "react";
import "./Winner.css"
function Winner({winner,showRoomPage}){
    return (
  <div className="result-page">

    <div className="result-card">

      <h1 className="title">Game Over</h1>

      <div className="winner-text">
        {winner === "No one survived"
          ? "💀 No Survivors"
          : `🏆 ${winner} Survived!`
        }
      </div>

      <button
        className="home-btn"
        onClick={() => showRoomPage()}
      >
        Back to Room
      </button>

    </div>

  </div>
);
}
export default Winner

import { useState, useEffect } from "react";
import "./Room.css";

function Room({
  setRoomCreate,
  setReady,
  roomid,
  players,
  setEnteredRoomID,
  setLeaveRoom,
  roomState
}) {
  const [enteringID, setEnteringID] = useState("");
  const [name, setName] = useState("");
  const [roomID, setRoomID] = useState("");

  function createRoomClicked() {
    if (!name.trim()) return;

    setRoomCreate(name);
  }

  useEffect(() => {
    setRoomID(roomid);
  }, [roomid]);

  return (
    <div className="game-page">

      {!roomID && (
        <div className="room-menu">

          <div className="menu-header">
            <h1>SURVIVAL</h1>
            <p>Multiplayer Game</p>
          </div>

          <div className="name-box">
            <label>Your Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value.toUpperCase())
              }
            />
          </div>

          <div className="room-options">

            <div className="room-option">
              <h2>Create a Room</h2>

              <button onClick={createRoomClicked}>
                CREATE ROOM
              </button>

              {roomState === "using" && (
                <p className="error">
                  Room already in use
                </p>
              )}
            </div>

            <div className="or">
              OR
            </div>

            <div className="room-option">
              <h2>Join a Room</h2>

              <input
                type="text"
                placeholder="Enter Room ID"
                value={enteringID}
                onChange={(e) =>
                  setEnteringID(e.target.value.toUpperCase())
                }
              />

              <button
                onClick={() =>
                  setEnteredRoomID([enteringID, name])
                }
              >
                JOIN ROOM
              </button>

              {roomState === "invalidID" && (
                <p className="error">
                  Room not found
                </p>
              )}
            </div>

          </div>

        </div>
      )}

      {roomID && (
        <div className="room-menu">

          <div className="room-heading">
            <p>ROOM</p>
            <h1>{roomID}</h1>
          </div>

          <div className="players-heading">
            Players
            <span>{Object.keys(players).length}</span>
          </div>

          <div
            className="players"
            style={{
              maxHeight: "300px",
              overflowY: "auto"
            }}
          >

            {Object.values(players).map(([player, ready], i) => (
              <div key={i} className="player">

                <span>
                  {player}
                </span>

                <span
                  className={
                    ready
                      ? "ready"
                      : "not-ready"
                  }
                >
                  {ready ? "READY" : "NOT READY"}
                </span>

              </div>
            ))}

          </div>

          <div className="room-buttons">

            <button
              className="start-button"
              onClick={() => setReady(true)}
            >
              START GAME
            </button>

            <button
              className="leave-button"
              onClick={() => {
                setRoomID("");
                setLeaveRoom();
              }}
            >
              LEAVE ROOM
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Room;


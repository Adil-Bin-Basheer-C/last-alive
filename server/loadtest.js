import { io } from "socket.io-client";
import rooms from './state/rooms.js';
import {
  generateRandomPositionOfOther,
  sendCoordinates,
  willCollide,
  move,
  go,
  edgeMove
} from "./game/movement.js"

import { centerX, centerY, zoom, widthOfCharecter, heightOfCharecter, speed, currentPositionXMax, currentPositionXMin, currentPositionYMax, currentPositionYMin } from "./config/constants.js"
import { initializePlayers } from "./utils/playerUtils.js";
const TOTAL_CLIENTS = 100;

let connected = 0;
let latency = [];
const arr=["leftKey","rightKey","upKey","downKey"]
for (let i = 0; i < TOTAL_CLIENTS; i++) {

  const socket = io("http://localhost:3001");

  socket.on("connect", () => {
    connected++;
    console.log(`Connected: ${connected}/${TOTAL_CLIENTS}`);
    let enteredid = "ABCDEF"
    socket.emit("enteredRoomID",[enteredid,"A"+i])
    socket.on("validOrNot",(input)=>{
      socket.emit("i_am_ready",[true,enteredid])
    })
    
    const boxes= [

  {

    right: 188,

    left: 8,

    bottom: 158,

    top: 8

  },

  {

    right: 386,

    left: 206,

    bottom: 158,

    top: 8

  },

  {

    right: 584,

    left: 404,

    bottom: 158,

    top: 8

  },

  {

    right: 782,

    left: 602,

    bottom: 158,

    top: 8

  },

  {

    right: 980,

    left: 800,

    bottom: 158,

    top: 8

  },

  {

    right: 1178,

    left: 998,

    bottom: 158,

    top: 8

  },

  {

    right: 1376,

    left: 1196,

    bottom: 158,

    top: 8

  },

  {

    right: 1574,

    left: 1394,

    bottom: 158,

    top: 8

  },

  {

    right: 1772,

    left: 1592,

    bottom: 158,

    top: 8

  },

  {

    right: 1970,

    left: 1790,

    bottom: 158,

    top: 8

  },

  {

    right: 2168,

    left: 1988,

    bottom: 158,

    top: 8

  },

  {

    right: 2366,

    left: 2186,

    bottom: 158,

    top: 8

  },

  {

    right: 2564,

    left: 2384,

    bottom: 158,

    top: 8

  },

  {

    right: 2762,

    left: 2582,

    bottom: 158,

    top: 8

  },

  {

    right: 2960,

    left: 2780,

    bottom: 158,

    top: 8

  },

  {

    right: 3158,

    left: 2978,

    bottom: 158,

    top: 8

  },

  {

    right: 3356,

    left: 3176,

    bottom: 158,

    top: 8

  },

  {

    right: 3554,

    left: 3374,

    bottom: 158,

    top: 8

  },

  {

    right: 3752,

    left: 3572,

    bottom: 158,

    top: 8

  },

  {

    right: 3950,

    left: 3770,

    bottom: 158,

    top: 8

  },

  {

    right: 4148,

    left: 3968,

    bottom: 158,

    top: 8

  },

  {

    right: 4346,

    left: 4166,

    bottom: 158,

    top: 8

  },

  {

    right: 4544,

    left: 4364,

    bottom: 158,

    top: 8

  },

  {

    right: 4742,

    left: 4562,

    bottom: 158,

    top: 8

  },

  {

    right: 4940,

    left: 4760,

    bottom: 158,

    top: 8

  },

  {

    right: 5138,

    left: 4958,

    bottom: 158,

    top: 8

  },

  {

    right: 5336,

    left: 5156,

    bottom: 158,

    top: 8

  },

  {

    right: 5534,

    left: 5354,

    bottom: 158,

    top: 8

  },

  {

    right: 5732,

    left: 5552,

    bottom: 158,

    top: 8

  },

  {

    right: 5930,

    left: 5750,

    bottom: 158,

    top: 8

  },

  {

    right: 6128,

    left: 5948,

    bottom: 158,

    top: 8

  },

  {

    right: 6326,

    left: 6146,

    bottom: 158,

    top: 8

  },

  {

    right: 6524,

    left: 6344,

    bottom: 158,

    top: 8

  },

  {

    right: 6722,

    left: 6542,

    bottom: 158,

    top: 8

  },

  {

    right: 6920,

    left: 6740,

    bottom: 158,

    top: 8

  },

  {

    right: 7118,

    left: 6938,

    bottom: 158,

    top: 8

  },

  {

    right: 7316,

    left: 7136,

    bottom: 158,

    top: 8

  },

  {

    right: 7514,

    left: 7334,

    bottom: 158,

    top: 8

  },

  {

    right: 7712,

    left: 7532,

    bottom: 158,

    top: 8

  },

  {

    right: 7910,

    left: 7730,

    bottom: 158,

    top: 8

  },

  {

    right: 8108,

    left: 7928,

    bottom: 158,

    top: 8

  },

  {

    right: 8306,

    left: 8126,

    bottom: 158,

    top: 8

  },

  {

    right: 8504,

    left: 8324,

    bottom: 158,

    top: 8

  },

  {

    right: 8702,

    left: 8522,

    bottom: 158,

    top: 8

  },

  {

    right: 8900,

    left: 8720,

    bottom: 158,

    top: 8

  },

  {

    right: 9098,

    left: 8918,

    bottom: 158,

    top: 8

  },

  {

    right: 9296,

    left: 9116,

    bottom: 158,

    top: 8

  },

  {

    right: 9494,

    left: 9314,

    bottom: 158,

    top: 8

  },

  {

    right: 9692,

    left: 9512,

    bottom: 158,

    top: 8

  },

  {

    right: 9890,

    left: 9710,

    bottom: 158,

    top: 8

  },

  {

    right: 188,

    left: 8,

    bottom: 326,

    top: 176

  },

  {

    right: 386,

    left: 206,

    bottom: 326,

    top: 176

  },

  {

    right: 584,

    left: 404,

    bottom: 326,

    top: 176

  },

  {

    right: 782,

    left: 602,

    bottom: 326,

    top: 176

  },

  {

    right: 980,

    left: 800,

    bottom: 326,

    top: 176

  },

  {

    right: 1178,

    left: 998,

    bottom: 326,

    top: 176

  },

  {

    right: 1376,

    left: 1196,

    bottom: 326,

    top: 176

  },

  {

    right: 1574,

    left: 1394,

    bottom: 326,

    top: 176

  },

  {

    right: 1772,

    left: 1592,

    bottom: 326,

    top: 176

  },

  {

    right: 1970,

    left: 1790,

    bottom: 326,

    top: 176

  },

  {

    right: 2168,

    left: 1988,

    bottom: 326,

    top: 176

  },

  {

    right: 2366,

    left: 2186,

    bottom: 326,

    top: 176

  },

  {

    right: 2564,

    left: 2384,

    bottom: 326,

    top: 176

  },

  {

    right: 2762,

    left: 2582,

    bottom: 326,

    top: 176

  },

  {

    right: 2960,

    left: 2780,

    bottom: 326,

    top: 176

  },

  {

    right: 3158,

    left: 2978,

    bottom: 326,

    top: 176

  },

  {

    right: 3356,

    left: 3176,

    bottom: 326,

    top: 176

  },

  {

    right: 3554,

    left: 3374,

    bottom: 326,

    top: 176

  },

  {

    right: 3752,

    left: 3572,

    bottom: 326,

    top: 176

  },

  {

    right: 3950,

    left: 3770,

    bottom: 326,

    top: 176

  },

  {

    right: 4148,

    left: 3968,

    bottom: 326,

    top: 176

  },

  {

    right: 4346,

    left: 4166,

    bottom: 326,

    top: 176

  },

  {

    right: 4544,

    left: 4364,

    bottom: 326,

    top: 176

  },

  {

    right: 4742,

    left: 4562,

    bottom: 326,

    top: 176

  },

  {

    right: 4940,

    left: 4760,

    bottom: 326,

    top: 176

  },

  {

    right: 5138,

    left: 4958,

    bottom: 326,

    top: 176

  },

  {

    right: 5336,

    left: 5156,

    bottom: 326,

    top: 176

  },

  {

    right: 5534,

    left: 5354,

    bottom: 326,

    top: 176

  },

  {

    right: 5732,

    left: 5552,

    bottom: 326,

    top: 176

  },

  {

    right: 5930,

    left: 5750,

    bottom: 326,

    top: 176

  },

  {

    right: 6128,

    left: 5948,

    bottom: 326,

    top: 176

  },

  {

    right: 6326,

    left: 6146,

    bottom: 326,

    top: 176

  },

  {

    right: 6524,

    left: 6344,

    bottom: 326,

    top: 176

  },

  {

    right: 6722,

    left: 6542,

    bottom: 326,

    top: 176

  },

  {

    right: 6920,

    left: 6740,

    bottom: 326,

    top: 176

  },

  {

    right: 7118,

    left: 6938,

    bottom: 326,

    top: 176

  },

  {

    right: 7316,

    left: 7136,

    bottom: 326,

    top: 176

  },

  {

    right: 7514,

    left: 7334,

    bottom: 326,

    top: 176

  },

  {

    right: 7712,

    left: 7532,

    bottom: 326,

    top: 176

  },

  {

    right: 7910,

    left: 7730,

    bottom: 326,

    top: 176

  },

  {

    right: 8108,

    left: 7928,

    bottom: 326,

    top: 176

  },

  {

    right: 8306,

    left: 8126,

    bottom: 326,

    top: 176

  },

  {

    right: 8504,

    left: 8324,

    bottom: 326,

    top: 176

  },

  {

    right: 8702,

    left: 8522,

    bottom: 326,

    top: 176

  },

  {

    right: 8900,

    left: 8720,

    bottom: 326,

    top: 176

  },

  {

    right: 9098,

    left: 8918,

    bottom: 326,

    top: 176

  },

  {

    right: 9296,

    left: 9116,

    bottom: 326,

    top: 176

  },

  {

    right: 9494,

    left: 9314,

    bottom: 326,

    top: 176

  },

  {

    right: 9692,

    left: 9512,

    bottom: 326,

    top: 176

  },

  {

    right: 9890,

    left: 9710,

    bottom: 326,

    top: 176

  },

  {

    right: 188,

    left: 8,

    bottom: 494,

    top: 344

  },

  {

    right: 386,

    left: 206,

    bottom: 494,

    top: 344

  },

  {

    right: 584,

    left: 404,

    bottom: 494,

    top: 344

  },

  {

    right: 782,

    left: 602,

    bottom: 494,

    top: 344

  },

  {

    right: 980,

    left: 800,

    bottom: 494,

    top: 344

  },

  {

    right: 1178,

    left: 998,

    bottom: 494,

    top: 344

  },

  {

    right: 1376,

    left: 1196,

    bottom: 494,

    top: 344

  },

  {

    right: 1574,

    left: 1394,

    bottom: 494,

    top: 344

  },

  {

    right: 1772,

    left: 1592,

    bottom: 494,

    top: 344

  },

  {

    right: 1970,

    left: 1790,

    bottom: 494,

    top: 344

  },

  {

    right: 2168,

    left: 1988,

    bottom: 494,

    top: 344

  },

  {

    right: 2366,

    left: 2186,

    bottom: 494,

    top: 344

  },

  {

    right: 2564,

    left: 2384,

    bottom: 494,

    top: 344

  },

  {

    right: 2762,

    left: 2582,

    bottom: 494,

    top: 344

  },

  {

    right: 2960,

    left: 2780,

    bottom: 494,

    top: 344

  },

  {

    right: 3158,

    left: 2978,

    bottom: 494,

    top: 344

  },

  {

    right: 3356,

    left: 3176,

    bottom: 494,

    top: 344

  },

  {

    right: 3554,

    left: 3374,

    bottom: 494,

    top: 344

  },

  {

    right: 3752,

    left: 3572,

    bottom: 494,

    top: 344

  },

  {

    right: 3950,

    left: 3770,

    bottom: 494,

    top: 344

  },

  {

    right: 4148,

    left: 3968,

    bottom: 494,

    top: 344

  },

  {

    right: 4346,

    left: 4166,

    bottom: 494,

    top: 344

  },

  {

    right: 4544,

    left: 4364,

    bottom: 494,

    top: 344

  },

  {

    right: 4742,

    left: 4562,

    bottom: 494,

    top: 344

  },

  {

    right: 4940,

    left: 4760,

    bottom: 494,

    top: 344

  },

  {

    right: 5138,

    left: 4958,

    bottom: 494,

    top: 344

  },

  {

    right: 5336,

    left: 5156,

    bottom: 494,

    top: 344

  },

  {

    right: 5534,

    left: 5354,

    bottom: 494,

    top: 344

  },

  {

    right: 5732,

    left: 5552,

    bottom: 494,

    top: 344

  },

  {

    right: 5930,

    left: 5750,

    bottom: 494,

    top: 344

  },

  {

    right: 6128,

    left: 5948,

    bottom: 494,

    top: 344

  },

  {

    right: 6326,

    left: 6146,

    bottom: 494,

    top: 344

  },

  {

    right: 6524,

    left: 6344,

    bottom: 494,

    top: 344

  },

  {

    right: 6722,

    left: 6542,

    bottom: 494,

    top: 344

  },

  {

    right: 6920,

    left: 6740,

    bottom: 494,

    top: 344

  },

  {

    right: 7118,

    left: 6938,

    bottom: 494,

    top: 344

  },

  {

    right: 7316,

    left: 7136,

    bottom: 494,

    top: 344

  },

  {

    right: 7514,

    left: 7334,

    bottom: 494,

    top: 344

  },

  {

    right: 7712,

    left: 7532,

    bottom: 494,

    top: 344

  },

  {

    right: 7910,

    left: 7730,

    bottom: 494,

    top: 344

  },

  {

    right: 8108,

    left: 7928,

    bottom: 494,

    top: 344

  },

  {

    right: 8306,

    left: 8126,

    bottom: 494,

    top: 344

  },

  {

    right: 8504,

    left: 8324,

    bottom: 494,

    top: 344

  },

  {

    right: 8702,

    left: 8522,

    bottom: 494,

    top: 344

  },

  {

    right: 8900,

    left: 8720,

    bottom: 494,

    top: 344

  },

  {

    right: 9098,

    left: 8918,

    bottom: 494,

    top: 344

  },

  {

    right: 9296,

    left: 9116,

    bottom: 494,

    top: 344

  },

  {

    right: 9494,

    left: 9314,

    bottom: 494,

    top: 344

  },

  {

    right: 9692,

    left: 9512,

    bottom: 494,

    top: 344

  },

  {

    right: 9890,

    left: 9710,

    bottom: 494,

    top: 344

  },

  {

    right: 188,

    left: 8,

    bottom: 662,

    top: 512

  },

  {

    right: 386,

    left: 206,

    bottom: 662,

    top: 512

  },

  {

    right: 584,

    left: 404,

    bottom: 662,

    top: 512

  },

  {

    right: 782,

    left: 602,

    bottom: 662,

    top: 512

  },

  {

    right: 980,

    left: 800,

    bottom: 662,

    top: 512

  },

  {

    right: 1178,

    left: 998,

    bottom: 662,

    top: 512

  },

  {

    right: 1376,

    left: 1196,

    bottom: 662,

    top: 512

  },

  {

    right: 1574,

    left: 1394,

    bottom: 662,

    top: 512

  },

  {

    right: 1772,

    left: 1592,

    bottom: 662,

    top: 512

  },

  {

    right: 1970,

    left: 1790,

    bottom: 662,

    top: 512

  },

  {

    right: 2168,

    left: 1988,

    bottom: 662,

    top: 512

  },

  {

    right: 2366,

    left: 2186,

    bottom: 662,

    top: 512

  },

  {

    right: 2564,

    left: 2384,

    bottom: 662,

    top: 512

  },

  {

    right: 2762,

    left: 2582,

    bottom: 662,

    top: 512

  },

  {

    right: 2960,

    left: 2780,

    bottom: 662,

    top: 512

  },

  {

    right: 3158,

    left: 2978,

    bottom: 662,

    top: 512

  },

  {

    right: 3356,

    left: 3176,

    bottom: 662,

    top: 512

  },

  {

    right: 3554,

    left: 3374,

    bottom: 662,

    top: 512

  },

  {

    right: 3752,

    left: 3572,

    bottom: 662,

    top: 512

  },

  {

    right: 3950,

    left: 3770,

    bottom: 662,

    top: 512

  },

  {

    right: 4148,

    left: 3968,

    bottom: 662,

    top: 512

  },

  {

    right: 4346,

    left: 4166,

    bottom: 662,

    top: 512

  },

  {

    right: 4544,

    left: 4364,

    bottom: 662,

    top: 512

  },

  {

    right: 4742,

    left: 4562,

    bottom: 662,

    top: 512

  },

  {

    right: 4940,

    left: 4760,

    bottom: 662,

    top: 512

  },

  {

    right: 5138,

    left: 4958,

    bottom: 662,

    top: 512

  },

  {

    right: 5336,

    left: 5156,

    bottom: 662,

    top: 512

  },

  {

    right: 5534,

    left: 5354,

    bottom: 662,

    top: 512

  },

  {

    right: 5732,

    left: 5552,

    bottom: 662,

    top: 512

  },

  {

    right: 5930,

    left: 5750,

    bottom: 662,

    top: 512

  },

  {

    right: 6128,

    left: 5948,

    bottom: 662,

    top: 512

  },

  {

    right: 6326,

    left: 6146,

    bottom: 662,

    top: 512

  },

  {

    right: 6524,

    left: 6344,

    bottom: 662,

    top: 512

  },

  {

    right: 6722,

    left: 6542,

    bottom: 662,

    top: 512

  },

  {

    right: 6920,

    left: 6740,

    bottom: 662,

    top: 512

  },

  {

    right: 7118,

    left: 6938,

    bottom: 662,

    top: 512

  },

  {

    right: 7316,

    left: 7136,

    bottom: 662,

    top: 512

  },

  {

    right: 7514,

    left: 7334,

    bottom: 662,

    top: 512

  },

  {

    right: 7712,

    left: 7532,

    bottom: 662,

    top: 512

  },

  {

    right: 7910,

    left: 7730,

    bottom: 662,

    top: 512

  },

  {

    right: 8108,

    left: 7928,

    bottom: 662,

    top: 512

  },

  {

    right: 8306,

    left: 8126,

    bottom: 662,

    top: 512

  },

  {

    right: 8504,

    left: 8324,

    bottom: 662,

    top: 512

  },

  {

    right: 8702,

    left: 8522,

    bottom: 662,

    top: 512

  },

  {

    right: 8900,

    left: 8720,

    bottom: 662,

    top: 512

  },

  {

    right: 9098,

    left: 8918,

    bottom: 662,

    top: 512

  },

  {

    right: 9296,

    left: 9116,

    bottom: 662,

    top: 512

  },

  {

    right: 9494,

    left: 9314,

    bottom: 662,

    top: 512

  },

  {

    right: 9692,

    left: 9512,

    bottom: 662,

    top: 512

  },

  {

    right: 9890,

    left: 9710,

    bottom: 662,

    top: 512

  },

  {

    right: 188,

    left: 8,

    bottom: 830,

    top: 680

  },

  {

    right: 386,

    left: 206,

    bottom: 830,

    top: 680

  },

  {

    right: 584,

    left: 404,

    bottom: 830,

    top: 680

  },

  {

    right: 782,

    left: 602,

    bottom: 830,

    top: 680

  },

  {

    right: 980,

    left: 800,

    bottom: 830,

    top: 680

  },

  {

    right: 1178,

    left: 998,

    bottom: 830,

    top: 680

  },

  {

    right: 1376,

    left: 1196,

    bottom: 830,

    top: 680

  },

  {

    right: 1574,

    left: 1394,

    bottom: 830,

    top: 680

  },

  {

    right: 1772,

    left: 1592,

    bottom: 830,

    top: 680

  },

  {

    right: 1970,

    left: 1790,

    bottom: 830,

    top: 680

  },

  {

    right: 2168,

    left: 1988,

    bottom: 830,

    top: 680

  },

  {

    right: 2366,

    left: 2186,

    bottom: 830,

    top: 680

  },

  {

    right: 2564,

    left: 2384,

    bottom: 830,

    top: 680

  },

  {

    right: 2762,

    left: 2582,

    bottom: 830,

    top: 680

  },

  {

    right: 2960,

    left: 2780,

    bottom: 830,

    top: 680

  },

  {

    right: 3158,

    left: 2978,

    bottom: 830,

    top: 680

  },

  {

    right: 3356,

    left: 3176,

    bottom: 830,

    top: 680

  },

  {

    right: 3554,

    left: 3374,

    bottom: 830,

    top: 680

  },

  {

    right: 3752,

    left: 3572,

    bottom: 830,

    top: 680

  },

  {

    right: 3950,

    left: 3770,

    bottom: 830,

    top: 680

  },

  {

    right: 4148,

    left: 3968,

    bottom: 830,

    top: 680

  },

  {

    right: 4346,

    left: 4166,

    bottom: 830,

    top: 680

  },

  {

    right: 4544,

    left: 4364,

    bottom: 830,

    top: 680

  },

  {

    right: 4742,

    left: 4562,

    bottom: 830,

    top: 680

  },

  {

    right: 4940,

    left: 4760,

    bottom: 830,

    top: 680

  },

  {

    right: 5138,

    left: 4958,

    bottom: 830,

    top: 680

  },

  {

    right: 5336,

    left: 5156,

    bottom: 830,

    top: 680

  },

  {

    right: 5534,

    left: 5354,

    bottom: 830,

    top: 680

  },

  {

    right: 5732,

    left: 5552,

    bottom: 830,

    top: 680

  },

  {

    right: 5930,

    left: 5750,

    bottom: 830,

    top: 680

  },

  {

    right: 6128,

    left: 5948,

    bottom: 830,

    top: 680

  },

  {

    right: 6326,

    left: 6146,

    bottom: 830,

    top: 680

  },

  {

    right: 6524,

    left: 6344,

    bottom: 830,

    top: 680

  },

  {

    right: 6722,

    left: 6542,

    bottom: 830,

    top: 680

  },

  {

    right: 6920,

    left: 6740,

    bottom: 830,

    top: 680

  },

  {

    right: 7118,

    left: 6938,

    bottom: 830,

    top: 680

  },

  {

    right: 7316,

    left: 7136,

    bottom: 830,

    top: 680

  },

  {

    right: 7514,

    left: 7334,

    bottom: 830,

    top: 680

  },

  {

    right: 7712,

    left: 7532,

    bottom: 830,

    top: 680

  },

  {

    right: 7910,

    left: 7730,

    bottom: 830,

    top: 680

  },

  {

    right: 8108,

    left: 7928,

    bottom: 830,

    top: 680

  },

  {

    right: 8306,

    left: 8126,

    bottom: 830,

    top: 680

  },

  {

    right: 8504,

    left: 8324,

    bottom: 830,

    top: 680

  },

  {

    right: 8702,

    left: 8522,

    bottom: 830,

    top: 680

  },

  {

    right: 8900,

    left: 8720,

    bottom: 830,

    top: 680

  },

  {

    right: 9098,

    left: 8918,

    bottom: 830,

    top: 680

  },

  {

    right: 9296,

    left: 9116,

    bottom: 830,

    top: 680

  },

  {

    right: 9494,

    left: 9314,

    bottom: 830,

    top: 680

  },

  {

    right: 9692,

    left: 9512,

    bottom: 830,

    top: 680

  },

  {

    right: 9890,

    left: 9710,

    bottom: 830,

    top: 680

  },

  {

    right: 188,

    left: 8,

    bottom: 998,

    top: 848

  },

  {

    right: 386,

    left: 206,

    bottom: 998,

    top: 848

  },

  {

    right: 584,

    left: 404,

    bottom: 998,

    top: 848

  },

  {

    right: 782,

    left: 602,

    bottom: 998,

    top: 848

  },

  {

    right: 980,

    left: 800,

    bottom: 998,

    top: 848

  },

  {

    right: 1178,

    left: 998,

    bottom: 998,

    top: 848

  },

  {

    right: 1376,

    left: 1196,

    bottom: 998,

    top: 848

  },

  {

    right: 1574,

    left: 1394,

    bottom: 998,

    top: 848

  },

  {

    right: 1772,

    left: 1592,

    bottom: 998,

    top: 848

  },

  {

    right: 1970,

    left: 1790,

    bottom: 998,

    top: 848

  },

  {

    right: 2168,

    left: 1988,

    bottom: 998,

    top: 848

  },

  {

    right: 2366,

    left: 2186,

    bottom: 998,

    top: 848

  },

  {

    right: 2564,

    left: 2384,

    bottom: 998,

    top: 848

  },

  {

    right: 2762,

    left: 2582,

    bottom: 998,

    top: 848

  },

  {

    right: 2960,

    left: 2780,

    bottom: 998,

    top: 848

  },

  {

    right: 3158,

    left: 2978,

    bottom: 998,

    top: 848

  },

  {

    right: 3356,

    left: 3176,

    bottom: 998,

    top: 848

  },

  {

    right: 3554,

    left: 3374,

    bottom: 998,

    top: 848

  },

  {

    right: 3752,

    left: 3572,

    bottom: 998,

    top: 848

  },

  {

    right: 3950,

    left: 3770,

    bottom: 998,

    top: 848

  },

  {

    right: 4148,

    left: 3968,

    bottom: 998,

    top: 848

  },

  {

    right: 4346,

    left: 4166,

    bottom: 998,

    top: 848

  },

  {

    right: 4544,

    left: 4364,

    bottom: 998,

    top: 848

  },

  {

    right: 4742,

    left: 4562,

    bottom: 998,

    top: 848

  },

  {

    right: 4940,

    left: 4760,

    bottom: 998,

    top: 848

  },

  {

    right: 5138,

    left: 4958,

    bottom: 998,

    top: 848

  },

  {

    right: 5336,

    left: 5156,

    bottom: 998,

    top: 848

  },

  {

    right: 5534,

    left: 5354,

    bottom: 998,

    top: 848

  },

  {

    right: 5732,

    left: 5552,

    bottom: 998,

    top: 848

  },

  {

    right: 5930,

    left: 5750,

    bottom: 998,

    top: 848

  },

  {

    right: 6128,

    left: 5948,

    bottom: 998,

    top: 848

  },

  {

    right: 6326,

    left: 6146,

    bottom: 998,

    top: 848

  },

  {

    right: 6524,

    left: 6344,

    bottom: 998,

    top: 848

  },

  {

    right: 6722,

    left: 6542,

    bottom: 998,

    top: 848

  },

  {

    right: 6920,

    left: 6740,

    bottom: 998,

    top: 848

  },

  {

    right: 7118,

    left: 6938,

    bottom: 998,

    top: 848

  },

  {

    right: 7316,

    left: 7136,

    bottom: 998,

    top: 848

  },

  {

    right: 7514,

    left: 7334,

    bottom: 998,

    top: 848

  },

  {

    right: 7712,

    left: 7532,

    bottom: 998,

    top: 848

  },

  {

    right: 7910,

    left: 7730,

    bottom: 998,

    top: 848

  },

  {

    right: 8108,

    left: 7928,

    bottom: 998,

    top: 848

  },

  {

    right: 8306,

    left: 8126,

    bottom: 998,

    top: 848

  },

  {

    right: 8504,

    left: 8324,

    bottom: 998,

    top: 848

  },

  {

    right: 8702,

    left: 8522,

    bottom: 998,

    top: 848

  },

  {

    right: 8900,

    left: 8720,

    bottom: 998,

    top: 848

  },

  {

    right: 9098,

    left: 8918,

    bottom: 998,

    top: 848

  },

  {

    right: 9296,

    left: 9116,

    bottom: 998,

    top: 848

  },

  {

    right: 9494,

    left: 9314,

    bottom: 998,

    top: 848

  },

  {

    right: 9692,

    left: 9512,

    bottom: 998,

    top: 848

  },

  {

    right: 9890,

    left: 9710,

    bottom: 998,

    top: 848

  },

  {

    right: 188,

    left: 8,

    bottom: 1166,

    top: 1016

  },

  {

    right: 386,

    left: 206,

    bottom: 1166,

    top: 1016

  },

  {

    right: 584,

    left: 404,

    bottom: 1166,

    top: 1016

  },

  {

    right: 782,

    left: 602,

    bottom: 1166,

    top: 1016

  },

  {

    right: 980,

    left: 800,

    bottom: 1166,

    top: 1016

  },

  {

    right: 1178,

    left: 998,

    bottom: 1166,

    top: 1016

  },

  {

    right: 1376,

    left: 1196,

    bottom: 1166,

    top: 1016

  },

  {

    right: 1574,

    left: 1394,

    bottom: 1166,

    top: 1016

  },

  {

    right: 1772,

    left: 1592,

    bottom: 1166,

    top: 1016

  },

  {

    right: 1970,

    left: 1790,

    bottom: 1166,

    top: 1016

  },

  {

    right: 2168,

    left: 1988,

    bottom: 1166,

    top: 1016

  },

  {

    right: 2366,

    left: 2186,

    bottom: 1166,

    top: 1016

  },

  {

    right: 2564,

    left: 2384,

    bottom: 1166,

    top: 1016

  },

  {

    right: 2762,

    left: 2582,

    bottom: 1166,

    top: 1016

  },

  {

    right: 2960,

    left: 2780,

    bottom: 1166,

    top: 1016

  },

  {

    right: 3158,

    left: 2978,

    bottom: 1166,

    top: 1016

  },

  {

    right: 3356,

    left: 3176,

    bottom: 1166,

    top: 1016

  },

  {

    right: 3554,

    left: 3374,

    bottom: 1166,

    top: 1016

  },

  {

    right: 3752,

    left: 3572,

    bottom: 1166,

    top: 1016

  },

  {

    right: 3950,

    left: 3770,

    bottom: 1166,

    top: 1016

  },

  {

    right: 4148,

    left: 3968,

    bottom: 1166,

    top: 1016

  },

  {

    right: 4346,

    left: 4166,

    bottom: 1166,

    top: 1016

  },

  {

    right: 4544,

    left: 4364,

    bottom: 1166,

    top: 1016

  },

  {

    right: 4742,

    left: 4562,

    bottom: 1166,

    top: 1016

  },

  {

    right: 4940,

    left: 4760,

    bottom: 1166,

    top: 1016

  },

  {

    right: 5138,

    left: 4958,

    bottom: 1166,

    top: 1016

  },

  {

    right: 5336,

    left: 5156,

    bottom: 1166,

    top: 1016

  },

  {

    right: 5534,

    left: 5354,

    bottom: 1166,

    top: 1016

  },

  {

    right: 5732,

    left: 5552,

    bottom: 1166,

    top: 1016

  },

  {

    right: 5930,

    left: 5750,

    bottom: 1166,

    top: 1016

  },

  {

    right: 6128,

    left: 5948,

    bottom: 1166,

    top: 1016

  },

  {

    right: 6326,

    left: 6146,

    bottom: 1166,

    top: 1016

  },

  {

    right: 6524,

    left: 6344,

    bottom: 1166,

    top: 1016

  },

  {

    right: 6722,

    left: 6542,

    bottom: 1166,

    top: 1016

  },

  {

    right: 6920,

    left: 6740,

    bottom: 1166,

    top: 1016

  },

  {

    right: 7118,

    left: 6938,

    bottom: 1166,

    top: 1016

  },

  {

    right: 7316,

    left: 7136,

    bottom: 1166,

    top: 1016

  },

  {

    right: 7514,

    left: 7334,

    bottom: 1166,

    top: 1016

  },

  {

    right: 7712,

    left: 7532,

    bottom: 1166,

    top: 1016

  },

  {

    right: 7910,

    left: 7730,

    bottom: 1166,

    top: 1016

  },

  {

    right: 8108,

    left: 7928,

    bottom: 1166,

    top: 1016

  },

  {

    right: 8306,

    left: 8126,

    bottom: 1166,

    top: 1016

  },

  {

    right: 8504,

    left: 8324,

    bottom: 1166,

    top: 1016

  },

  {

    right: 8702,

    left: 8522,

    bottom: 1166,

    top: 1016

  },

  {

    right: 8900,

    left: 8720,

    bottom: 1166,

    top: 1016

  },

  {

    right: 9098,

    left: 8918,

    bottom: 1166,

    top: 1016

  },

  {

    right: 9296,

    left: 9116,

    bottom: 1166,

    top: 1016

  },

  {

    right: 9494,

    left: 9314,

    bottom: 1166,

    top: 1016

  },

  {

    right: 9692,

    left: 9512,

    bottom: 1166,

    top: 1016

  },

  {

    right: 9890,

    left: 9710,

    bottom: 1166,

    top: 1016

  },

  {

    right: 188,

    left: 8,

    bottom: 1334,

    top: 1184

  },

  {

    right: 386,

    left: 206,

    bottom: 1334,

    top: 1184

  },

  {

    right: 584,

    left: 404,

    bottom: 1334,

    top: 1184

  },

  {

    right: 782,

    left: 602,

    bottom: 1334,

    top: 1184

  },

  {

    right: 980,

    left: 800,

    bottom: 1334,

    top: 1184

  },

  {

    right: 1178,

    left: 998,

    bottom: 1334,

    top: 1184

  },

  {

    right: 1376,

    left: 1196,

    bottom: 1334,

    top: 1184

  },

  {

    right: 1574,

    left: 1394,

    bottom: 1334,

    top: 1184

  },

  {

    right: 1772,

    left: 1592,

    bottom: 1334,

    top: 1184

  },

  {

    right: 1970,

    left: 1790,

    bottom: 1334,

    top: 1184

  },

  {

    right: 2168,

    left: 1988,

    bottom: 1334,

    top: 1184

  },

  {

    right: 2366,

    left: 2186,

    bottom: 1334,

    top: 1184

  },

  {

    right: 2564,

    left: 2384,

    bottom: 1334,

    top: 1184

  },

  {

    right: 2762,

    left: 2582,

    bottom: 1334,

    top: 1184

  },

  {

    right: 2960,

    left: 2780,

    bottom: 1334,

    top: 1184

  },

  {

    right: 3158,

    left: 2978,

    bottom: 1334,

    top: 1184

  },

  {

    right: 3356,

    left: 3176,

    bottom: 1334,

    top: 1184

  },

  {

    right: 3554,

    left: 3374,

    bottom: 1334,

    top: 1184

  },

  {

    right: 3752,

    left: 3572,

    bottom: 1334,

    top: 1184

  },

  {

    right: 3950,

    left: 3770,

    bottom: 1334,

    top: 1184

  },

  {

    right: 4148,

    left: 3968,

    bottom: 1334,

    top: 1184

  },

  {

    right: 4346,

    left: 4166,

    bottom: 1334,

    top: 1184

  },

  {

    right: 4544,

    left: 4364,

    bottom: 1334,

    top: 1184

  },

  {

    right: 4742,

    left: 4562,

    bottom: 1334,

    top: 1184

  },

  {

    right: 4940,

    left: 4760,

    bottom: 1334,

    top: 1184

  },

  {

    right: 5138,

    left: 4958,

    bottom: 1334,

    top: 1184

  },

  {

    right: 5336,

    left: 5156,

    bottom: 1334,

    top: 1184

  },

  {

    right: 5534,

    left: 5354,

    bottom: 1334,

    top: 1184

  },

  {

    right: 5732,

    left: 5552,

    bottom: 1334,

    top: 1184

  },

  {

    right: 5930,

    left: 5750,

    bottom: 1334,

    top: 1184

  },

  {

    right: 6128,

    left: 5948,

    bottom: 1334,

    top: 1184

  },

  {

    right: 6326,

    left: 6146,

    bottom: 1334,

    top: 1184

  },

  {

    right: 6524,

    left: 6344,

    bottom: 1334,

    top: 1184

  },

  {

    right: 6722,

    left: 6542,

    bottom: 1334,

    top: 1184

  },

  {

    right: 6920,

    left: 6740,

    bottom: 1334,

    top: 1184

  },

  {

    right: 7118,

    left: 6938,

    bottom: 1334,

    top: 1184

  },

  {

    right: 7316,

    left: 7136,

    bottom: 1334,

    top: 1184

  },

  {

    right: 7514,

    left: 7334,

    bottom: 1334,

    top: 1184

  },

  {

    right: 7712,

    left: 7532,

    bottom: 1334,

    top: 1184

  },

  {

    right: 7910,

    left: 7730,

    bottom: 1334,

    top: 1184

  },

  {

    right: 8108,

    left: 7928,

    bottom: 1334,

    top: 1184

  },

  {

    right: 8306,

    left: 8126,

    bottom: 1334,

    top: 1184

  },

  {

    right: 8504,

    left: 8324,

    bottom: 1334,

    top: 1184

  },

  {

    right: 8702,

    left: 8522,

    bottom: 1334,

    top: 1184

  },

  {

    right: 8900,

    left: 8720,

    bottom: 1334,

    top: 1184

  },

  {

    right: 9098,

    left: 8918,

    bottom: 1334,

    top: 1184

  },

  {

    right: 9296,

    left: 9116,

    bottom: 1334,

    top: 1184

  },

  {

    right: 9494,

    left: 9314,

    bottom: 1334,

    top: 1184

  },

  {

    right: 9692,

    left: 9512,

    bottom: 1334,

    top: 1184

  },

  {

    right: 9890,

    left: 9710,

    bottom: 1334,

    top: 1184

  },

  {

    right: 188,

    left: 8,

    bottom: 1502,

    top: 1352

  },

  {

    right: 386,

    left: 206,

    bottom: 1502,

    top: 1352

  },

  {

    right: 584,

    left: 404,

    bottom: 1502,

    top: 1352

  },

  {

    right: 782,

    left: 602,

    bottom: 1502,

    top: 1352

  },

  {

    right: 980,

    left: 800,

    bottom: 1502,

    top: 1352

  },

  {

    right: 1178,

    left: 998,

    bottom: 1502,

    top: 1352

  },

  {

    right: 1376,

    left: 1196,

    bottom: 1502,

    top: 1352

  },

  {

    right: 1574,

    left: 1394,

    bottom: 1502,

    top: 1352

  },

  {

    right: 1772,

    left: 1592,

    bottom: 1502,

    top: 1352

  },

  {

    right: 1970,

    left: 1790,

    bottom: 1502,

    top: 1352

  },

  {

    right: 2168,

    left: 1988,

    bottom: 1502,

    top: 1352

  },

  {

    right: 2366,

    left: 2186,

    bottom: 1502,

    top: 1352

  },

  {

    right: 2564,

    left: 2384,

    bottom: 1502,

    top: 1352

  },

  {

    right: 2762,

    left: 2582,

    bottom: 1502,

    top: 1352

  },

  {

    right: 2960,

    left: 2780,

    bottom: 1502,

    top: 1352

  },

  {

    right: 3158,

    left: 2978,

    bottom: 1502,

    top: 1352

  },

  {

    right: 3356,

    left: 3176,

    bottom: 1502,

    top: 1352

  },

  {

    right: 3554,

    left: 3374,

    bottom: 1502,

    top: 1352

  },

  {

    right: 3752,

    left: 3572,

    bottom: 1502,

    top: 1352

  },

  {

    right: 3950,

    left: 3770,

    bottom: 1502,

    top: 1352

  },

  {

    right: 4148,

    left: 3968,

    bottom: 1502,

    top: 1352

  },

  {

    right: 4346,

    left: 4166,

    bottom: 1502,

    top: 1352

  },

  {

    right: 4544,

    left: 4364,

    bottom: 1502,

    top: 1352

  },

  {

    right: 4742,

    left: 4562,

    bottom: 1502,

    top: 1352

  },

  {

    right: 4940,

    left: 4760,

    bottom: 1502,

    top: 1352

  },

  {

    right: 5138,

    left: 4958,

    bottom: 1502,

    top: 1352

  },

  {

    right: 5336,

    left: 5156,

    bottom: 1502,

    top: 1352

  },

  {

    right: 5534,

    left: 5354,

    bottom: 1502,

    top: 1352

  },

  {

    right: 5732,

    left: 5552,

    bottom: 1502,

    top: 1352

  },

  {

    right: 5930,

    left: 5750,

    bottom: 1502,

    top: 1352

  },

  {

    right: 6128,

    left: 5948,

    bottom: 1502,

    top: 1352

  },

  {

    right: 6326,

    left: 6146,

    bottom: 1502,

    top: 1352

  },

  {

    right: 6524,

    left: 6344,

    bottom: 1502,

    top: 1352

  },

  {

    right: 6722,

    left: 6542,

    bottom: 1502,

    top: 1352

  },

  {

    right: 6920,

    left: 6740,

    bottom: 1502,

    top: 1352

  },

  {

    right: 7118,

    left: 6938,

    bottom: 1502,

    top: 1352

  },

  {

    right: 7316,

    left: 7136,

    bottom: 1502,

    top: 1352

  },

  {

    right: 7514,

    left: 7334,

    bottom: 1502,

    top: 1352

  },

  {

    right: 7712,

    left: 7532,

    bottom: 1502,

    top: 1352

  },

  {

    right: 7910,

    left: 7730,

    bottom: 1502,

    top: 1352

  },

  {

    right: 8108,

    left: 7928,

    bottom: 1502,

    top: 1352

  },

  {

    right: 8306,

    left: 8126,

    bottom: 1502,

    top: 1352

  },

  {

    right: 8504,

    left: 8324,

    bottom: 1502,

    top: 1352

  },

  {

    right: 8702,

    left: 8522,

    bottom: 1502,

    top: 1352

  },

  {

    right: 8900,

    left: 8720,

    bottom: 1502,

    top: 1352

  },

  {

    right: 9098,

    left: 8918,

    bottom: 1502,

    top: 1352

  },

  {

    right: 9296,

    left: 9116,

    bottom: 1502,

    top: 1352

  },

  {

    right: 9494,

    left: 9314,

    bottom: 1502,

    top: 1352

  },

  {

    right: 9692,

    left: 9512,

    bottom: 1502,

    top: 1352

  },

  {

    right: 9890,

    left: 9710,

    bottom: 1502,

    top: 1352

  },

  {

    right: 188,

    left: 8,

    bottom: 1670,

    top: 1520

  },

  {

    right: 386,

    left: 206,

    bottom: 1670,

    top: 1520

  },

  {

    right: 584,

    left: 404,

    bottom: 1670,

    top: 1520

  },

  {

    right: 782,

    left: 602,

    bottom: 1670,

    top: 1520

  },

  {

    right: 980,

    left: 800,

    bottom: 1670,

    top: 1520

  },

  {

    right: 1178,

    left: 998,

    bottom: 1670,

    top: 1520

  },

  {

    right: 1376,

    left: 1196,

    bottom: 1670,

    top: 1520

  },

  {

    right: 1574,

    left: 1394,

    bottom: 1670,

    top: 1520

  },

  {

    right: 1772,

    left: 1592,

    bottom: 1670,

    top: 1520

  },

  {

    right: 1970,

    left: 1790,

    bottom: 1670,

    top: 1520

  },

  {

    right: 2168,

    left: 1988,

    bottom: 1670,

    top: 1520

  },

  {

    right: 2366,

    left: 2186,

    bottom: 1670,

    top: 1520

  },

  {

    right: 2564,

    left: 2384,

    bottom: 1670,

    top: 1520

  },

  {

    right: 2762,

    left: 2582,

    bottom: 1670,

    top: 1520

  },

  {

    right: 2960,

    left: 2780,

    bottom: 1670,

    top: 1520

  },

  {

    right: 3158,

    left: 2978,

    bottom: 1670,

    top: 1520

  },

  {

    right: 3356,

    left: 3176,

    bottom: 1670,

    top: 1520

  },

  {

    right: 3554,

    left: 3374,

    bottom: 1670,

    top: 1520

  },

  {

    right: 3752,

    left: 3572,

    bottom: 1670,

    top: 1520

  },

  {

    right: 3950,

    left: 3770,

    bottom: 1670,

    top: 1520

  },

  {

    right: 4148,

    left: 3968,

    bottom: 1670,

    top: 1520

  },

  {

    right: 4346,

    left: 4166,

    bottom: 1670,

    top: 1520

  },

  {

    right: 4544,

    left: 4364,

    bottom: 1670,

    top: 1520

  },

  {

    right: 4742,

    left: 4562,

    bottom: 1670,

    top: 1520

  },

  {

    right: 4940,

    left: 4760,

    bottom: 1670,

    top: 1520

  },

  {

    right: 5138,

    left: 4958,

    bottom: 1670,

    top: 1520

  },

  {

    right: 5336,

    left: 5156,

    bottom: 1670,

    top: 1520

  },

  {

    right: 5534,

    left: 5354,

    bottom: 1670,

    top: 1520

  },

  {

    right: 5732,

    left: 5552,

    bottom: 1670,

    top: 1520

  },

  {

    right: 5930,

    left: 5750,

    bottom: 1670,

    top: 1520

  },

  {

    right: 6128,

    left: 5948,

    bottom: 1670,

    top: 1520

  },

  {

    right: 6326,

    left: 6146,

    bottom: 1670,

    top: 1520

  },

  {

    right: 6524,

    left: 6344,

    bottom: 1670,

    top: 1520

  },

  {

    right: 6722,

    left: 6542,

    bottom: 1670,

    top: 1520

  },

  {

    right: 6920,

    left: 6740,

    bottom: 1670,

    top: 1520

  },

  {

    right: 7118,

    left: 6938,

    bottom: 1670,

    top: 1520

  },

  {

    right: 7316,

    left: 7136,

    bottom: 1670,

    top: 1520

  },

  {

    right: 7514,

    left: 7334,

    bottom: 1670,

    top: 1520

  },

  {

    right: 7712,

    left: 7532,

    bottom: 1670,

    top: 1520

  },

  {

    right: 7910,

    left: 7730,

    bottom: 1670,

    top: 1520

  },

  {

    right: 8108,

    left: 7928,

    bottom: 1670,

    top: 1520

  },

  {

    right: 8306,

    left: 8126,

    bottom: 1670,

    top: 1520

  },

  {

    right: 8504,

    left: 8324,

    bottom: 1670,

    top: 1520

  },

  {

    right: 8702,

    left: 8522,

    bottom: 1670,

    top: 1520

  },

  {

    right: 8900,

    left: 8720,

    bottom: 1670,

    top: 1520

  },

  {

    right: 9098,

    left: 8918,

    bottom: 1670,

    top: 1520

  },

  {

    right: 9296,

    left: 9116,

    bottom: 1670,

    top: 1520

  },

  {

    right: 9494,

    left: 9314,

    bottom: 1670,

    top: 1520

  },

  {

    right: 9692,

    left: 9512,

    bottom: 1670,

    top: 1520

  },

  {

    right: 9890,

    left: 9710,

    bottom: 1670,

    top: 1520

  },

  {

    right: 188,

    left: 8,

    bottom: 1838,

    top: 1688

  },

  {

    right: 386,

    left: 206,

    bottom: 1838,

    top: 1688

  },

  {

    right: 584,

    left: 404,

    bottom: 1838,

    top: 1688

  },

  {

    right: 782,

    left: 602,

    bottom: 1838,

    top: 1688

  },

  {

    right: 980,

    left: 800,

    bottom: 1838,

    top: 1688

  },

  {

    right: 1178,

    left: 998,

    bottom: 1838,

    top: 1688

  },

  {

    right: 1376,

    left: 1196,

    bottom: 1838,

    top: 1688

  },

  {

    right: 1574,

    left: 1394,

    bottom: 1838,

    top: 1688

  },

  {

    right: 1772,

    left: 1592,

    bottom: 1838,

    top: 1688

  },

  {

    right: 1970,

    left: 1790,

    bottom: 1838,

    top: 1688

  },

  {

    right: 2168,

    left: 1988,

    bottom: 1838,

    top: 1688

  },

  {

    right: 2366,

    left: 2186,

    bottom: 1838,

    top: 1688

  },

  {

    right: 2564,

    left: 2384,

    bottom: 1838,

    top: 1688

  },

  {

    right: 2762,

    left: 2582,

    bottom: 1838,

    top: 1688

  },

  {

    right: 2960,

    left: 2780,

    bottom: 1838,

    top: 1688

  },

  {

    right: 3158,

    left: 2978,

    bottom: 1838,

    top: 1688

  },

  {

    right: 3356,

    left: 3176,

    bottom: 1838,

    top: 1688

  },

  {

    right: 3554,

    left: 3374,

    bottom: 1838,

    top: 1688

  },

  {

    right: 3752,

    left: 3572,

    bottom: 1838,

    top: 1688

  },

  {

    right: 3950,

    left: 3770,

    bottom: 1838,

    top: 1688

  },

  {

    right: 4148,

    left: 3968,

    bottom: 1838,

    top: 1688

  },

  {

    right: 4346,

    left: 4166,

    bottom: 1838,

    top: 1688

  },

  {

    right: 4544,

    left: 4364,

    bottom: 1838,

    top: 1688

  },

  {

    right: 4742,

    left: 4562,

    bottom: 1838,

    top: 1688

  },

  {

    right: 4940,

    left: 4760,

    bottom: 1838,

    top: 1688

  },

  {

    right: 5138,

    left: 4958,

    bottom: 1838,

    top: 1688

  },

  {

    right: 5336,

    left: 5156,

    bottom: 1838,

    top: 1688

  },

  {

    right: 5534,

    left: 5354,

    bottom: 1838,

    top: 1688

  },

  {

    right: 5732,

    left: 5552,

    bottom: 1838,

    top: 1688

  },

  {

    right: 5930,

    left: 5750,

    bottom: 1838,

    top: 1688

  },

  {

    right: 6128,

    left: 5948,

    bottom: 1838,

    top: 1688

  },

  {

    right: 6326,

    left: 6146,

    bottom: 1838,

    top: 1688

  },

  {

    right: 6524,

    left: 6344,

    bottom: 1838,

    top: 1688

  },

  {

    right: 6722,

    left: 6542,

    bottom: 1838,

    top: 1688

  },

  {

    right: 6920,

    left: 6740,

    bottom: 1838,

    top: 1688

  },

  {

    right: 7118,

    left: 6938,

    bottom: 1838,

    top: 1688

  },

  {

    right: 7316,

    left: 7136,

    bottom: 1838,

    top: 1688

  },

  {

    right: 7514,

    left: 7334,

    bottom: 1838,

    top: 1688

  },

  {

    right: 7712,

    left: 7532,

    bottom: 1838,

    top: 1688

  },

  {

    right: 7910,

    left: 7730,

    bottom: 1838,

    top: 1688

  },

  {

    right: 8108,

    left: 7928,

    bottom: 1838,

    top: 1688

  },

  {

    right: 8306,

    left: 8126,

    bottom: 1838,

    top: 1688

  },

  {

    right: 8504,

    left: 8324,

    bottom: 1838,

    top: 1688

  },

  {

    right: 8702,

    left: 8522,

    bottom: 1838,

    top: 1688

  },

  {

    right: 8900,

    left: 8720,

    bottom: 1838,

    top: 1688

  },

  {

    right: 9098,

    left: 8918,

    bottom: 1838,

    top: 1688

  },

  {

    right: 9296,

    left: 9116,

    bottom: 1838,

    top: 1688

  },

  {

    right: 9494,

    left: 9314,

    bottom: 1838,

    top: 1688

  },

  {

    right: 9692,

    left: 9512,

    bottom: 1838,

    top: 1688

  },

  {

    right: 9890,

    left: 9710,

    bottom: 1838,

    top: 1688

  },

  {

    right: 188,

    left: 8,

    bottom: 2006,

    top: 1856

  },

  {

    right: 386,

    left: 206,

    bottom: 2006,

    top: 1856

  },

  {

    right: 584,

    left: 404,

    bottom: 2006,

    top: 1856

  },

  {

    right: 782,

    left: 602,

    bottom: 2006,

    top: 1856

  },

  {

    right: 980,

    left: 800,

    bottom: 2006,

    top: 1856

  },

  {

    right: 1178,

    left: 998,

    bottom: 2006,

    top: 1856

  },

  {

    right: 1376,

    left: 1196,

    bottom: 2006,

    top: 1856

  },

  {

    right: 1574,

    left: 1394,

    bottom: 2006,

    top: 1856

  },

  {

    right: 1772,

    left: 1592,

    bottom: 2006,

    top: 1856

  },

  {

    right: 1970,

    left: 1790,

    bottom: 2006,

    top: 1856

  },

  {

    right: 2168,

    left: 1988,

    bottom: 2006,

    top: 1856

  },

  {

    right: 2366,

    left: 2186,

    bottom: 2006,

    top: 1856

  },

  {

    right: 2564,

    left: 2384,

    bottom: 2006,

    top: 1856

  },

  {

    right: 2762,

    left: 2582,

    bottom: 2006,

    top: 1856

  },

  {

    right: 2960,

    left: 2780,

    bottom: 2006,

    top: 1856

  },

  {

    right: 3158,

    left: 2978,

    bottom: 2006,

    top: 1856

  },

  {

    right: 3356,

    left: 3176,

    bottom: 2006,

    top: 1856

  },

  {

    right: 3554,

    left: 3374,

    bottom: 2006,

    top: 1856

  },

  {

    right: 3752,

    left: 3572,

    bottom: 2006,

    top: 1856

  },

  {

    right: 3950,

    left: 3770,

    bottom: 2006,

    top: 1856

  },

  {

    right: 4148,

    left: 3968,

    bottom: 2006,

    top: 1856

  },

  {

    right: 4346,

    left: 4166,

    bottom: 2006,

    top: 1856

  },

  {

    right: 4544,

    left: 4364,

    bottom: 2006,

    top: 1856

  },

  {

    right: 4742,

    left: 4562,

    bottom: 2006,

    top: 1856

  },

  {

    right: 4940,

    left: 4760,

    bottom: 2006,

    top: 1856

  },

  {

    right: 5138,

    left: 4958,

    bottom: 2006,

    top: 1856

  },

  {

    right: 5336,

    left: 5156,

    bottom: 2006,

    top: 1856

  },

  {

    right: 5534,

    left: 5354,

    bottom: 2006,

    top: 1856

  },

  {

    right: 5732,

    left: 5552,

    bottom: 2006,

    top: 1856

  },

  {

    right: 5930,

    left: 5750,

    bottom: 2006,

    top: 1856

  },

  {

    right: 6128,

    left: 5948,

    bottom: 2006,

    top: 1856

  },

  {

    right: 6326,

    left: 6146,

    bottom: 2006,

    top: 1856

  },

  {

    right: 6524,

    left: 6344,

    bottom: 2006,

    top: 1856

  },

  {

    right: 6722,

    left: 6542,

    bottom: 2006,

    top: 1856

  },

  {

    right: 6920,

    left: 6740,

    bottom: 2006,

    top: 1856

  },

  {

    right: 7118,

    left: 6938,

    bottom: 2006,

    top: 1856

  },

  {

    right: 7316,

    left: 7136,

    bottom: 2006,

    top: 1856

  },

  {

    right: 7514,

    left: 7334,

    bottom: 2006,

    top: 1856

  },

  {

    right: 7712,

    left: 7532,

    bottom: 2006,

    top: 1856

  },

  {

    right: 7910,

    left: 7730,

    bottom: 2006,

    top: 1856

  },

  {

    right: 8108,

    left: 7928,

    bottom: 2006,

    top: 1856

  },

  {

    right: 8306,

    left: 8126,

    bottom: 2006,

    top: 1856

  },

  {

    right: 8504,

    left: 8324,

    bottom: 2006,

    top: 1856

  },

  {

    right: 8702,

    left: 8522,

    bottom: 2006,

    top: 1856

  },

  {

    right: 8900,

    left: 8720,

    bottom: 2006,

    top: 1856

  },

  {

    right: 9098,

    left: 8918,

    bottom: 2006,

    top: 1856

  },

  {

    right: 9296,

    left: 9116,

    bottom: 2006,

    top: 1856

  },

  {

    right: 9494,

    left: 9314,

    bottom: 2006,

    top: 1856

  },

  {

    right: 9692,

    left: 9512,

    bottom: 2006,

    top: 1856

  },

  {

    right: 9890,

    left: 9710,

    bottom: 2006,

    top: 1856

  },

  {

    right: 188,

    left: 8,

    bottom: 2174,

    top: 2024

  },

  {

    right: 386,

    left: 206,

    bottom: 2174,

    top: 2024

  },

  {

    right: 584,

    left: 404,

    bottom: 2174,

    top: 2024

  },

  {

    right: 782,

    left: 602,

    bottom: 2174,

    top: 2024

  },

  {

    right: 980,

    left: 800,

    bottom: 2174,

    top: 2024

  },

  {

    right: 1178,

    left: 998,

    bottom: 2174,

    top: 2024

  },

  {

    right: 1376,

    left: 1196,

    bottom: 2174,

    top: 2024

  },

  {

    right: 1574,

    left: 1394,

    bottom: 2174,

    top: 2024

  },

  {

    right: 1772,

    left: 1592,

    bottom: 2174,

    top: 2024

  },

  {

    right: 1970,

    left: 1790,

    bottom: 2174,

    top: 2024

  },

  {

    right: 2168,

    left: 1988,

    bottom: 2174,

    top: 2024

  },

  {

    right: 2366,

    left: 2186,

    bottom: 2174,

    top: 2024

  },

  {

    right: 2564,

    left: 2384,

    bottom: 2174,

    top: 2024

  },

  {

    right: 2762,

    left: 2582,

    bottom: 2174,

    top: 2024

  },

  {

    right: 2960,

    left: 2780,

    bottom: 2174,

    top: 2024

  },

  {

    right: 3158,

    left: 2978,

    bottom: 2174,

    top: 2024

  },

  {

    right: 3356,

    left: 3176,

    bottom: 2174,

    top: 2024

  },

  {

    right: 3554,

    left: 3374,

    bottom: 2174,

    top: 2024

  },

  {

    right: 3752,

    left: 3572,

    bottom: 2174,

    top: 2024

  },

  {

    right: 3950,

    left: 3770,

    bottom: 2174,

    top: 2024

  },

  {

    right: 4148,

    left: 3968,

    bottom: 2174,

    top: 2024

  },

  {

    right: 4346,

    left: 4166,

    bottom: 2174,

    top: 2024

  },

  {

    right: 4544,

    left: 4364,

    bottom: 2174,

    top: 2024

  },

  {

    right: 4742,

    left: 4562,

    bottom: 2174,

    top: 2024

  },

  {

    right: 4940,

    left: 4760,

    bottom: 2174,

    top: 2024

  },

  {

    right: 5138,

    left: 4958,

    bottom: 2174,

    top: 2024

  },

  {

    right: 5336,

    left: 5156,

    bottom: 2174,

    top: 2024

  },

  {

    right: 5534,

    left: 5354,

    bottom: 2174,

    top: 2024

  },

  {

    right: 5732,

    left: 5552,

    bottom: 2174,

    top: 2024

  },

  {

    right: 5930,

    left: 5750,

    bottom: 2174,

    top: 2024

  },

  {

    right: 6128,

    left: 5948,

    bottom: 2174,

    top: 2024

  },

  {

    right: 6326,

    left: 6146,

    bottom: 2174,

    top: 2024

  },

  {

    right: 6524,

    left: 6344,

    bottom: 2174,

    top: 2024

  },

  {

    right: 6722,

    left: 6542,

    bottom: 2174,

    top: 2024

  },

  {

    right: 6920,

    left: 6740,

    bottom: 2174,

    top: 2024

  },

  {

    right: 7118,

    left: 6938,

    bottom: 2174,

    top: 2024

  },

  {

    right: 7316,

    left: 7136,

    bottom: 2174,

    top: 2024

  },

  {

    right: 7514,

    left: 7334,

    bottom: 2174,

    top: 2024

  },

  {

    right: 7712,

    left: 7532,

    bottom: 2174,

    top: 2024

  },

  {

    right: 7910,

    left: 7730,

    bottom: 2174,

    top: 2024

  },

  {

    right: 8108,

    left: 7928,

    bottom: 2174,

    top: 2024

  },

  {

    right: 8306,

    left: 8126,

    bottom: 2174,

    top: 2024

  },

  {

    right: 8504,

    left: 8324,

    bottom: 2174,

    top: 2024

  },

  {

    right: 8702,

    left: 8522,

    bottom: 2174,

    top: 2024

  },

  {

    right: 8900,

    left: 8720,

    bottom: 2174,

    top: 2024

  },

  {

    right: 9098,

    left: 8918,

    bottom: 2174,

    top: 2024

  },

  {

    right: 9296,

    left: 9116,

    bottom: 2174,

    top: 2024

  },

  {

    right: 9494,

    left: 9314,

    bottom: 2174,

    top: 2024

  },

  {

    right: 9692,

    left: 9512,

    bottom: 2174,

    top: 2024

  },

  {

    right: 9890,

    left: 9710,

    bottom: 2174,

    top: 2024

  },

  {

    right: 188,

    left: 8,

    bottom: 2342,

    top: 2192

  },

  {

    right: 386,

    left: 206,

    bottom: 2342,

    top: 2192

  },

  {

    right: 584,

    left: 404,

    bottom: 2342,

    top: 2192

  },

  {

    right: 782,

    left: 602,

    bottom: 2342,

    top: 2192

  },

  {

    right: 980,

    left: 800,

    bottom: 2342,

    top: 2192

  },

  {

    right: 1178,

    left: 998,

    bottom: 2342,

    top: 2192

  },

  {

    right: 1376,

    left: 1196,

    bottom: 2342,

    top: 2192

  },

  {

    right: 1574,

    left: 1394,

    bottom: 2342,

    top: 2192

  },

  {

    right: 1772,

    left: 1592,

    bottom: 2342,

    top: 2192

  },

  {

    right: 1970,

    left: 1790,

    bottom: 2342,

    top: 2192

  },

  {

    right: 2168,

    left: 1988,

    bottom: 2342,

    top: 2192

  },

  {

    right: 2366,

    left: 2186,

    bottom: 2342,

    top: 2192

  },

  {

    right: 2564,

    left: 2384,

    bottom: 2342,

    top: 2192

  },

  {

    right: 2762,

    left: 2582,

    bottom: 2342,

    top: 2192

  },

  {

    right: 2960,

    left: 2780,

    bottom: 2342,

    top: 2192

  },

  {

    right: 3158,

    left: 2978,

    bottom: 2342,

    top: 2192

  },

  {

    right: 3356,

    left: 3176,

    bottom: 2342,

    top: 2192

  },

  {

    right: 3554,

    left: 3374,

    bottom: 2342,

    top: 2192

  },

  {

    right: 3752,

    left: 3572,

    bottom: 2342,

    top: 2192

  },

  {

    right: 3950,

    left: 3770,

    bottom: 2342,

    top: 2192

  },

  {

    right: 4148,

    left: 3968,

    bottom: 2342,

    top: 2192

  },

  {

    right: 4346,

    left: 4166,

    bottom: 2342,

    top: 2192

  },

  {

    right: 4544,

    left: 4364,

    bottom: 2342,

    top: 2192

  },

  {

    right: 4742,

    left: 4562,

    bottom: 2342,

    top: 2192

  },

  {

    right: 4940,

    left: 4760,

    bottom: 2342,

    top: 2192

  },

  {

    right: 5138,

    left: 4958,

    bottom: 2342,

    top: 2192

  },

  {

    right: 5336,

    left: 5156,

    bottom: 2342,

    top: 2192

  },

  {

    right: 5534,

    left: 5354,

    bottom: 2342,

    top: 2192

  },

  {

    right: 5732,

    left: 5552,

    bottom: 2342,

    top: 2192

  },

  {

    right: 5930,

    left: 5750,

    bottom: 2342,

    top: 2192

  },

  {

    right: 6128,

    left: 5948,

    bottom: 2342,

    top: 2192

  },

  {

    right: 6326,

    left: 6146,

    bottom: 2342,

    top: 2192

  },

  {

    right: 6524,

    left: 6344,

    bottom: 2342,

    top: 2192

  },

  {

    right: 6722,

    left: 6542,

    bottom: 2342,

    top: 2192

  },

  {

    right: 6920,

    left: 6740,

    bottom: 2342,

    top: 2192

  },

  {

    right: 7118,

    left: 6938,

    bottom: 2342,

    top: 2192

  },

  {

    right: 7316,

    left: 7136,

    bottom: 2342,

    top: 2192

  },

  {

    right: 7514,

    left: 7334,

    bottom: 2342,

    top: 2192

  },

  {

    right: 7712,

    left: 7532,

    bottom: 2342,

    top: 2192

  },

  {

    right: 7910,

    left: 7730,

    bottom: 2342,

    top: 2192

  },

  {

    right: 8108,

    left: 7928,

    bottom: 2342,

    top: 2192

  },

  {

    right: 8306,

    left: 8126,

    bottom: 2342,

    top: 2192

  },

  {

    right: 8504,

    left: 8324,

    bottom: 2342,

    top: 2192

  },

  {

    right: 8702,

    left: 8522,

    bottom: 2342,

    top: 2192

  },

  {

    right: 8900,

    left: 8720,

    bottom: 2342,

    top: 2192

  },

  {

    right: 9098,

    left: 8918,

    bottom: 2342,

    top: 2192

  },

  {

    right: 9296,

    left: 9116,

    bottom: 2342,

    top: 2192

  },

  {

    right: 9494,

    left: 9314,

    bottom: 2342,

    top: 2192

  },

  {

    right: 9692,

    left: 9512,

    bottom: 2342,

    top: 2192

  },

  {

    right: 9890,

    left: 9710,

    bottom: 2342,

    top: 2192

  },

  {

    right: 188,

    left: 8,

    bottom: 2510,

    top: 2360

  },

  {

    right: 386,

    left: 206,

    bottom: 2510,

    top: 2360

  },

  {

    right: 584,

    left: 404,

    bottom: 2510,

    top: 2360

  },

  {

    right: 782,

    left: 602,

    bottom: 2510,

    top: 2360

  },

  {

    right: 980,

    left: 800,

    bottom: 2510,

    top: 2360

  },

  {

    right: 1178,

    left: 998,

    bottom: 2510,

    top: 2360

  },

  {

    right: 1376,

    left: 1196,

    bottom: 2510,

    top: 2360

  },

  {

    right: 1574,

    left: 1394,

    bottom: 2510,

    top: 2360

  },

  {

    right: 1772,

    left: 1592,

    bottom: 2510,

    top: 2360

  },

  {

    right: 1970,

    left: 1790,

    bottom: 2510,

    top: 2360

  },

  {

    right: 2168,

    left: 1988,

    bottom: 2510,

    top: 2360

  },

  {

    right: 2366,

    left: 2186,

    bottom: 2510,

    top: 2360

  },

  {

    right: 2564,

    left: 2384,

    bottom: 2510,

    top: 2360

  },

  {

    right: 2762,

    left: 2582,

    bottom: 2510,

    top: 2360

  },

  {

    right: 2960,

    left: 2780,

    bottom: 2510,

    top: 2360

  },

  {

    right: 3158,

    left: 2978,

    bottom: 2510,

    top: 2360

  },

  {

    right: 3356,

    left: 3176,

    bottom: 2510,

    top: 2360

  },

  {

    right: 3554,

    left: 3374,

    bottom: 2510,

    top: 2360

  },

  {

    right: 3752,

    left: 3572,

    bottom: 2510,

    top: 2360

  },

  {

    right: 3950,

    left: 3770,

    bottom: 2510,

    top: 2360

  },

  {

    right: 4148,

    left: 3968,

    bottom: 2510,

    top: 2360

  },

  {

    right: 4346,

    left: 4166,

    bottom: 2510,

    top: 2360

  },

  {

    right: 4544,

    left: 4364,

    bottom: 2510,

    top: 2360

  },

  {

    right: 4742,

    left: 4562,

    bottom: 2510,

    top: 2360

  },

  {

    right: 4940,

    left: 4760,

    bottom: 2510,

    top: 2360

  },

  {

    right: 5138,

    left: 4958,

    bottom: 2510,

    top: 2360

  },

  {

    right: 5336,

    left: 5156,

    bottom: 2510,

    top: 2360

  },

  {

    right: 5534,

    left: 5354,

    bottom: 2510,

    top: 2360

  },

  {

    right: 5732,

    left: 5552,

    bottom: 2510,

    top: 2360

  },

  {

    right: 5930,

    left: 5750,

    bottom: 2510,

    top: 2360

  },

  {

    right: 6128,

    left: 5948,

    bottom: 2510,

    top: 2360

  },

  {

    right: 6326,

    left: 6146,

    bottom: 2510,

    top: 2360

  },

  {

    right: 6524,

    left: 6344,

    bottom: 2510,

    top: 2360

  },

  {

    right: 6722,

    left: 6542,

    bottom: 2510,

    top: 2360

  },

  {

    right: 6920,

    left: 6740,

    bottom: 2510,

    top: 2360

  },

  {

    right: 7118,

    left: 6938,

    bottom: 2510,

    top: 2360

  },

  {

    right: 7316,

    left: 7136,

    bottom: 2510,

    top: 2360

  },

  {

    right: 7514,

    left: 7334,

    bottom: 2510,

    top: 2360

  },

  {

    right: 7712,

    left: 7532,

    bottom: 2510,

    top: 2360

  },

  {

    right: 7910,

    left: 7730,

    bottom: 2510,

    top: 2360

  },

  {

    right: 8108,

    left: 7928,

    bottom: 2510,

    top: 2360

  },

  {

    right: 8306,

    left: 8126,

    bottom: 2510,

    top: 2360

  },

  {

    right: 8504,

    left: 8324,

    bottom: 2510,

    top: 2360

  },

  {

    right: 8702,

    left: 8522,

    bottom: 2510,

    top: 2360

  },

  {

    right: 8900,

    left: 8720,

    bottom: 2510,

    top: 2360

  },

  {

    right: 9098,

    left: 8918,

    bottom: 2510,

    top: 2360

  },

  {

    right: 9296,

    left: 9116,

    bottom: 2510,

    top: 2360

  },

  {

    right: 9494,

    left: 9314,

    bottom: 2510,

    top: 2360

  },

  {

    right: 9692,

    left: 9512,

    bottom: 2510,

    top: 2360

  },

  {

    right: 9890,

    left: 9710,

    bottom: 2510,

    top: 2360

  },

  {

    right: 188,

    left: 8,

    bottom: 2678,

    top: 2528

  },

  {

    right: 386,

    left: 206,

    bottom: 2678,

    top: 2528

  },

  {

    right: 584,

    left: 404,

    bottom: 2678,

    top: 2528

  },

  {

    right: 782,

    left: 602,

    bottom: 2678,

    top: 2528

  },

  {

    right: 980,

    left: 800,

    bottom: 2678,

    top: 2528

  },

  {

    right: 1178,

    left: 998,

    bottom: 2678,

    top: 2528

  },

  {

    right: 1376,

    left: 1196,

    bottom: 2678,

    top: 2528

  },

  {

    right: 1574,

    left: 1394,

    bottom: 2678,

    top: 2528

  },

  {

    right: 1772,

    left: 1592,

    bottom: 2678,

    top: 2528

  },

  {

    right: 1970,

    left: 1790,

    bottom: 2678,

    top: 2528

  },

  {

    right: 2168,

    left: 1988,

    bottom: 2678,

    top: 2528

  },

  {

    right: 2366,

    left: 2186,

    bottom: 2678,

    top: 2528

  },

  {

    right: 2564,

    left: 2384,

    bottom: 2678,

    top: 2528

  },

  {

    right: 2762,

    left: 2582,

    bottom: 2678,

    top: 2528

  },

  {

    right: 2960,

    left: 2780,

    bottom: 2678,

    top: 2528

  },

  {

    right: 3158,

    left: 2978,

    bottom: 2678,

    top: 2528

  },

  {

    right: 3356,

    left: 3176,

    bottom: 2678,

    top: 2528

  },

  {

    right: 3554,

    left: 3374,

    bottom: 2678,

    top: 2528

  },

  {

    right: 3752,

    left: 3572,

    bottom: 2678,

    top: 2528

  },

  {

    right: 3950,

    left: 3770,

    bottom: 2678,

    top: 2528

  },

  {

    right: 4148,

    left: 3968,

    bottom: 2678,

    top: 2528

  },

  {

    right: 4346,

    left: 4166,

    bottom: 2678,

    top: 2528

  },

  {

    right: 4544,

    left: 4364,

    bottom: 2678,

    top: 2528

  },

  {

    right: 4742,

    left: 4562,

    bottom: 2678,

    top: 2528

  },

  {

    right: 4940,

    left: 4760,

    bottom: 2678,

    top: 2528

  },

  {

    right: 5138,

    left: 4958,

    bottom: 2678,

    top: 2528

  },

  {

    right: 5336,

    left: 5156,

    bottom: 2678,

    top: 2528

  },

  {

    right: 5534,

    left: 5354,

    bottom: 2678,

    top: 2528

  },

  {

    right: 5732,

    left: 5552,

    bottom: 2678,

    top: 2528

  },

  {

    right: 5930,

    left: 5750,

    bottom: 2678,

    top: 2528

  },

  {

    right: 6128,

    left: 5948,

    bottom: 2678,

    top: 2528

  },

  {

    right: 6326,

    left: 6146,

    bottom: 2678,

    top: 2528

  },

  {

    right: 6524,

    left: 6344,

    bottom: 2678,

    top: 2528

  },

  {

    right: 6722,

    left: 6542,

    bottom: 2678,

    top: 2528

  },

  {

    right: 6920,

    left: 6740,

    bottom: 2678,

    top: 2528

  },

  {

    right: 7118,

    left: 6938,

    bottom: 2678,

    top: 2528

  },

  {

    right: 7316,

    left: 7136,

    bottom: 2678,

    top: 2528

  },

  {

    right: 7514,

    left: 7334,

    bottom: 2678,

    top: 2528

  },

  {

    right: 7712,

    left: 7532,

    bottom: 2678,

    top: 2528

  },

  {

    right: 7910,

    left: 7730,

    bottom: 2678,

    top: 2528

  },

  {

    right: 8108,

    left: 7928,

    bottom: 2678,

    top: 2528

  },

  {

    right: 8306,

    left: 8126,

    bottom: 2678,

    top: 2528

  },

  {

    right: 8504,

    left: 8324,

    bottom: 2678,

    top: 2528

  },

  {

    right: 8702,

    left: 8522,

    bottom: 2678,

    top: 2528

  },

  {

    right: 8900,

    left: 8720,

    bottom: 2678,

    top: 2528

  },

  {

    right: 9098,

    left: 8918,

    bottom: 2678,

    top: 2528

  },

  {

    right: 9296,

    left: 9116,

    bottom: 2678,

    top: 2528

  },

  {

    right: 9494,

    left: 9314,

    bottom: 2678,

    top: 2528

  },

  {

    right: 9692,

    left: 9512,

    bottom: 2678,

    top: 2528

  },

  {

    right: 9890,

    left: 9710,

    bottom: 2678,

    top: 2528

  },

  {

    right: 188,

    left: 8,

    bottom: 2846,

    top: 2696

  },

  {

    right: 386,

    left: 206,

    bottom: 2846,

    top: 2696

  },

  {

    right: 584,

    left: 404,

    bottom: 2846,

    top: 2696

  },

  {

    right: 782,

    left: 602,

    bottom: 2846,

    top: 2696

  },

  {

    right: 980,

    left: 800,

    bottom: 2846,

    top: 2696

  },

  {

    right: 1178,

    left: 998,

    bottom: 2846,

    top: 2696

  },

  {

    right: 1376,

    left: 1196,

    bottom: 2846,

    top: 2696

  },

  {

    right: 1574,

    left: 1394,

    bottom: 2846,

    top: 2696

  },

  {

    right: 1772,

    left: 1592,

    bottom: 2846,

    top: 2696

  },

  {

    right: 1970,

    left: 1790,

    bottom: 2846,

    top: 2696

  },

  {

    right: 2168,

    left: 1988,

    bottom: 2846,

    top: 2696

  },

  {

    right: 2366,

    left: 2186,

    bottom: 2846,

    top: 2696

  },

  {

    right: 2564,

    left: 2384,

    bottom: 2846,

    top: 2696

  },

  {

    right: 2762,

    left: 2582,

    bottom: 2846,

    top: 2696

  },

  {

    right: 2960,

    left: 2780,

    bottom: 2846,

    top: 2696

  },

  {

    right: 3158,

    left: 2978,

    bottom: 2846,

    top: 2696

  },

  {

    right: 3356,

    left: 3176,

    bottom: 2846,

    top: 2696

  },

  {

    right: 3554,

    left: 3374,

    bottom: 2846,

    top: 2696

  },

  {

    right: 3752,

    left: 3572,

    bottom: 2846,

    top: 2696

  },

  {

    right: 3950,

    left: 3770,

    bottom: 2846,

    top: 2696

  },

  {

    right: 4148,

    left: 3968,

    bottom: 2846,

    top: 2696

  },

  {

    right: 4346,

    left: 4166,

    bottom: 2846,

    top: 2696

  },

  {

    right: 4544,

    left: 4364,

    bottom: 2846,

    top: 2696

  },

  {

    right: 4742,

    left: 4562,

    bottom: 2846,

    top: 2696

  },

  {

    right: 4940,

    left: 4760,

    bottom: 2846,

    top: 2696

  },

  {

    right: 5138,

    left: 4958,

    bottom: 2846,

    top: 2696

  },

  {

    right: 5336,

    left: 5156,

    bottom: 2846,

    top: 2696

  },

  {

    right: 5534,

    left: 5354,

    bottom: 2846,

    top: 2696

  },

  {

    right: 5732,

    left: 5552,

    bottom: 2846,

    top: 2696

  },

  {

    right: 5930,

    left: 5750,

    bottom: 2846,

    top: 2696

  },

  {

    right: 6128,

    left: 5948,

    bottom: 2846,

    top: 2696

  },

  {

    right: 6326,

    left: 6146,

    bottom: 2846,

    top: 2696

  },

  {

    right: 6524,

    left: 6344,

    bottom: 2846,

    top: 2696

  },

  {

    right: 6722,

    left: 6542,

    bottom: 2846,

    top: 2696

  },

  {

    right: 6920,

    left: 6740,

    bottom: 2846,

    top: 2696

  },

  {

    right: 7118,

    left: 6938,

    bottom: 2846,

    top: 2696

  },

  {

    right: 7316,

    left: 7136,

    bottom: 2846,

    top: 2696

  },

  {

    right: 7514,

    left: 7334,

    bottom: 2846,

    top: 2696

  },

  {

    right: 7712,

    left: 7532,

    bottom: 2846,

    top: 2696

  },

  {

    right: 7910,

    left: 7730,

    bottom: 2846,

    top: 2696

  },

  {

    right: 8108,

    left: 7928,

    bottom: 2846,

    top: 2696

  },

  {

    right: 8306,

    left: 8126,

    bottom: 2846,

    top: 2696

  },

  {

    right: 8504,

    left: 8324,

    bottom: 2846,

    top: 2696

  },

  {

    right: 8702,

    left: 8522,

    bottom: 2846,

    top: 2696

  },

  {

    right: 8900,

    left: 8720,

    bottom: 2846,

    top: 2696

  },

  {

    right: 9098,

    left: 8918,

    bottom: 2846,

    top: 2696

  },

  {

    right: 9296,

    left: 9116,

    bottom: 2846,

    top: 2696

  },

  {

    right: 9494,

    left: 9314,

    bottom: 2846,

    top: 2696

  },

  {

    right: 9692,

    left: 9512,

    bottom: 2846,

    top: 2696

  },

  {

    right: 9890,

    left: 9710,

    bottom: 2846,

    top: 2696

  },

  {

    right: 188,

    left: 8,

    bottom: 3014,

    top: 2864

  },

  {

    right: 386,

    left: 206,

    bottom: 3014,

    top: 2864

  },

  {

    right: 584,

    left: 404,

    bottom: 3014,

    top: 2864

  },

  {

    right: 782,

    left: 602,

    bottom: 3014,

    top: 2864

  },

  {

    right: 980,

    left: 800,

    bottom: 3014,

    top: 2864

  },

  {

    right: 1178,

    left: 998,

    bottom: 3014,

    top: 2864

  },

  {

    right: 1376,

    left: 1196,

    bottom: 3014,

    top: 2864

  },

  {

    right: 1574,

    left: 1394,

    bottom: 3014,

    top: 2864

  },

  {

    right: 1772,

    left: 1592,

    bottom: 3014,

    top: 2864

  },

  {

    right: 1970,

    left: 1790,

    bottom: 3014,

    top: 2864

  },

  {

    right: 2168,

    left: 1988,

    bottom: 3014,

    top: 2864

  },

  {

    right: 2366,

    left: 2186,

    bottom: 3014,

    top: 2864

  },

  {

    right: 2564,

    left: 2384,

    bottom: 3014,

    top: 2864

  },

  {

    right: 2762,

    left: 2582,

    bottom: 3014,

    top: 2864

  },

  {

    right: 2960,

    left: 2780,

    bottom: 3014,

    top: 2864

  },

  {

    right: 3158,

    left: 2978,

    bottom: 3014,

    top: 2864

  },

  {

    right: 3356,

    left: 3176,

    bottom: 3014,

    top: 2864

  },

  {

    right: 3554,

    left: 3374,

    bottom: 3014,

    top: 2864

  },

  {

    right: 3752,

    left: 3572,

    bottom: 3014,

    top: 2864

  },

  {

    right: 3950,

    left: 3770,

    bottom: 3014,

    top: 2864

  },

  {

    right: 4148,

    left: 3968,

    bottom: 3014,

    top: 2864

  },

  {

    right: 4346,

    left: 4166,

    bottom: 3014,

    top: 2864

  },

  {

    right: 4544,

    left: 4364,

    bottom: 3014,

    top: 2864

  },

  {

    right: 4742,

    left: 4562,

    bottom: 3014,

    top: 2864

  },

  {

    right: 4940,

    left: 4760,

    bottom: 3014,

    top: 2864

  },

  {

    right: 5138,

    left: 4958,

    bottom: 3014,

    top: 2864

  },

  {

    right: 5336,

    left: 5156,

    bottom: 3014,

    top: 2864

  },

  {

    right: 5534,

    left: 5354,

    bottom: 3014,

    top: 2864

  },

  {

    right: 5732,

    left: 5552,

    bottom: 3014,

    top: 2864

  },

  {

    right: 5930,

    left: 5750,

    bottom: 3014,

    top: 2864

  },

  {

    right: 6128,

    left: 5948,

    bottom: 3014,

    top: 2864

  },

  {

    right: 6326,

    left: 6146,

    bottom: 3014,

    top: 2864

  },

  {

    right: 6524,

    left: 6344,

    bottom: 3014,

    top: 2864

  },

  {

    right: 6722,

    left: 6542,

    bottom: 3014,

    top: 2864

  },

  {

    right: 6920,

    left: 6740,

    bottom: 3014,

    top: 2864

  },

  {

    right: 7118,

    left: 6938,

    bottom: 3014,

    top: 2864

  },

  {

    right: 7316,

    left: 7136,

    bottom: 3014,

    top: 2864

  },

  {

    right: 7514,

    left: 7334,

    bottom: 3014,

    top: 2864

  },

  {

    right: 7712,

    left: 7532,

    bottom: 3014,

    top: 2864

  },

  {

    right: 7910,

    left: 7730,

    bottom: 3014,

    top: 2864

  },

  {

    right: 8108,

    left: 7928,

    bottom: 3014,

    top: 2864

  },

  {

    right: 8306,

    left: 8126,

    bottom: 3014,

    top: 2864

  },

  {

    right: 8504,

    left: 8324,

    bottom: 3014,

    top: 2864

  },

  {

    right: 8702,

    left: 8522,

    bottom: 3014,

    top: 2864

  },

  {

    right: 8900,

    left: 8720,

    bottom: 3014,

    top: 2864

  },

  {

    right: 9098,

    left: 8918,

    bottom: 3014,

    top: 2864

  },

  {

    right: 9296,

    left: 9116,

    bottom: 3014,

    top: 2864

  },

  {

    right: 9494,

    left: 9314,

    bottom: 3014,

    top: 2864

  },

  {

    right: 9692,

    left: 9512,

    bottom: 3014,

    top: 2864

  },

  {

    right: 9890,

    left: 9710,

    bottom: 3014,

    top: 2864

  },

  {

    right: 188,

    left: 8,

    bottom: 3182,

    top: 3032

  },

  {

    right: 386,

    left: 206,

    bottom: 3182,

    top: 3032

  },

  {

    right: 584,

    left: 404,

    bottom: 3182,

    top: 3032

  },

  {

    right: 782,

    left: 602,

    bottom: 3182,

    top: 3032

  },

  {

    right: 980,

    left: 800,

    bottom: 3182,

    top: 3032

  },

  {

    right: 1178,

    left: 998,

    bottom: 3182,

    top: 3032

  },

  {

    right: 1376,

    left: 1196,

    bottom: 3182,

    top: 3032

  },

  {

    right: 1574,

    left: 1394,

    bottom: 3182,

    top: 3032

  },

  {

    right: 1772,

    left: 1592,

    bottom: 3182,

    top: 3032

  },

  {

    right: 1970,

    left: 1790,

    bottom: 3182,

    top: 3032

  },

  {

    right: 2168,

    left: 1988,

    bottom: 3182,

    top: 3032

  },

  {

    right: 2366,

    left: 2186,

    bottom: 3182,

    top: 3032

  },

  {

    right: 2564,

    left: 2384,

    bottom: 3182,

    top: 3032

  },

  {

    right: 2762,

    left: 2582,

    bottom: 3182,

    top: 3032

  },

  {

    right: 2960,

    left: 2780,

    bottom: 3182,

    top: 3032

  },

  {

    right: 3158,

    left: 2978,

    bottom: 3182,

    top: 3032

  },

  {

    right: 3356,

    left: 3176,

    bottom: 3182,

    top: 3032

  },

  {

    right: 3554,

    left: 3374,

    bottom: 3182,

    top: 3032

  },

  {

    right: 3752,

    left: 3572,

    bottom: 3182,

    top: 3032

  },

  {

    right: 3950,

    left: 3770,

    bottom: 3182,

    top: 3032

  },

  {

    right: 4148,

    left: 3968,

    bottom: 3182,

    top: 3032

  },

  {

    right: 4346,

    left: 4166,

    bottom: 3182,

    top: 3032

  },

  {

    right: 4544,

    left: 4364,

    bottom: 3182,

    top: 3032

  },

  {

    right: 4742,

    left: 4562,

    bottom: 3182,

    top: 3032

  },

  {

    right: 4940,

    left: 4760,

    bottom: 3182,

    top: 3032

  },

  {

    right: 5138,

    left: 4958,

    bottom: 3182,

    top: 3032

  },

  {

    right: 5336,

    left: 5156,

    bottom: 3182,

    top: 3032

  },

  {

    right: 5534,

    left: 5354,

    bottom: 3182,

    top: 3032

  },

  {

    right: 5732,

    left: 5552,

    bottom: 3182,

    top: 3032

  },

  {

    right: 5930,

    left: 5750,

    bottom: 3182,

    top: 3032

  },

  {

    right: 6128,

    left: 5948,

    bottom: 3182,

    top: 3032

  },

  {

    right: 6326,

    left: 6146,

    bottom: 3182,

    top: 3032

  },

  {

    right: 6524,

    left: 6344,

    bottom: 3182,

    top: 3032

  },

  {

    right: 6722,

    left: 6542,

    bottom: 3182,

    top: 3032

  },

  {

    right: 6920,

    left: 6740,

    bottom: 3182,

    top: 3032

  },

  {

    right: 7118,

    left: 6938,

    bottom: 3182,

    top: 3032

  },

  {

    right: 7316,

    left: 7136,

    bottom: 3182,

    top: 3032

  },

  {

    right: 7514,

    left: 7334,

    bottom: 3182,

    top: 3032

  },

  {

    right: 7712,

    left: 7532,

    bottom: 3182,

    top: 3032

  },

  {

    right: 7910,

    left: 7730,

    bottom: 3182,

    top: 3032

  },

  {

    right: 8108,

    left: 7928,

    bottom: 3182,

    top: 3032

  },

  {

    right: 8306,

    left: 8126,

    bottom: 3182,

    top: 3032

  },

  {

    right: 8504,

    left: 8324,

    bottom: 3182,

    top: 3032

  },

  {

    right: 8702,

    left: 8522,

    bottom: 3182,

    top: 3032

  },

  {

    right: 8900,

    left: 8720,

    bottom: 3182,

    top: 3032

  },

  {

    right: 9098,

    left: 8918,

    bottom: 3182,

    top: 3032

  },

  {

    right: 9296,

    left: 9116,

    bottom: 3182,

    top: 3032

  },

  {

    right: 9494,

    left: 9314,

    bottom: 3182,

    top: 3032

  },

  {

    right: 9692,

    left: 9512,

    bottom: 3182,

    top: 3032

  },

  {

    right: 9890,

    left: 9710,

    bottom: 3182,

    top: 3032

  },

  {

    right: 188,

    left: 8,

    bottom: 3350,

    top: 3200

  },

  {

    right: 386,

    left: 206,

    bottom: 3350,

    top: 3200

  },

  {

    right: 584,

    left: 404,

    bottom: 3350,

    top: 3200

  },

  {

    right: 782,

    left: 602,

    bottom: 3350,

    top: 3200

  },

  {

    right: 980,

    left: 800,

    bottom: 3350,

    top: 3200

  },

  {

    right: 1178,

    left: 998,

    bottom: 3350,

    top: 3200

  },

  {

    right: 1376,

    left: 1196,

    bottom: 3350,

    top: 3200

  },

  {

    right: 1574,

    left: 1394,

    bottom: 3350,

    top: 3200

  },

  {

    right: 1772,

    left: 1592,

    bottom: 3350,

    top: 3200

  },

  {

    right: 1970,

    left: 1790,

    bottom: 3350,

    top: 3200

  },

  {

    right: 2168,

    left: 1988,

    bottom: 3350,

    top: 3200

  },

  {

    right: 2366,

    left: 2186,

    bottom: 3350,

    top: 3200

  },

  {

    right: 2564,

    left: 2384,

    bottom: 3350,

    top: 3200

  },

  {

    right: 2762,

    left: 2582,

    bottom: 3350,

    top: 3200

  },

  {

    right: 2960,

    left: 2780,

    bottom: 3350,

    top: 3200

  },

  {

    right: 3158,

    left: 2978,

    bottom: 3350,

    top: 3200

  },

  {

    right: 3356,

    left: 3176,

    bottom: 3350,

    top: 3200

  },

  {

    right: 3554,

    left: 3374,

    bottom: 3350,

    top: 3200

  },

  {

    right: 3752,

    left: 3572,

    bottom: 3350,

    top: 3200

  },

  {

    right: 3950,

    left: 3770,

    bottom: 3350,

    top: 3200

  },

  {

    right: 4148,

    left: 3968,

    bottom: 3350,

    top: 3200

  },

  {

    right: 4346,

    left: 4166,

    bottom: 3350,

    top: 3200

  },

  {

    right: 4544,

    left: 4364,

    bottom: 3350,

    top: 3200

  },

  {

    right: 4742,

    left: 4562,

    bottom: 3350,

    top: 3200

  },

  {

    right: 4940,

    left: 4760,

    bottom: 3350,

    top: 3200

  },

  {

    right: 5138,

    left: 4958,

    bottom: 3350,

    top: 3200

  },

  {

    right: 5336,

    left: 5156,

    bottom: 3350,

    top: 3200

  },

  {

    right: 5534,

    left: 5354,

    bottom: 3350,

    top: 3200

  },

  {

    right: 5732,

    left: 5552,

    bottom: 3350,

    top: 3200

  },

  {

    right: 5930,

    left: 5750,

    bottom: 3350,

    top: 3200

  },

  {

    right: 6128,

    left: 5948,

    bottom: 3350,

    top: 3200

  },

  {

    right: 6326,

    left: 6146,

    bottom: 3350,

    top: 3200

  },

  {

    right: 6524,

    left: 6344,

    bottom: 3350,

    top: 3200

  },

  {

    right: 6722,

    left: 6542,

    bottom: 3350,

    top: 3200

  },

  {

    right: 6920,

    left: 6740,

    bottom: 3350,

    top: 3200

  },

  {

    right: 7118,

    left: 6938,

    bottom: 3350,

    top: 3200

  },

  {

    right: 7316,

    left: 7136,

    bottom: 3350,

    top: 3200

  },

  {

    right: 7514,

    left: 7334,

    bottom: 3350,

    top: 3200

  },

  {

    right: 7712,

    left: 7532,

    bottom: 3350,

    top: 3200

  },

  {

    right: 7910,

    left: 7730,

    bottom: 3350,

    top: 3200

  },

  {

    right: 8108,

    left: 7928,

    bottom: 3350,

    top: 3200

  },

  {

    right: 8306,

    left: 8126,

    bottom: 3350,

    top: 3200

  },

  {

    right: 8504,

    left: 8324,

    bottom: 3350,

    top: 3200

  },

  {

    right: 8702,

    left: 8522,

    bottom: 3350,

    top: 3200

  },

  {

    right: 8900,

    left: 8720,

    bottom: 3350,

    top: 3200

  },

  {

    right: 9098,

    left: 8918,

    bottom: 3350,

    top: 3200

  },

  {

    right: 9296,

    left: 9116,

    bottom: 3350,

    top: 3200

  },

  {

    right: 9494,

    left: 9314,

    bottom: 3350,

    top: 3200

  },

  {

    right: 9692,

    left: 9512,

    bottom: 3350,

    top: 3200

  },

  {

    right: 9890,

    left: 9710,

    bottom: 3350,

    top: 3200

  },

  {

    right: 188,

    left: 8,

    bottom: 3518,

    top: 3368

  },

  {

    right: 386,

    left: 206,

    bottom: 3518,

    top: 3368

  },

  {

    right: 584,

    left: 404,

    bottom: 3518,

    top: 3368

  },

  {

    right: 782,

    left: 602,

    bottom: 3518,

    top: 3368

  },

  {

    right: 980,

    left: 800,

    bottom: 3518,

    top: 3368

  },

  {

    right: 1178,

    left: 998,

    bottom: 3518,

    top: 3368

  },

  {

    right: 1376,

    left: 1196,

    bottom: 3518,

    top: 3368

  },

  {

    right: 1574,

    left: 1394,

    bottom: 3518,

    top: 3368

  },

  {

    right: 1772,

    left: 1592,

    bottom: 3518,

    top: 3368

  },

  {

    right: 1970,

    left: 1790,

    bottom: 3518,

    top: 3368

  },

  {

    right: 2168,

    left: 1988,

    bottom: 3518,

    top: 3368

  },

  {

    right: 2366,

    left: 2186,

    bottom: 3518,

    top: 3368

  },

  {

    right: 2564,

    left: 2384,

    bottom: 3518,

    top: 3368

  },

  {

    right: 2762,

    left: 2582,

    bottom: 3518,

    top: 3368

  },

  {

    right: 2960,

    left: 2780,

    bottom: 3518,

    top: 3368

  },

  {

    right: 3158,

    left: 2978,

    bottom: 3518,

    top: 3368

  },

  {

    right: 3356,

    left: 3176,

    bottom: 3518,

    top: 3368

  },

  {

    right: 3554,

    left: 3374,

    bottom: 3518,

    top: 3368

  },

  {

    right: 3752,

    left: 3572,

    bottom: 3518,

    top: 3368

  },

  {

    right: 3950,

    left: 3770,

    bottom: 3518,

    top: 3368

  },

  {

    right: 4148,

    left: 3968,

    bottom: 3518,

    top: 3368

  },

  {

    right: 4346,

    left: 4166,

    bottom: 3518,

    top: 3368

  },

  {

    right: 4544,

    left: 4364,

    bottom: 3518,

    top: 3368

  },

  {

    right: 4742,

    left: 4562,

    bottom: 3518,

    top: 3368

  },

  {

    right: 4940,

    left: 4760,

    bottom: 3518,

    top: 3368

  },

  {

    right: 5138,

    left: 4958,

    bottom: 3518,

    top: 3368

  },

  {

    right: 5336,

    left: 5156,

    bottom: 3518,

    top: 3368

  },

  {

    right: 5534,

    left: 5354,

    bottom: 3518,

    top: 3368

  },

  {

    right: 5732,

    left: 5552,

    bottom: 3518,

    top: 3368

  },

  {

    right: 5930,

    left: 5750,

    bottom: 3518,

    top: 3368

  },

  {

    right: 6128,

    left: 5948,

    bottom: 3518,

    top: 3368

  },

  {

    right: 6326,

    left: 6146,

    bottom: 3518,

    top: 3368

  },

  {

    right: 6524,

    left: 6344,

    bottom: 3518,

    top: 3368

  },

  {

    right: 6722,

    left: 6542,

    bottom: 3518,

    top: 3368

  },

  {

    right: 6920,

    left: 6740,

    bottom: 3518,

    top: 3368

  },

  {

    right: 7118,

    left: 6938,

    bottom: 3518,

    top: 3368

  },

  {

    right: 7316,

    left: 7136,

    bottom: 3518,

    top: 3368

  },

  {

    right: 7514,

    left: 7334,

    bottom: 3518,

    top: 3368

  },

  {

    right: 7712,

    left: 7532,

    bottom: 3518,

    top: 3368

  },

  {

    right: 7910,

    left: 7730,

    bottom: 3518,

    top: 3368

  },

  {

    right: 8108,

    left: 7928,

    bottom: 3518,

    top: 3368

  },

  {

    right: 8306,

    left: 8126,

    bottom: 3518,

    top: 3368

  },

  {

    right: 8504,

    left: 8324,

    bottom: 3518,

    top: 3368

  },

  {

    right: 8702,

    left: 8522,

    bottom: 3518,

    top: 3368

  },

  {

    right: 8900,

    left: 8720,

    bottom: 3518,

    top: 3368

  },

  {

    right: 9098,

    left: 8918,

    bottom: 3518,

    top: 3368

  },

  {

    right: 9296,

    left: 9116,

    bottom: 3518,

    top: 3368

  },

  {

    right: 9494,

    left: 9314,

    bottom: 3518,

    top: 3368

  },

  {

    right: 9692,

    left: 9512,

    bottom: 3518,

    top: 3368

  },

  {

    right: 9890,

    left: 9710,

    bottom: 3518,

    top: 3368

  },

  {

    right: 188,

    left: 8,

    bottom: 3686,

    top: 3536

  },

  {

    right: 386,

    left: 206,

    bottom: 3686,

    top: 3536

  },

  {

    right: 584,

    left: 404,

    bottom: 3686,

    top: 3536

  },

  {

    right: 782,

    left: 602,

    bottom: 3686,

    top: 3536

  },

  {

    right: 980,

    left: 800,

    bottom: 3686,

    top: 3536

  },

  {

    right: 1178,

    left: 998,

    bottom: 3686,

    top: 3536

  },

  {

    right: 1376,

    left: 1196,

    bottom: 3686,

    top: 3536

  },

  {

    right: 1574,

    left: 1394,

    bottom: 3686,

    top: 3536

  },

  {

    right: 1772,

    left: 1592,

    bottom: 3686,

    top: 3536

  },

  {

    right: 1970,

    left: 1790,

    bottom: 3686,

    top: 3536

  },

  {

    right: 2168,

    left: 1988,

    bottom: 3686,

    top: 3536

  },

  {

    right: 2366,

    left: 2186,

    bottom: 3686,

    top: 3536

  },

  {

    right: 2564,

    left: 2384,

    bottom: 3686,

    top: 3536

  },

  {

    right: 2762,

    left: 2582,

    bottom: 3686,

    top: 3536

  },

  {

    right: 2960,

    left: 2780,

    bottom: 3686,

    top: 3536

  },

  {

    right: 3158,

    left: 2978,

    bottom: 3686,

    top: 3536

  },

  {

    right: 3356,

    left: 3176,

    bottom: 3686,

    top: 3536

  },

  {

    right: 3554,

    left: 3374,

    bottom: 3686,

    top: 3536

  },

  {

    right: 3752,

    left: 3572,

    bottom: 3686,

    top: 3536

  },

  {

    right: 3950,

    left: 3770,

    bottom: 3686,

    top: 3536

  },

  {

    right: 4148,

    left: 3968,

    bottom: 3686,

    top: 3536

  },

  {

    right: 4346,

    left: 4166,

    bottom: 3686,

    top: 3536

  },

  {

    right: 4544,

    left: 4364,

    bottom: 3686,

    top: 3536

  },

  {

    right: 4742,

    left: 4562,

    bottom: 3686,

    top: 3536

  },

  {

    right: 4940,

    left: 4760,

    bottom: 3686,

    top: 3536

  },

  {

    right: 5138,

    left: 4958,

    bottom: 3686,

    top: 3536

  },

  {

    right: 5336,

    left: 5156,

    bottom: 3686,

    top: 3536

  },

  {

    right: 5534,

    left: 5354,

    bottom: 3686,

    top: 3536

  },

  {

    right: 5732,

    left: 5552,

    bottom: 3686,

    top: 3536

  },

  {

    right: 5930,

    left: 5750,

    bottom: 3686,

    top: 3536

  },

  {

    right: 6128,

    left: 5948,

    bottom: 3686,

    top: 3536

  },

  {

    right: 6326,

    left: 6146,

    bottom: 3686,

    top: 3536

  },

  {

    right: 6524,

    left: 6344,

    bottom: 3686,

    top: 3536

  },

  {

    right: 6722,

    left: 6542,

    bottom: 3686,

    top: 3536

  },

  {

    right: 6920,

    left: 6740,

    bottom: 3686,

    top: 3536

  },

  {

    right: 7118,

    left: 6938,

    bottom: 3686,

    top: 3536

  },

  {

    right: 7316,

    left: 7136,

    bottom: 3686,

    top: 3536

  },

  {

    right: 7514,

    left: 7334,

    bottom: 3686,

    top: 3536

  },

  {

    right: 7712,

    left: 7532,

    bottom: 3686,

    top: 3536

  },

  {

    right: 7910,

    left: 7730,

    bottom: 3686,

    top: 3536

  },

  {

    right: 8108,

    left: 7928,

    bottom: 3686,

    top: 3536

  },

  {

    right: 8306,

    left: 8126,

    bottom: 3686,

    top: 3536

  },

  {

    right: 8504,

    left: 8324,

    bottom: 3686,

    top: 3536

  },

  {

    right: 8702,

    left: 8522,

    bottom: 3686,

    top: 3536

  },

  {

    right: 8900,

    left: 8720,

    bottom: 3686,

    top: 3536

  },

  {

    right: 9098,

    left: 8918,

    bottom: 3686,

    top: 3536

  },

  {

    right: 9296,

    left: 9116,

    bottom: 3686,

    top: 3536

  },

  {

    right: 9494,

    left: 9314,

    bottom: 3686,

    top: 3536

  },

  {

    right: 9692,

    left: 9512,

    bottom: 3686,

    top: 3536

  },

  {

    right: 9890,

    left: 9710,

    bottom: 3686,

    top: 3536

  },

  {

    right: 188,

    left: 8,

    bottom: 3854,

    top: 3704

  },

  {

    right: 386,

    left: 206,

    bottom: 3854,

    top: 3704

  },

  {

    right: 584,

    left: 404,

    bottom: 3854,

    top: 3704

  },

  {

    right: 782,

    left: 602,

    bottom: 3854,

    top: 3704

  },

  {

    right: 980,

    left: 800,

    bottom: 3854,

    top: 3704

  },

  {

    right: 1178,

    left: 998,

    bottom: 3854,

    top: 3704

  },

  {

    right: 1376,

    left: 1196,

    bottom: 3854,

    top: 3704

  },

  {

    right: 1574,

    left: 1394,

    bottom: 3854,

    top: 3704

  },

  {

    right: 1772,

    left: 1592,

    bottom: 3854,

    top: 3704

  },

  {

    right: 1970,

    left: 1790,

    bottom: 3854,

    top: 3704

  },

  {

    right: 2168,

    left: 1988,

    bottom: 3854,

    top: 3704

  },

  {

    right: 2366,

    left: 2186,

    bottom: 3854,

    top: 3704

  },

  {

    right: 2564,

    left: 2384,

    bottom: 3854,

    top: 3704

  },

  {

    right: 2762,

    left: 2582,

    bottom: 3854,

    top: 3704

  },

  {

    right: 2960,

    left: 2780,

    bottom: 3854,

    top: 3704

  },

  {

    right: 3158,

    left: 2978,

    bottom: 3854,

    top: 3704

  },

  {

    right: 3356,

    left: 3176,

    bottom: 3854,

    top: 3704

  },

  {

    right: 3554,

    left: 3374,

    bottom: 3854,

    top: 3704

  },

  {

    right: 3752,

    left: 3572,

    bottom: 3854,

    top: 3704

  },

  {

    right: 3950,

    left: 3770,

    bottom: 3854,

    top: 3704

  },

  {

    right: 4148,

    left: 3968,

    bottom: 3854,

    top: 3704

  },

  {

    right: 4346,

    left: 4166,

    bottom: 3854,

    top: 3704

  },

  {

    right: 4544,

    left: 4364,

    bottom: 3854,

    top: 3704

  },

  {

    right: 4742,

    left: 4562,

    bottom: 3854,

    top: 3704

  },

  {

    right: 4940,

    left: 4760,

    bottom: 3854,

    top: 3704

  },

  {

    right: 5138,

    left: 4958,

    bottom: 3854,

    top: 3704

  },

  {

    right: 5336,

    left: 5156,

    bottom: 3854,

    top: 3704

  },

  {

    right: 5534,

    left: 5354,

    bottom: 3854,

    top: 3704

  },

  {

    right: 5732,

    left: 5552,

    bottom: 3854,

    top: 3704

  },

  {

    right: 5930,

    left: 5750,

    bottom: 3854,

    top: 3704

  },

  {

    right: 6128,

    left: 5948,

    bottom: 3854,

    top: 3704

  },

  {

    right: 6326,

    left: 6146,

    bottom: 3854,

    top: 3704

  },

  {

    right: 6524,

    left: 6344,

    bottom: 3854,

    top: 3704

  },

  {

    right: 6722,

    left: 6542,

    bottom: 3854,

    top: 3704

  },

  {

    right: 6920,

    left: 6740,

    bottom: 3854,

    top: 3704

  },

  {

    right: 7118,

    left: 6938,

    bottom: 3854,

    top: 3704

  },

  {

    right: 7316,

    left: 7136,

    bottom: 3854,

    top: 3704

  },

  {

    right: 7514,

    left: 7334,

    bottom: 3854,

    top: 3704

  },

  {

    right: 7712,

    left: 7532,

    bottom: 3854,

    top: 3704

  },

  {

    right: 7910,

    left: 7730,

    bottom: 3854,

    top: 3704

  },

  {

    right: 8108,

    left: 7928,

    bottom: 3854,

    top: 3704

  },

  {

    right: 8306,

    left: 8126,

    bottom: 3854,

    top: 3704

  },

  {

    right: 8504,

    left: 8324,

    bottom: 3854,

    top: 3704

  },

  {

    right: 8702,

    left: 8522,

    bottom: 3854,

    top: 3704

  },

  {

    right: 8900,

    left: 8720,

    bottom: 3854,

    top: 3704

  },

  {

    right: 9098,

    left: 8918,

    bottom: 3854,

    top: 3704

  },

  {

    right: 9296,

    left: 9116,

    bottom: 3854,

    top: 3704

  },

  {

    right: 9494,

    left: 9314,

    bottom: 3854,

    top: 3704

  },

  {

    right: 9692,

    left: 9512,

    bottom: 3854,

    top: 3704

  },

  {

    right: 9890,

    left: 9710,

    bottom: 3854,

    top: 3704

  },

  {

    right: 188,

    left: 8,

    bottom: 4022,

    top: 3872

  },

  {

    right: 386,

    left: 206,

    bottom: 4022,

    top: 3872

  },

  {

    right: 584,

    left: 404,

    bottom: 4022,

    top: 3872

  },

  {

    right: 782,

    left: 602,

    bottom: 4022,

    top: 3872

  },

  {

    right: 980,

    left: 800,

    bottom: 4022,

    top: 3872

  },

  {

    right: 1178,

    left: 998,

    bottom: 4022,

    top: 3872

  },

  {

    right: 1376,

    left: 1196,

    bottom: 4022,

    top: 3872

  },

  {

    right: 1574,

    left: 1394,

    bottom: 4022,

    top: 3872

  },

  {

    right: 1772,

    left: 1592,

    bottom: 4022,

    top: 3872

  },

  {

    right: 1970,

    left: 1790,

    bottom: 4022,

    top: 3872

  },

  {

    right: 2168,

    left: 1988,

    bottom: 4022,

    top: 3872

  },

  {

    right: 2366,

    left: 2186,

    bottom: 4022,

    top: 3872

  },

  {

    right: 2564,

    left: 2384,

    bottom: 4022,

    top: 3872

  },

  {

    right: 2762,

    left: 2582,

    bottom: 4022,

    top: 3872

  },

  {

    right: 2960,

    left: 2780,

    bottom: 4022,

    top: 3872

  },

  {

    right: 3158,

    left: 2978,

    bottom: 4022,

    top: 3872

  },

  {

    right: 3356,

    left: 3176,

    bottom: 4022,

    top: 3872

  },

  {

    right: 3554,

    left: 3374,

    bottom: 4022,

    top: 3872

  },

  {

    right: 3752,

    left: 3572,

    bottom: 4022,

    top: 3872

  },

  {

    right: 3950,

    left: 3770,

    bottom: 4022,

    top: 3872

  },

  {

    right: 4148,

    left: 3968,

    bottom: 4022,

    top: 3872

  },

  {

    right: 4346,

    left: 4166,

    bottom: 4022,

    top: 3872

  },

  {

    right: 4544,

    left: 4364,

    bottom: 4022,

    top: 3872

  },

  {

    right: 4742,

    left: 4562,

    bottom: 4022,

    top: 3872

  },

  {

    right: 4940,

    left: 4760,

    bottom: 4022,

    top: 3872

  },

  {

    right: 5138,

    left: 4958,

    bottom: 4022,

    top: 3872

  },

  {

    right: 5336,

    left: 5156,

    bottom: 4022,

    top: 3872

  },

  {

    right: 5534,

    left: 5354,

    bottom: 4022,

    top: 3872

  },

  {

    right: 5732,

    left: 5552,

    bottom: 4022,

    top: 3872

  },

  {

    right: 5930,

    left: 5750,

    bottom: 4022,

    top: 3872

  },

  {

    right: 6128,

    left: 5948,

    bottom: 4022,

    top: 3872

  },

  {

    right: 6326,

    left: 6146,

    bottom: 4022,

    top: 3872

  },

  {

    right: 6524,

    left: 6344,

    bottom: 4022,

    top: 3872

  },

  {

    right: 6722,

    left: 6542,

    bottom: 4022,

    top: 3872

  },

  {

    right: 6920,

    left: 6740,

    bottom: 4022,

    top: 3872

  },

  {

    right: 7118,

    left: 6938,

    bottom: 4022,

    top: 3872

  },

  {

    right: 7316,

    left: 7136,

    bottom: 4022,

    top: 3872

  },

  {

    right: 7514,

    left: 7334,

    bottom: 4022,

    top: 3872

  },

  {

    right: 7712,

    left: 7532,

    bottom: 4022,

    top: 3872

  },

  {

    right: 7910,

    left: 7730,

    bottom: 4022,

    top: 3872

  },

  {

    right: 8108,

    left: 7928,

    bottom: 4022,

    top: 3872

  },

  {

    right: 8306,

    left: 8126,

    bottom: 4022,

    top: 3872

  },

  {

    right: 8504,

    left: 8324,

    bottom: 4022,

    top: 3872

  },

  {

    right: 8702,

    left: 8522,

    bottom: 4022,

    top: 3872

  },

  {

    right: 8900,

    left: 8720,

    bottom: 4022,

    top: 3872

  },

  {

    right: 9098,

    left: 8918,

    bottom: 4022,

    top: 3872

  },

  {

    right: 9296,

    left: 9116,

    bottom: 4022,

    top: 3872

  },

  {

    right: 9494,

    left: 9314,

    bottom: 4022,

    top: 3872

  },

  {

    right: 9692,

    left: 9512,

    bottom: 4022,

    top: 3872

  },

  {

    right: 9890,

    left: 9710,

    bottom: 4022,

    top: 3872

  },

  {

    right: 188,

    left: 8,

    bottom: 4190,

    top: 4040

  },

  {

    right: 386,

    left: 206,

    bottom: 4190,

    top: 4040

  },

  {

    right: 584,

    left: 404,

    bottom: 4190,

    top: 4040

  },

  {

    right: 782,

    left: 602,

    bottom: 4190,

    top: 4040

  },

  {

    right: 980,

    left: 800,

    bottom: 4190,

    top: 4040

  },

  {

    right: 1178,

    left: 998,

    bottom: 4190,

    top: 4040

  },

  {

    right: 1376,

    left: 1196,

    bottom: 4190,

    top: 4040

  },

  {

    right: 1574,

    left: 1394,

    bottom: 4190,

    top: 4040

  },

  {

    right: 1772,

    left: 1592,

    bottom: 4190,

    top: 4040

  },

  {

    right: 1970,

    left: 1790,

    bottom: 4190,

    top: 4040

  },

  {

    right: 2168,

    left: 1988,

    bottom: 4190,

    top: 4040

  },

  {

    right: 2366,

    left: 2186,

    bottom: 4190,

    top: 4040

  },

  {

    right: 2564,

    left: 2384,

    bottom: 4190,

    top: 4040

  },

  {

    right: 2762,

    left: 2582,

    bottom: 4190,

    top: 4040

  },

  {

    right: 2960,

    left: 2780,

    bottom: 4190,

    top: 4040

  },

  {

    right: 3158,

    left: 2978,

    bottom: 4190,

    top: 4040

  },

  {

    right: 3356,

    left: 3176,

    bottom: 4190,

    top: 4040

  },

  {

    right: 3554,

    left: 3374,

    bottom: 4190,

    top: 4040

  },

  {

    right: 3752,

    left: 3572,

    bottom: 4190,

    top: 4040

  },

  {

    right: 3950,

    left: 3770,

    bottom: 4190,

    top: 4040

  },

  {

    right: 4148,

    left: 3968,

    bottom: 4190,

    top: 4040

  },

  {

    right: 4346,

    left: 4166,

    bottom: 4190,

    top: 4040

  },

  {

    right: 4544,

    left: 4364,

    bottom: 4190,

    top: 4040

  },

  {

    right: 4742,

    left: 4562,

    bottom: 4190,

    top: 4040

  },

  {

    right: 4940,

    left: 4760,

    bottom: 4190,

    top: 4040

  },

  {

    right: 5138,

    left: 4958,

    bottom: 4190,

    top: 4040

  },

  {

    right: 5336,

    left: 5156,

    bottom: 4190,

    top: 4040

  },

  {

    right: 5534,

    left: 5354,

    bottom: 4190,

    top: 4040

  },

  {

    right: 5732,

    left: 5552,

    bottom: 4190,

    top: 4040

  },

  {

    right: 5930,

    left: 5750,

    bottom: 4190,

    top: 4040

  },

  {

    right: 6128,

    left: 5948,

    bottom: 4190,

    top: 4040

  },

  {

    right: 6326,

    left: 6146,

    bottom: 4190,

    top: 4040

  },

  {

    right: 6524,

    left: 6344,

    bottom: 4190,

    top: 4040

  },

  {

    right: 6722,

    left: 6542,

    bottom: 4190,

    top: 4040

  },

  {

    right: 6920,

    left: 6740,

    bottom: 4190,

    top: 4040

  },

  {

    right: 7118,

    left: 6938,

    bottom: 4190,

    top: 4040

  },

  {

    right: 7316,

    left: 7136,

    bottom: 4190,

    top: 4040

  },

  {

    right: 7514,

    left: 7334,

    bottom: 4190,

    top: 4040

  },

  {

    right: 7712,

    left: 7532,

    bottom: 4190,

    top: 4040

  },

  {

    right: 7910,

    left: 7730,

    bottom: 4190,

    top: 4040

  },

  {

    right: 8108,

    left: 7928,

    bottom: 4190,

    top: 4040

  },

  {

    right: 8306,

    left: 8126,

    bottom: 4190,

    top: 4040

  },

  {

    right: 8504,

    left: 8324,

    bottom: 4190,

    top: 4040

  },

  {

    right: 8702,

    left: 8522,

    bottom: 4190,

    top: 4040

  },

  {

    right: 8900,

    left: 8720,

    bottom: 4190,

    top: 4040

  },

  {

    right: 9098,

    left: 8918,

    bottom: 4190,

    top: 4040

  },

  {

    right: 9296,

    left: 9116,

    bottom: 4190,

    top: 4040

  },

  {

    right: 9494,

    left: 9314,

    bottom: 4190,

    top: 4040

  },

  {

    right: 9692,

    left: 9512,

    bottom: 4190,

    top: 4040

  },

  {

    right: 9890,

    left: 9710,

    bottom: 4190,

    top: 4040

  },

  {

    right: 188,

    left: 8,

    bottom: 4358,

    top: 4208

  },

  {

    right: 386,

    left: 206,

    bottom: 4358,

    top: 4208

  },

  {

    right: 584,

    left: 404,

    bottom: 4358,

    top: 4208

  },

  {

    right: 782,

    left: 602,

    bottom: 4358,

    top: 4208

  },

  {

    right: 980,

    left: 800,

    bottom: 4358,

    top: 4208

  },

  {

    right: 1178,

    left: 998,

    bottom: 4358,

    top: 4208

  },

  {

    right: 1376,

    left: 1196,

    bottom: 4358,

    top: 4208

  },

  {

    right: 1574,

    left: 1394,

    bottom: 4358,

    top: 4208

  },

  {

    right: 1772,

    left: 1592,

    bottom: 4358,

    top: 4208

  },

  {

    right: 1970,

    left: 1790,

    bottom: 4358,

    top: 4208

  },

  {

    right: 2168,

    left: 1988,

    bottom: 4358,

    top: 4208

  },

  {

    right: 2366,

    left: 2186,

    bottom: 4358,

    top: 4208

  },

  {

    right: 2564,

    left: 2384,

    bottom: 4358,

    top: 4208

  },

  {

    right: 2762,

    left: 2582,

    bottom: 4358,

    top: 4208

  },

  {

    right: 2960,

    left: 2780,

    bottom: 4358,

    top: 4208

  },

  {

    right: 3158,

    left: 2978,

    bottom: 4358,

    top: 4208

  },

  {

    right: 3356,

    left: 3176,

    bottom: 4358,

    top: 4208

  },

  {

    right: 3554,

    left: 3374,

    bottom: 4358,

    top: 4208

  },

  {

    right: 3752,

    left: 3572,

    bottom: 4358,

    top: 4208

  },

  {

    right: 3950,

    left: 3770,

    bottom: 4358,

    top: 4208

  },

  {

    right: 4148,

    left: 3968,

    bottom: 4358,

    top: 4208

  },

  {

    right: 4346,

    left: 4166,

    bottom: 4358,

    top: 4208

  },

  {

    right: 4544,

    left: 4364,

    bottom: 4358,

    top: 4208

  },

  {

    right: 4742,

    left: 4562,

    bottom: 4358,

    top: 4208

  },

  {

    right: 4940,

    left: 4760,

    bottom: 4358,

    top: 4208

  },

  {

    right: 5138,

    left: 4958,

    bottom: 4358,

    top: 4208

  },

  {

    right: 5336,

    left: 5156,

    bottom: 4358,

    top: 4208

  },

  {

    right: 5534,

    left: 5354,

    bottom: 4358,

    top: 4208

  },

  {

    right: 5732,

    left: 5552,

    bottom: 4358,

    top: 4208

  },

  {

    right: 5930,

    left: 5750,

    bottom: 4358,

    top: 4208

  },

  {

    right: 6128,

    left: 5948,

    bottom: 4358,

    top: 4208

  },

  {

    right: 6326,

    left: 6146,

    bottom: 4358,

    top: 4208

  },

  {

    right: 6524,

    left: 6344,

    bottom: 4358,

    top: 4208

  },

  {

    right: 6722,

    left: 6542,

    bottom: 4358,

    top: 4208

  },

  {

    right: 6920,

    left: 6740,

    bottom: 4358,

    top: 4208

  },

  {

    right: 7118,

    left: 6938,

    bottom: 4358,

    top: 4208

  },

  {

    right: 7316,

    left: 7136,

    bottom: 4358,

    top: 4208

  },

  {

    right: 7514,

    left: 7334,

    bottom: 4358,

    top: 4208

  },

  {

    right: 7712,

    left: 7532,

    bottom: 4358,

    top: 4208

  },

  {

    right: 7910,

    left: 7730,

    bottom: 4358,

    top: 4208

  },

  {

    right: 8108,

    left: 7928,

    bottom: 4358,

    top: 4208

  },

  {

    right: 8306,

    left: 8126,

    bottom: 4358,

    top: 4208

  },

  {

    right: 8504,

    left: 8324,

    bottom: 4358,

    top: 4208

  },

  {

    right: 8702,

    left: 8522,

    bottom: 4358,

    top: 4208

  },

  {

    right: 8900,

    left: 8720,

    bottom: 4358,

    top: 4208

  },

  {

    right: 9098,

    left: 8918,

    bottom: 4358,

    top: 4208

  },

  {

    right: 9296,

    left: 9116,

    bottom: 4358,

    top: 4208

  },

  {

    right: 9494,

    left: 9314,

    bottom: 4358,

    top: 4208

  },

  {

    right: 9692,

    left: 9512,

    bottom: 4358,

    top: 4208

  },

  {

    right: 9890,

    left: 9710,

    bottom: 4358,

    top: 4208

  },

  {

    right: 188,

    left: 8,

    bottom: 4526,

    top: 4376

  },

  {

    right: 386,

    left: 206,

    bottom: 4526,

    top: 4376

  },

  {

    right: 584,

    left: 404,

    bottom: 4526,

    top: 4376

  },

  {

    right: 782,

    left: 602,

    bottom: 4526,

    top: 4376

  },

  {

    right: 980,

    left: 800,

    bottom: 4526,

    top: 4376

  },

  {

    right: 1178,

    left: 998,

    bottom: 4526,

    top: 4376

  },

  {

    right: 1376,

    left: 1196,

    bottom: 4526,

    top: 4376

  },

  {

    right: 1574,

    left: 1394,

    bottom: 4526,

    top: 4376

  },

  {

    right: 1772,

    left: 1592,

    bottom: 4526,

    top: 4376

  },

  {

    right: 1970,

    left: 1790,

    bottom: 4526,

    top: 4376

  },

  {

    right: 2168,

    left: 1988,

    bottom: 4526,

    top: 4376

  },

  {

    right: 2366,

    left: 2186,

    bottom: 4526,

    top: 4376

  },

  {

    right: 2564,

    left: 2384,

    bottom: 4526,

    top: 4376

  },

  {

    right: 2762,

    left: 2582,

    bottom: 4526,

    top: 4376

  },

  {

    right: 2960,

    left: 2780,

    bottom: 4526,

    top: 4376

  },

  {

    right: 3158,

    left: 2978,

    bottom: 4526,

    top: 4376

  },

  {

    right: 3356,

    left: 3176,

    bottom: 4526,

    top: 4376

  },

  {

    right: 3554,

    left: 3374,

    bottom: 4526,

    top: 4376

  },

  {

    right: 3752,

    left: 3572,

    bottom: 4526,

    top: 4376

  },

  {

    right: 3950,

    left: 3770,

    bottom: 4526,

    top: 4376

  },

  {

    right: 4148,

    left: 3968,

    bottom: 4526,

    top: 4376

  },

  {

    right: 4346,

    left: 4166,

    bottom: 4526,

    top: 4376

  },

  {

    right: 4544,

    left: 4364,

    bottom: 4526,

    top: 4376

  },

  {

    right: 4742,

    left: 4562,

    bottom: 4526,

    top: 4376

  },

  {

    right: 4940,

    left: 4760,

    bottom: 4526,

    top: 4376

  },

  {

    right: 5138,

    left: 4958,

    bottom: 4526,

    top: 4376

  },

  {

    right: 5336,

    left: 5156,

    bottom: 4526,

    top: 4376

  },

  {

    right: 5534,

    left: 5354,

    bottom: 4526,

    top: 4376

  },

  {

    right: 5732,

    left: 5552,

    bottom: 4526,

    top: 4376

  },

  {

    right: 5930,

    left: 5750,

    bottom: 4526,

    top: 4376

  },

  {

    right: 6128,

    left: 5948,

    bottom: 4526,

    top: 4376

  },

  {

    right: 6326,

    left: 6146,

    bottom: 4526,

    top: 4376

  },

  {

    right: 6524,

    left: 6344,

    bottom: 4526,

    top: 4376

  },

  {

    right: 6722,

    left: 6542,

    bottom: 4526,

    top: 4376

  },

  {

    right: 6920,

    left: 6740,

    bottom: 4526,

    top: 4376

  },

  {

    right: 7118,

    left: 6938,

    bottom: 4526,

    top: 4376

  },

  {

    right: 7316,

    left: 7136,

    bottom: 4526,

    top: 4376

  },

  {

    right: 7514,

    left: 7334,

    bottom: 4526,

    top: 4376

  },

  {

    right: 7712,

    left: 7532,

    bottom: 4526,

    top: 4376

  },

  {

    right: 7910,

    left: 7730,

    bottom: 4526,

    top: 4376

  },

  {

    right: 8108,

    left: 7928,

    bottom: 4526,

    top: 4376

  },

  {

    right: 8306,

    left: 8126,

    bottom: 4526,

    top: 4376

  },

  {

    right: 8504,

    left: 8324,

    bottom: 4526,

    top: 4376

  },

  {

    right: 8702,

    left: 8522,

    bottom: 4526,

    top: 4376

  },

  {

    right: 8900,

    left: 8720,

    bottom: 4526,

    top: 4376

  },

  {

    right: 9098,

    left: 8918,

    bottom: 4526,

    top: 4376

  },

  {

    right: 9296,

    left: 9116,

    bottom: 4526,

    top: 4376

  },

  {

    right: 9494,

    left: 9314,

    bottom: 4526,

    top: 4376

  },

  {

    right: 9692,

    left: 9512,

    bottom: 4526,

    top: 4376

  },

  {

    right: 9890,

    left: 9710,

    bottom: 4526,

    top: 4376

  },

  {

    right: 188,

    left: 8,

    bottom: 4694,

    top: 4544

  },

  {

    right: 386,

    left: 206,

    bottom: 4694,

    top: 4544

  },

  {

    right: 584,

    left: 404,

    bottom: 4694,

    top: 4544

  },

  {

    right: 782,

    left: 602,

    bottom: 4694,

    top: 4544

  },

  {

    right: 980,

    left: 800,

    bottom: 4694,

    top: 4544

  },

  {

    right: 1178,

    left: 998,

    bottom: 4694,

    top: 4544

  },

  {

    right: 1376,

    left: 1196,

    bottom: 4694,

    top: 4544

  },

  {

    right: 1574,

    left: 1394,

    bottom: 4694,

    top: 4544

  },

  {

    right: 1772,

    left: 1592,

    bottom: 4694,

    top: 4544

  },

  {

    right: 1970,

    left: 1790,

    bottom: 4694,

    top: 4544

  },

  {

    right: 2168,

    left: 1988,

    bottom: 4694,

    top: 4544

  },

  {

    right: 2366,

    left: 2186,

    bottom: 4694,

    top: 4544

  },

  {

    right: 2564,

    left: 2384,

    bottom: 4694,

    top: 4544

  },

  {

    right: 2762,

    left: 2582,

    bottom: 4694,

    top: 4544

  },

  {

    right: 2960,

    left: 2780,

    bottom: 4694,

    top: 4544

  },

  {

    right: 3158,

    left: 2978,

    bottom: 4694,

    top: 4544

  },

  {

    right: 3356,

    left: 3176,

    bottom: 4694,

    top: 4544

  },

  {

    right: 3554,

    left: 3374,

    bottom: 4694,

    top: 4544

  },

  {

    right: 3752,

    left: 3572,

    bottom: 4694,

    top: 4544

  },

  {

    right: 3950,

    left: 3770,

    bottom: 4694,

    top: 4544

  },

  {

    right: 4148,

    left: 3968,

    bottom: 4694,

    top: 4544

  },

  {

    right: 4346,

    left: 4166,

    bottom: 4694,

    top: 4544

  },

  {

    right: 4544,

    left: 4364,

    bottom: 4694,

    top: 4544

  },

  {

    right: 4742,

    left: 4562,

    bottom: 4694,

    top: 4544

  },

  {

    right: 4940,

    left: 4760,

    bottom: 4694,

    top: 4544

  },

  {

    right: 5138,

    left: 4958,

    bottom: 4694,

    top: 4544

  },

  {

    right: 5336,

    left: 5156,

    bottom: 4694,

    top: 4544

  },

  {

    right: 5534,

    left: 5354,

    bottom: 4694,

    top: 4544

  },

  {

    right: 5732,

    left: 5552,

    bottom: 4694,

    top: 4544

  },

  {

    right: 5930,

    left: 5750,

    bottom: 4694,

    top: 4544

  },

  {

    right: 6128,

    left: 5948,

    bottom: 4694,

    top: 4544

  },

  {

    right: 6326,

    left: 6146,

    bottom: 4694,

    top: 4544

  },

  {

    right: 6524,

    left: 6344,

    bottom: 4694,

    top: 4544

  },

  {

    right: 6722,

    left: 6542,

    bottom: 4694,

    top: 4544

  },

  {

    right: 6920,

    left: 6740,

    bottom: 4694,

    top: 4544

  },

  {

    right: 7118,

    left: 6938,

    bottom: 4694,

    top: 4544

  },

  {

    right: 7316,

    left: 7136,

    bottom: 4694,

    top: 4544

  },

  {

    right: 7514,

    left: 7334,

    bottom: 4694,

    top: 4544

  },

  {

    right: 7712,

    left: 7532,

    bottom: 4694,

    top: 4544

  },

  {

    right: 7910,

    left: 7730,

    bottom: 4694,

    top: 4544

  },

  {

    right: 8108,

    left: 7928,

    bottom: 4694,

    top: 4544

  },

  {

    right: 8306,

    left: 8126,

    bottom: 4694,

    top: 4544

  },

  {

    right: 8504,

    left: 8324,

    bottom: 4694,

    top: 4544

  },

  {

    right: 8702,

    left: 8522,

    bottom: 4694,

    top: 4544

  },

  {

    right: 8900,

    left: 8720,

    bottom: 4694,

    top: 4544

  },

  {

    right: 9098,

    left: 8918,

    bottom: 4694,

    top: 4544

  },

  {

    right: 9296,

    left: 9116,

    bottom: 4694,

    top: 4544

  },

  {

    right: 9494,

    left: 9314,

    bottom: 4694,

    top: 4544

  },

  {

    right: 9692,

    left: 9512,

    bottom: 4694,

    top: 4544

  },

  {

    right: 9890,

    left: 9710,

    bottom: 4694,

    top: 4544

  },

  {

    right: 188,

    left: 8,

    bottom: 4862,

    top: 4712

  },

  {

    right: 386,

    left: 206,

    bottom: 4862,

    top: 4712

  },

  {

    right: 584,

    left: 404,

    bottom: 4862,

    top: 4712

  },

  {

    right: 782,

    left: 602,

    bottom: 4862,

    top: 4712

  },

  {

    right: 980,

    left: 800,

    bottom: 4862,

    top: 4712

  },

  {

    right: 1178,

    left: 998,

    bottom: 4862,

    top: 4712

  },

  {

    right: 1376,

    left: 1196,

    bottom: 4862,

    top: 4712

  },

  {

    right: 1574,

    left: 1394,

    bottom: 4862,

    top: 4712

  },

  {

    right: 1772,

    left: 1592,

    bottom: 4862,

    top: 4712

  },

  {

    right: 1970,

    left: 1790,

    bottom: 4862,

    top: 4712

  },

  {

    right: 2168,

    left: 1988,

    bottom: 4862,

    top: 4712

  },

  {

    right: 2366,

    left: 2186,

    bottom: 4862,

    top: 4712

  },

  {

    right: 2564,

    left: 2384,

    bottom: 4862,

    top: 4712

  },

  {

    right: 2762,

    left: 2582,

    bottom: 4862,

    top: 4712

  },

  {

    right: 2960,

    left: 2780,

    bottom: 4862,

    top: 4712

  },

  {

    right: 3158,

    left: 2978,

    bottom: 4862,

    top: 4712

  },

  {

    right: 3356,

    left: 3176,

    bottom: 4862,

    top: 4712

  },

  {

    right: 3554,

    left: 3374,

    bottom: 4862,

    top: 4712

  },

  {

    right: 3752,

    left: 3572,

    bottom: 4862,

    top: 4712

  },

  {

    right: 3950,

    left: 3770,

    bottom: 4862,

    top: 4712

  },

  {

    right: 4148,

    left: 3968,

    bottom: 4862,

    top: 4712

  },

  {

    right: 4346,

    left: 4166,

    bottom: 4862,

    top: 4712

  },

  {

    right: 4544,

    left: 4364,

    bottom: 4862,

    top: 4712

  },

  {

    right: 4742,

    left: 4562,

    bottom: 4862,

    top: 4712

  },

  {

    right: 4940,

    left: 4760,

    bottom: 4862,

    top: 4712

  },

  {

    right: 5138,

    left: 4958,

    bottom: 4862,

    top: 4712

  },

  {

    right: 5336,

    left: 5156,

    bottom: 4862,

    top: 4712

  },

  {

    right: 5534,

    left: 5354,

    bottom: 4862,

    top: 4712

  },

  {

    right: 5732,

    left: 5552,

    bottom: 4862,

    top: 4712

  },

  {

    right: 5930,

    left: 5750,

    bottom: 4862,

    top: 4712

  },

  {

    right: 6128,

    left: 5948,

    bottom: 4862,

    top: 4712

  },

  {

    right: 6326,

    left: 6146,

    bottom: 4862,

    top: 4712

  },

  {

    right: 6524,

    left: 6344,

    bottom: 4862,

    top: 4712

  },

  {

    right: 6722,

    left: 6542,

    bottom: 4862,

    top: 4712

  },

  {

    right: 6920,

    left: 6740,

    bottom: 4862,

    top: 4712

  },

  {

    right: 7118,

    left: 6938,

    bottom: 4862,

    top: 4712

  },

  {

    right: 7316,

    left: 7136,

    bottom: 4862,

    top: 4712

  },

  {

    right: 7514,

    left: 7334,

    bottom: 4862,

    top: 4712

  },

  {

    right: 7712,

    left: 7532,

    bottom: 4862,

    top: 4712

  },

  {

    right: 7910,

    left: 7730,

    bottom: 4862,

    top: 4712

  },

  {

    right: 8108,

    left: 7928,

    bottom: 4862,

    top: 4712

  },

  {

    right: 8306,

    left: 8126,

    bottom: 4862,

    top: 4712

  },

  {

    right: 8504,

    left: 8324,

    bottom: 4862,

    top: 4712

  },

  {

    right: 8702,

    left: 8522,

    bottom: 4862,

    top: 4712

  },

  {

    right: 8900,

    left: 8720,

    bottom: 4862,

    top: 4712

  },

  {

    right: 9098,

    left: 8918,

    bottom: 4862,

    top: 4712

  },

  {

    right: 9296,

    left: 9116,

    bottom: 4862,

    top: 4712

  },

  {

    right: 9494,

    left: 9314,

    bottom: 4862,

    top: 4712

  },

  {

    right: 9692,

    left: 9512,

    bottom: 4862,

    top: 4712

  },

  {

    right: 9890,

    left: 9710,

    bottom: 4862,

    top: 4712

  },

  {

    right: 188,

    left: 8,

    bottom: 5030,

    top: 4880

  },

  {

    right: 386,

    left: 206,

    bottom: 5030,

    top: 4880

  },

  {

    right: 584,

    left: 404,

    bottom: 5030,

    top: 4880

  },

  {

    right: 782,

    left: 602,

    bottom: 5030,

    top: 4880

  },

  {

    right: 980,

    left: 800,

    bottom: 5030,

    top: 4880

  },

  {

    right: 1178,

    left: 998,

    bottom: 5030,

    top: 4880

  },

  {

    right: 1376,

    left: 1196,

    bottom: 5030,

    top: 4880

  },

  {

    right: 1574,

    left: 1394,

    bottom: 5030,

    top: 4880

  },

  {

    right: 1772,

    left: 1592,

    bottom: 5030,

    top: 4880

  },

  {

    right: 1970,

    left: 1790,

    bottom: 5030,

    top: 4880

  },

  {

    right: 2168,

    left: 1988,

    bottom: 5030,

    top: 4880

  },

  {

    right: 2366,

    left: 2186,

    bottom: 5030,

    top: 4880

  },

  {

    right: 2564,

    left: 2384,

    bottom: 5030,

    top: 4880

  },

  {

    right: 2762,

    left: 2582,

    bottom: 5030,

    top: 4880

  },

  {

    right: 2960,

    left: 2780,

    bottom: 5030,

    top: 4880

  },

  {

    right: 3158,

    left: 2978,

    bottom: 5030,

    top: 4880

  },

  {

    right: 3356,

    left: 3176,

    bottom: 5030,

    top: 4880

  },

  {

    right: 3554,

    left: 3374,

    bottom: 5030,

    top: 4880

  },

  {

    right: 3752,

    left: 3572,

    bottom: 5030,

    top: 4880

  },

  {

    right: 3950,

    left: 3770,

    bottom: 5030,

    top: 4880

  },

  {

    right: 4148,

    left: 3968,

    bottom: 5030,

    top: 4880

  },

  {

    right: 4346,

    left: 4166,

    bottom: 5030,

    top: 4880

  },

  {

    right: 4544,

    left: 4364,

    bottom: 5030,

    top: 4880

  },

  {

    right: 4742,

    left: 4562,

    bottom: 5030,

    top: 4880

  },

  {

    right: 4940,

    left: 4760,

    bottom: 5030,

    top: 4880

  },

  {

    right: 5138,

    left: 4958,

    bottom: 5030,

    top: 4880

  },

  {

    right: 5336,

    left: 5156,

    bottom: 5030,

    top: 4880

  },

  {

    right: 5534,

    left: 5354,

    bottom: 5030,

    top: 4880

  },

  {

    right: 5732,

    left: 5552,

    bottom: 5030,

    top: 4880

  },

  {

    right: 5930,

    left: 5750,

    bottom: 5030,

    top: 4880

  },

  {

    right: 6128,

    left: 5948,

    bottom: 5030,

    top: 4880

  },

  {

    right: 6326,

    left: 6146,

    bottom: 5030,

    top: 4880

  },

  {

    right: 6524,

    left: 6344,

    bottom: 5030,

    top: 4880

  },

  {

    right: 6722,

    left: 6542,

    bottom: 5030,

    top: 4880

  },

  {

    right: 6920,

    left: 6740,

    bottom: 5030,

    top: 4880

  },

  {

    right: 7118,

    left: 6938,

    bottom: 5030,

    top: 4880

  },

  {

    right: 7316,

    left: 7136,

    bottom: 5030,

    top: 4880

  },

  {

    right: 7514,

    left: 7334,

    bottom: 5030,

    top: 4880

  },

  {

    right: 7712,

    left: 7532,

    bottom: 5030,

    top: 4880

  },

  {

    right: 7910,

    left: 7730,

    bottom: 5030,

    top: 4880

  },

  {

    right: 8108,

    left: 7928,

    bottom: 5030,

    top: 4880

  },

  {

    right: 8306,

    left: 8126,

    bottom: 5030,

    top: 4880

  },

  {

    right: 8504,

    left: 8324,

    bottom: 5030,

    top: 4880

  },

  {

    right: 8702,

    left: 8522,

    bottom: 5030,

    top: 4880

  },

  {

    right: 8900,

    left: 8720,

    bottom: 5030,

    top: 4880

  },

  {

    right: 9098,

    left: 8918,

    bottom: 5030,

    top: 4880

  },

  {

    right: 9296,

    left: 9116,

    bottom: 5030,

    top: 4880

  },

  {

    right: 9494,

    left: 9314,

    bottom: 5030,

    top: 4880

  },

  {

    right: 9692,

    left: 9512,

    bottom: 5030,

    top: 4880

  },

  {

    right: 9890,

    left: 9710,

    bottom: 5030,

    top: 4880

  },

  {

    right: 188,

    left: 8,

    bottom: 5198,

    top: 5048

  },

  {

    right: 386,

    left: 206,

    bottom: 5198,

    top: 5048

  },

  {

    right: 584,

    left: 404,

    bottom: 5198,

    top: 5048

  },

  {

    right: 782,

    left: 602,

    bottom: 5198,

    top: 5048

  },

  {

    right: 980,

    left: 800,

    bottom: 5198,

    top: 5048

  },

  {

    right: 1178,

    left: 998,

    bottom: 5198,

    top: 5048

  },

  {

    right: 1376,

    left: 1196,

    bottom: 5198,

    top: 5048

  },

  {

    right: 1574,

    left: 1394,

    bottom: 5198,

    top: 5048

  },

  {

    right: 1772,

    left: 1592,

    bottom: 5198,

    top: 5048

  },

  {

    right: 1970,

    left: 1790,

    bottom: 5198,

    top: 5048

  },

  {

    right: 2168,

    left: 1988,

    bottom: 5198,

    top: 5048

  },

  {

    right: 2366,

    left: 2186,

    bottom: 5198,

    top: 5048

  },

  {

    right: 2564,

    left: 2384,

    bottom: 5198,

    top: 5048

  },

  {

    right: 2762,

    left: 2582,

    bottom: 5198,

    top: 5048

  },

  {

    right: 2960,

    left: 2780,

    bottom: 5198,

    top: 5048

  },

  {

    right: 3158,

    left: 2978,

    bottom: 5198,

    top: 5048

  },

  {

    right: 3356,

    left: 3176,

    bottom: 5198,

    top: 5048

  },

  {

    right: 3554,

    left: 3374,

    bottom: 5198,

    top: 5048

  },

  {

    right: 3752,

    left: 3572,

    bottom: 5198,

    top: 5048

  },

  {

    right: 3950,

    left: 3770,

    bottom: 5198,

    top: 5048

  },

  {

    right: 4148,

    left: 3968,

    bottom: 5198,

    top: 5048

  },

  {

    right: 4346,

    left: 4166,

    bottom: 5198,

    top: 5048

  },

  {

    right: 4544,

    left: 4364,

    bottom: 5198,

    top: 5048

  },

  {

    right: 4742,

    left: 4562,

    bottom: 5198,

    top: 5048

  },

  {

    right: 4940,

    left: 4760,

    bottom: 5198,

    top: 5048

  },

  {

    right: 5138,

    left: 4958,

    bottom: 5198,

    top: 5048

  },

  {

    right: 5336,

    left: 5156,

    bottom: 5198,

    top: 5048

  },

  {

    right: 5534,

    left: 5354,

    bottom: 5198,

    top: 5048

  },

  {

    right: 5732,

    left: 5552,

    bottom: 5198,

    top: 5048

  },

  {

    right: 5930,

    left: 5750,

    bottom: 5198,

    top: 5048

  },

  {

    right: 6128,

    left: 5948,

    bottom: 5198,

    top: 5048

  },

  {

    right: 6326,

    left: 6146,

    bottom: 5198,

    top: 5048

  },

  {

    right: 6524,

    left: 6344,

    bottom: 5198,

    top: 5048

  },

  {

    right: 6722,

    left: 6542,

    bottom: 5198,

    top: 5048

  },

  {

    right: 6920,

    left: 6740,

    bottom: 5198,

    top: 5048

  },

  {

    right: 7118,

    left: 6938,

    bottom: 5198,

    top: 5048

  },

  {

    right: 7316,

    left: 7136,

    bottom: 5198,

    top: 5048

  },

  {

    right: 7514,

    left: 7334,

    bottom: 5198,

    top: 5048

  },

  {

    right: 7712,

    left: 7532,

    bottom: 5198,

    top: 5048

  },

  {

    right: 7910,

    left: 7730,

    bottom: 5198,

    top: 5048

  },

  {

    right: 8108,

    left: 7928,

    bottom: 5198,

    top: 5048

  },

  {

    right: 8306,

    left: 8126,

    bottom: 5198,

    top: 5048

  },

  {

    right: 8504,

    left: 8324,

    bottom: 5198,

    top: 5048

  },

  {

    right: 8702,

    left: 8522,

    bottom: 5198,

    top: 5048

  },

  {

    right: 8900,

    left: 8720,

    bottom: 5198,

    top: 5048

  },

  {

    right: 9098,

    left: 8918,

    bottom: 5198,

    top: 5048

  },

  {

    right: 9296,

    left: 9116,

    bottom: 5198,

    top: 5048

  },

  {

    right: 9494,

    left: 9314,

    bottom: 5198,

    top: 5048

  },

  {

    right: 9692,

    left: 9512,

    bottom: 5198,

    top: 5048

  },

  {

    right: 9890,

    left: 9710,

    bottom: 5198,

    top: 5048

  },

  {

    right: 188,

    left: 8,

    bottom: 5366,

    top: 5216

  },

  {

    right: 386,

    left: 206,

    bottom: 5366,

    top: 5216

  },

  {

    right: 584,

    left: 404,

    bottom: 5366,

    top: 5216

  },

  {

    right: 782,

    left: 602,

    bottom: 5366,

    top: 5216

  },

  {

    right: 980,

    left: 800,

    bottom: 5366,

    top: 5216

  },

  {

    right: 1178,

    left: 998,

    bottom: 5366,

    top: 5216

  },

  {

    right: 1376,

    left: 1196,

    bottom: 5366,

    top: 5216

  },

  {

    right: 1574,

    left: 1394,

    bottom: 5366,

    top: 5216

  },

  {

    right: 1772,

    left: 1592,

    bottom: 5366,

    top: 5216

  },

  {

    right: 1970,

    left: 1790,

    bottom: 5366,

    top: 5216

  },

  {

    right: 2168,

    left: 1988,

    bottom: 5366,

    top: 5216

  },

  {

    right: 2366,

    left: 2186,

    bottom: 5366,

    top: 5216

  },

  {

    right: 2564,

    left: 2384,

    bottom: 5366,

    top: 5216

  },

  {

    right: 2762,

    left: 2582,

    bottom: 5366,

    top: 5216

  },

  {

    right: 2960,

    left: 2780,

    bottom: 5366,

    top: 5216

  },

  {

    right: 3158,

    left: 2978,

    bottom: 5366,

    top: 5216

  },

  {

    right: 3356,

    left: 3176,

    bottom: 5366,

    top: 5216

  },

  {

    right: 3554,

    left: 3374,

    bottom: 5366,

    top: 5216

  },

  {

    right: 3752,

    left: 3572,

    bottom: 5366,

    top: 5216

  },

  {

    right: 3950,

    left: 3770,

    bottom: 5366,

    top: 5216

  },

  {

    right: 4148,

    left: 3968,

    bottom: 5366,

    top: 5216

  },

  {

    right: 4346,

    left: 4166,

    bottom: 5366,

    top: 5216

  },

  {

    right: 4544,

    left: 4364,

    bottom: 5366,

    top: 5216

  },

  {

    right: 4742,

    left: 4562,

    bottom: 5366,

    top: 5216

  },

  {

    right: 4940,

    left: 4760,

    bottom: 5366,

    top: 5216

  },

  {

    right: 5138,

    left: 4958,

    bottom: 5366,

    top: 5216

  },

  {

    right: 5336,

    left: 5156,

    bottom: 5366,

    top: 5216

  },

  {

    right: 5534,

    left: 5354,

    bottom: 5366,

    top: 5216

  },

  {

    right: 5732,

    left: 5552,

    bottom: 5366,

    top: 5216

  },

  {

    right: 5930,

    left: 5750,

    bottom: 5366,

    top: 5216

  },

  {

    right: 6128,

    left: 5948,

    bottom: 5366,

    top: 5216

  },

  {

    right: 6326,

    left: 6146,

    bottom: 5366,

    top: 5216

  },

  {

    right: 6524,

    left: 6344,

    bottom: 5366,

    top: 5216

  },

  {

    right: 6722,

    left: 6542,

    bottom: 5366,

    top: 5216

  },

  {

    right: 6920,

    left: 6740,

    bottom: 5366,

    top: 5216

  },

  {

    right: 7118,

    left: 6938,

    bottom: 5366,

    top: 5216

  },

  {

    right: 7316,

    left: 7136,

    bottom: 5366,

    top: 5216

  },

  {

    right: 7514,

    left: 7334,

    bottom: 5366,

    top: 5216

  },

  {

    right: 7712,

    left: 7532,

    bottom: 5366,

    top: 5216

  },

  {

    right: 7910,

    left: 7730,

    bottom: 5366,

    top: 5216

  },

  {

    right: 8108,

    left: 7928,

    bottom: 5366,

    top: 5216

  },

  {

    right: 8306,

    left: 8126,

    bottom: 5366,

    top: 5216

  },

  {

    right: 8504,

    left: 8324,

    bottom: 5366,

    top: 5216

  },

  {

    right: 8702,

    left: 8522,

    bottom: 5366,

    top: 5216

  },

  {

    right: 8900,

    left: 8720,

    bottom: 5366,

    top: 5216

  },

  {

    right: 9098,

    left: 8918,

    bottom: 5366,

    top: 5216

  },

  {

    right: 9296,

    left: 9116,

    bottom: 5366,

    top: 5216

  },

  {

    right: 9494,

    left: 9314,

    bottom: 5366,

    top: 5216

  },

  {

    right: 9692,

    left: 9512,

    bottom: 5366,

    top: 5216

  },

  {

    right: 9890,

    left: 9710,

    bottom: 5366,

    top: 5216

  },

  {

    right: 188,

    left: 8,

    bottom: 5534,

    top: 5384

  },

  {

    right: 386,

    left: 206,

    bottom: 5534,

    top: 5384

  },

  {

    right: 584,

    left: 404,

    bottom: 5534,

    top: 5384

  },

  {

    right: 782,

    left: 602,

    bottom: 5534,

    top: 5384

  },

  {

    right: 980,

    left: 800,

    bottom: 5534,

    top: 5384

  },

  {

    right: 1178,

    left: 998,

    bottom: 5534,

    top: 5384

  },

  {

    right: 1376,

    left: 1196,

    bottom: 5534,

    top: 5384

  },

  {

    right: 1574,

    left: 1394,

    bottom: 5534,

    top: 5384

  },

  {

    right: 1772,

    left: 1592,

    bottom: 5534,

    top: 5384

  },

  {

    right: 1970,

    left: 1790,

    bottom: 5534,

    top: 5384

  },

  {

    right: 2168,

    left: 1988,

    bottom: 5534,

    top: 5384

  },

  {

    right: 2366,

    left: 2186,

    bottom: 5534,

    top: 5384

  },

  {

    right: 2564,

    left: 2384,

    bottom: 5534,

    top: 5384

  },

  {

    right: 2762,

    left: 2582,

    bottom: 5534,

    top: 5384

  },

  {

    right: 2960,

    left: 2780,

    bottom: 5534,

    top: 5384

  },

  {

    right: 3158,

    left: 2978,

    bottom: 5534,

    top: 5384

  },

  {

    right: 3356,

    left: 3176,

    bottom: 5534,

    top: 5384

  },

  {

    right: 3554,

    left: 3374,

    bottom: 5534,

    top: 5384

  },

  {

    right: 3752,

    left: 3572,

    bottom: 5534,

    top: 5384

  },

  {

    right: 3950,

    left: 3770,

    bottom: 5534,

    top: 5384

  },

  {

    right: 4148,

    left: 3968,

    bottom: 5534,

    top: 5384

  },

  {

    right: 4346,

    left: 4166,

    bottom: 5534,

    top: 5384

  },

  {

    right: 4544,

    left: 4364,

    bottom: 5534,

    top: 5384

  },

  {

    right: 4742,

    left: 4562,

    bottom: 5534,

    top: 5384

  },

  {

    right: 4940,

    left: 4760,

    bottom: 5534,

    top: 5384

  },

  {

    right: 5138,

    left: 4958,

    bottom: 5534,

    top: 5384

  },

  {

    right: 5336,

    left: 5156,

    bottom: 5534,

    top: 5384

  },

  {

    right: 5534,

    left: 5354,

    bottom: 5534,

    top: 5384

  },

  {

    right: 5732,

    left: 5552,

    bottom: 5534,

    top: 5384

  },

  {

    right: 5930,

    left: 5750,

    bottom: 5534,

    top: 5384

  },

  {

    right: 6128,

    left: 5948,

    bottom: 5534,

    top: 5384

  },

  {

    right: 6326,

    left: 6146,

    bottom: 5534,

    top: 5384

  },

  {

    right: 6524,

    left: 6344,

    bottom: 5534,

    top: 5384

  },

  {

    right: 6722,

    left: 6542,

    bottom: 5534,

    top: 5384

  },

  {

    right: 6920,

    left: 6740,

    bottom: 5534,

    top: 5384

  },

  {

    right: 7118,

    left: 6938,

    bottom: 5534,

    top: 5384

  },

  {

    right: 7316,

    left: 7136,

    bottom: 5534,

    top: 5384

  },

  {

    right: 7514,

    left: 7334,

    bottom: 5534,

    top: 5384

  },

  {

    right: 7712,

    left: 7532,

    bottom: 5534,

    top: 5384

  },

  {

    right: 7910,

    left: 7730,

    bottom: 5534,

    top: 5384

  },

  {

    right: 8108,

    left: 7928,

    bottom: 5534,

    top: 5384

  },

  {

    right: 8306,

    left: 8126,

    bottom: 5534,

    top: 5384

  },

  {

    right: 8504,

    left: 8324,

    bottom: 5534,

    top: 5384

  },

  {

    right: 8702,

    left: 8522,

    bottom: 5534,

    top: 5384

  },

  {

    right: 8900,

    left: 8720,

    bottom: 5534,

    top: 5384

  },

  {

    right: 9098,

    left: 8918,

    bottom: 5534,

    top: 5384

  },

  {

    right: 9296,

    left: 9116,

    bottom: 5534,

    top: 5384

  },

  {

    right: 9494,

    left: 9314,

    bottom: 5534,

    top: 5384

  },

  {

    right: 9692,

    left: 9512,

    bottom: 5534,

    top: 5384

  },

  {

    right: 9890,

    left: 9710,

    bottom: 5534,

    top: 5384

  },

  {

    right: 188,

    left: 8,

    bottom: 5702,

    top: 5552

  },

  {

    right: 386,

    left: 206,

    bottom: 5702,

    top: 5552

  },

  {

    right: 584,

    left: 404,

    bottom: 5702,

    top: 5552

  },

  {

    right: 782,

    left: 602,

    bottom: 5702,

    top: 5552

  },

  {

    right: 980,

    left: 800,

    bottom: 5702,

    top: 5552

  },

  {

    right: 1178,

    left: 998,

    bottom: 5702,

    top: 5552

  },

  {

    right: 1376,

    left: 1196,

    bottom: 5702,

    top: 5552

  },

  {

    right: 1574,

    left: 1394,

    bottom: 5702,

    top: 5552

  },

  {

    right: 1772,

    left: 1592,

    bottom: 5702,

    top: 5552

  },

  {

    right: 1970,

    left: 1790,

    bottom: 5702,

    top: 5552

  },

  {

    right: 2168,

    left: 1988,

    bottom: 5702,

    top: 5552

  },

  {

    right: 2366,

    left: 2186,

    bottom: 5702,

    top: 5552

  },

  {

    right: 2564,

    left: 2384,

    bottom: 5702,

    top: 5552

  },

  {

    right: 2762,

    left: 2582,

    bottom: 5702,

    top: 5552

  },

  {

    right: 2960,

    left: 2780,

    bottom: 5702,

    top: 5552

  },

  {

    right: 3158,

    left: 2978,

    bottom: 5702,

    top: 5552

  },

  {

    right: 3356,

    left: 3176,

    bottom: 5702,

    top: 5552

  },

  {

    right: 3554,

    left: 3374,

    bottom: 5702,

    top: 5552

  },

  {

    right: 3752,

    left: 3572,

    bottom: 5702,

    top: 5552

  },

  {

    right: 3950,

    left: 3770,

    bottom: 5702,

    top: 5552

  },

  {

    right: 4148,

    left: 3968,

    bottom: 5702,

    top: 5552

  },

  {

    right: 4346,

    left: 4166,

    bottom: 5702,

    top: 5552

  },

  {

    right: 4544,

    left: 4364,

    bottom: 5702,

    top: 5552

  },

  {

    right: 4742,

    left: 4562,

    bottom: 5702,

    top: 5552

  },

  {

    right: 4940,

    left: 4760,

    bottom: 5702,

    top: 5552

  },

  {

    right: 5138,

    left: 4958,

    bottom: 5702,

    top: 5552

  },

  {

    right: 5336,

    left: 5156,

    bottom: 5702,

    top: 5552

  },

  {

    right: 5534,

    left: 5354,

    bottom: 5702,

    top: 5552

  },

  {

    right: 5732,

    left: 5552,

    bottom: 5702,

    top: 5552

  },

  {

    right: 5930,

    left: 5750,

    bottom: 5702,

    top: 5552

  },

  {

    right: 6128,

    left: 5948,

    bottom: 5702,

    top: 5552

  },

  {

    right: 6326,

    left: 6146,

    bottom: 5702,

    top: 5552

  },

  {

    right: 6524,

    left: 6344,

    bottom: 5702,

    top: 5552

  },

  {

    right: 6722,

    left: 6542,

    bottom: 5702,

    top: 5552

  },

  {

    right: 6920,

    left: 6740,

    bottom: 5702,

    top: 5552

  },

  {

    right: 7118,

    left: 6938,

    bottom: 5702,

    top: 5552

  },

  {

    right: 7316,

    left: 7136,

    bottom: 5702,

    top: 5552

  },

  {

    right: 7514,

    left: 7334,

    bottom: 5702,

    top: 5552

  },

  {

    right: 7712,

    left: 7532,

    bottom: 5702,

    top: 5552

  },

  {

    right: 7910,

    left: 7730,

    bottom: 5702,

    top: 5552

  },

  {

    right: 8108,

    left: 7928,

    bottom: 5702,

    top: 5552

  },

  {

    right: 8306,

    left: 8126,

    bottom: 5702,

    top: 5552

  },

  {

    right: 8504,

    left: 8324,

    bottom: 5702,

    top: 5552

  },

  {

    right: 8702,

    left: 8522,

    bottom: 5702,

    top: 5552

  },

  {

    right: 8900,

    left: 8720,

    bottom: 5702,

    top: 5552

  },

  {

    right: 9098,

    left: 8918,

    bottom: 5702,

    top: 5552

  },

  {

    right: 9296,

    left: 9116,

    bottom: 5702,

    top: 5552

  },

  {

    right: 9494,

    left: 9314,

    bottom: 5702,

    top: 5552

  },

  {

    right: 9692,

    left: 9512,

    bottom: 5702,

    top: 5552

  },

  {

    right: 9890,

    left: 9710,

    bottom: 5702,

    top: 5552

  },

  {

    right: 188,

    left: 8,

    bottom: 5870,

    top: 5720

  },

  {

    right: 386,

    left: 206,

    bottom: 5870,

    top: 5720

  },

  {

    right: 584,

    left: 404,

    bottom: 5870,

    top: 5720

  },

  {

    right: 782,

    left: 602,

    bottom: 5870,

    top: 5720

  },

  {

    right: 980,

    left: 800,

    bottom: 5870,

    top: 5720

  },

  {

    right: 1178,

    left: 998,

    bottom: 5870,

    top: 5720

  },

  {

    right: 1376,

    left: 1196,

    bottom: 5870,

    top: 5720

  },

  {

    right: 1574,

    left: 1394,

    bottom: 5870,

    top: 5720

  },

  {

    right: 1772,

    left: 1592,

    bottom: 5870,

    top: 5720

  },

  {

    right: 1970,

    left: 1790,

    bottom: 5870,

    top: 5720

  },

  {

    right: 2168,

    left: 1988,

    bottom: 5870,

    top: 5720

  },

  {

    right: 2366,

    left: 2186,

    bottom: 5870,

    top: 5720

  },

  {

    right: 2564,

    left: 2384,

    bottom: 5870,

    top: 5720

  },

  {

    right: 2762,

    left: 2582,

    bottom: 5870,

    top: 5720

  },

  {

    right: 2960,

    left: 2780,

    bottom: 5870,

    top: 5720

  },

  {

    right: 3158,

    left: 2978,

    bottom: 5870,

    top: 5720

  },

  {

    right: 3356,

    left: 3176,

    bottom: 5870,

    top: 5720

  },

  {

    right: 3554,

    left: 3374,

    bottom: 5870,

    top: 5720

  },

  {

    right: 3752,

    left: 3572,

    bottom: 5870,

    top: 5720

  },

  {

    right: 3950,

    left: 3770,

    bottom: 5870,

    top: 5720

  },

  {

    right: 4148,

    left: 3968,

    bottom: 5870,

    top: 5720

  },

  {

    right: 4346,

    left: 4166,

    bottom: 5870,

    top: 5720

  },

  {

    right: 4544,

    left: 4364,

    bottom: 5870,

    top: 5720

  },

  {

    right: 4742,

    left: 4562,

    bottom: 5870,

    top: 5720

  },

  {

    right: 4940,

    left: 4760,

    bottom: 5870,

    top: 5720

  },

  {

    right: 5138,

    left: 4958,

    bottom: 5870,

    top: 5720

  },

  {

    right: 5336,

    left: 5156,

    bottom: 5870,

    top: 5720

  },

  {

    right: 5534,

    left: 5354,

    bottom: 5870,

    top: 5720

  },

  {

    right: 5732,

    left: 5552,

    bottom: 5870,

    top: 5720

  },

  {

    right: 5930,

    left: 5750,

    bottom: 5870,

    top: 5720

  },

  {

    right: 6128,

    left: 5948,

    bottom: 5870,

    top: 5720

  },

  {

    right: 6326,

    left: 6146,

    bottom: 5870,

    top: 5720

  },

  {

    right: 6524,

    left: 6344,

    bottom: 5870,

    top: 5720

  },

  {

    right: 6722,

    left: 6542,

    bottom: 5870,

    top: 5720

  },

  {

    right: 6920,

    left: 6740,

    bottom: 5870,

    top: 5720

  },

  {

    right: 7118,

    left: 6938,

    bottom: 5870,

    top: 5720

  },

  {

    right: 7316,

    left: 7136,

    bottom: 5870,

    top: 5720

  },

  {

    right: 7514,

    left: 7334,

    bottom: 5870,

    top: 5720

  },

  {

    right: 7712,

    left: 7532,

    bottom: 5870,

    top: 5720

  },

  {

    right: 7910,

    left: 7730,

    bottom: 5870,

    top: 5720

  },

  {

    right: 8108,

    left: 7928,

    bottom: 5870,

    top: 5720

  },

  {

    right: 8306,

    left: 8126,

    bottom: 5870,

    top: 5720

  },

  {

    right: 8504,

    left: 8324,

    bottom: 5870,

    top: 5720

  },

  {

    right: 8702,

    left: 8522,

    bottom: 5870,

    top: 5720

  },

  {

    right: 8900,

    left: 8720,

    bottom: 5870,

    top: 5720

  },

  {

    right: 9098,

    left: 8918,

    bottom: 5870,

    top: 5720

  },

  {

    right: 9296,

    left: 9116,

    bottom: 5870,

    top: 5720

  },

  {

    right: 9494,

    left: 9314,

    bottom: 5870,

    top: 5720

  },

  {

    right: 9692,

    left: 9512,

    bottom: 5870,

    top: 5720

  },

  {

    right: 9890,

    left: 9710,

    bottom: 5870,

    top: 5720

  },

  {

    right: 188,

    left: 8,

    bottom: 6038,

    top: 5888

  },

  {

    right: 386,

    left: 206,

    bottom: 6038,

    top: 5888

  },

  {

    right: 584,

    left: 404,

    bottom: 6038,

    top: 5888

  },

  {

    right: 782,

    left: 602,

    bottom: 6038,

    top: 5888

  },

  {

    right: 980,

    left: 800,

    bottom: 6038,

    top: 5888

  },

  {

    right: 1178,

    left: 998,

    bottom: 6038,

    top: 5888

  },

  {

    right: 1376,

    left: 1196,

    bottom: 6038,

    top: 5888

  },

  {

    right: 1574,

    left: 1394,

    bottom: 6038,

    top: 5888

  },

  {

    right: 1772,

    left: 1592,

    bottom: 6038,

    top: 5888

  },

  {

    right: 1970,

    left: 1790,

    bottom: 6038,

    top: 5888

  },

  {

    right: 2168,

    left: 1988,

    bottom: 6038,

    top: 5888

  },

  {

    right: 2366,

    left: 2186,

    bottom: 6038,

    top: 5888

  },

  {

    right: 2564,

    left: 2384,

    bottom: 6038,

    top: 5888

  },

  {

    right: 2762,

    left: 2582,

    bottom: 6038,

    top: 5888

  },

  {

    right: 2960,

    left: 2780,

    bottom: 6038,

    top: 5888

  },

  {

    right: 3158,

    left: 2978,

    bottom: 6038,

    top: 5888

  },

  {

    right: 3356,

    left: 3176,

    bottom: 6038,

    top: 5888

  },

  {

    right: 3554,

    left: 3374,

    bottom: 6038,

    top: 5888

  },

  {

    right: 3752,

    left: 3572,

    bottom: 6038,

    top: 5888

  },

  {

    right: 3950,

    left: 3770,

    bottom: 6038,

    top: 5888

  },

  {

    right: 4148,

    left: 3968,

    bottom: 6038,

    top: 5888

  },

  {

    right: 4346,

    left: 4166,

    bottom: 6038,

    top: 5888

  },

  {

    right: 4544,

    left: 4364,

    bottom: 6038,

    top: 5888

  },

  {

    right: 4742,

    left: 4562,

    bottom: 6038,

    top: 5888

  },

  {

    right: 4940,

    left: 4760,

    bottom: 6038,

    top: 5888

  },

  {

    right: 5138,

    left: 4958,

    bottom: 6038,

    top: 5888

  },

  {

    right: 5336,

    left: 5156,

    bottom: 6038,

    top: 5888

  },

  {

    right: 5534,

    left: 5354,

    bottom: 6038,

    top: 5888

  },

  {

    right: 5732,

    left: 5552,

    bottom: 6038,

    top: 5888

  },

  {

    right: 5930,

    left: 5750,

    bottom: 6038,

    top: 5888

  },

  {

    right: 6128,

    left: 5948,

    bottom: 6038,

    top: 5888

  },

  {

    right: 6326,

    left: 6146,

    bottom: 6038,

    top: 5888

  },

  {

    right: 6524,

    left: 6344,

    bottom: 6038,

    top: 5888

  },

  {

    right: 6722,

    left: 6542,

    bottom: 6038,

    top: 5888

  },

  {

    right: 6920,

    left: 6740,

    bottom: 6038,

    top: 5888

  },

  {

    right: 7118,

    left: 6938,

    bottom: 6038,

    top: 5888

  },

  {

    right: 7316,

    left: 7136,

    bottom: 6038,

    top: 5888

  },

  {

    right: 7514,

    left: 7334,

    bottom: 6038,

    top: 5888

  },

  {

    right: 7712,

    left: 7532,

    bottom: 6038,

    top: 5888

  },

  {

    right: 7910,

    left: 7730,

    bottom: 6038,

    top: 5888

  },

  {

    right: 8108,

    left: 7928,

    bottom: 6038,

    top: 5888

  },

  {

    right: 8306,

    left: 8126,

    bottom: 6038,

    top: 5888

  },

  {

    right: 8504,

    left: 8324,

    bottom: 6038,

    top: 5888

  },

  {

    right: 8702,

    left: 8522,

    bottom: 6038,

    top: 5888

  },

  {

    right: 8900,

    left: 8720,

    bottom: 6038,

    top: 5888

  },

  {

    right: 9098,

    left: 8918,

    bottom: 6038,

    top: 5888

  },

  {

    right: 9296,

    left: 9116,

    bottom: 6038,

    top: 5888

  },

  {

    right: 9494,

    left: 9314,

    bottom: 6038,

    top: 5888

  },

  {

    right: 9692,

    left: 9512,

    bottom: 6038,

    top: 5888

  },

  {

    right: 9890,

    left: 9710,

    bottom: 6038,

    top: 5888

  },

  {

    right: 188,

    left: 8,

    bottom: 6206,

    top: 6056

  },

  {

    right: 386,

    left: 206,

    bottom: 6206,

    top: 6056

  },

  {

    right: 584,

    left: 404,

    bottom: 6206,

    top: 6056

  },

  {

    right: 782,

    left: 602,

    bottom: 6206,

    top: 6056

  },

  {

    right: 980,

    left: 800,

    bottom: 6206,

    top: 6056

  },

  {

    right: 1178,

    left: 998,

    bottom: 6206,

    top: 6056

  },

  {

    right: 1376,

    left: 1196,

    bottom: 6206,

    top: 6056

  },

  {

    right: 1574,

    left: 1394,

    bottom: 6206,

    top: 6056

  },

  {

    right: 1772,

    left: 1592,

    bottom: 6206,

    top: 6056

  },

  {

    right: 1970,

    left: 1790,

    bottom: 6206,

    top: 6056

  },

  {

    right: 2168,

    left: 1988,

    bottom: 6206,

    top: 6056

  },

  {

    right: 2366,

    left: 2186,

    bottom: 6206,

    top: 6056

  },

  {

    right: 2564,

    left: 2384,

    bottom: 6206,

    top: 6056

  },

  {

    right: 2762,

    left: 2582,

    bottom: 6206,

    top: 6056

  },

  {

    right: 2960,

    left: 2780,

    bottom: 6206,

    top: 6056

  },

  {

    right: 3158,

    left: 2978,

    bottom: 6206,

    top: 6056

  },

  {

    right: 3356,

    left: 3176,

    bottom: 6206,

    top: 6056

  },

  {

    right: 3554,

    left: 3374,

    bottom: 6206,

    top: 6056

  },

  {

    right: 3752,

    left: 3572,

    bottom: 6206,

    top: 6056

  },

  {

    right: 3950,

    left: 3770,

    bottom: 6206,

    top: 6056

  },

  {

    right: 4148,

    left: 3968,

    bottom: 6206,

    top: 6056

  },

  {

    right: 4346,

    left: 4166,

    bottom: 6206,

    top: 6056

  },

  {

    right: 4544,

    left: 4364,

    bottom: 6206,

    top: 6056

  },

  {

    right: 4742,

    left: 4562,

    bottom: 6206,

    top: 6056

  },

  {

    right: 4940,

    left: 4760,

    bottom: 6206,

    top: 6056

  },

  {

    right: 5138,

    left: 4958,

    bottom: 6206,

    top: 6056

  },

  {

    right: 5336,

    left: 5156,

    bottom: 6206,

    top: 6056

  },

  {

    right: 5534,

    left: 5354,

    bottom: 6206,

    top: 6056

  },

  {

    right: 5732,

    left: 5552,

    bottom: 6206,

    top: 6056

  },

  {

    right: 5930,

    left: 5750,

    bottom: 6206,

    top: 6056

  },

  {

    right: 6128,

    left: 5948,

    bottom: 6206,

    top: 6056

  },

  {

    right: 6326,

    left: 6146,

    bottom: 6206,

    top: 6056

  },

  {

    right: 6524,

    left: 6344,

    bottom: 6206,

    top: 6056

  },

  {

    right: 6722,

    left: 6542,

    bottom: 6206,

    top: 6056

  },

  {

    right: 6920,

    left: 6740,

    bottom: 6206,

    top: 6056

  },

  {

    right: 7118,

    left: 6938,

    bottom: 6206,

    top: 6056

  },

  {

    right: 7316,

    left: 7136,

    bottom: 6206,

    top: 6056

  },

  {

    right: 7514,

    left: 7334,

    bottom: 6206,

    top: 6056

  },

  {

    right: 7712,

    left: 7532,

    bottom: 6206,

    top: 6056

  },

  {

    right: 7910,

    left: 7730,

    bottom: 6206,

    top: 6056

  },

  {

    right: 8108,

    left: 7928,

    bottom: 6206,

    top: 6056

  },

  {

    right: 8306,

    left: 8126,

    bottom: 6206,

    top: 6056

  },

  {

    right: 8504,

    left: 8324,

    bottom: 6206,

    top: 6056

  },

  {

    right: 8702,

    left: 8522,

    bottom: 6206,

    top: 6056

  },

  {

    right: 8900,

    left: 8720,

    bottom: 6206,

    top: 6056

  },

  {

    right: 9098,

    left: 8918,

    bottom: 6206,

    top: 6056

  },

  {

    right: 9296,

    left: 9116,

    bottom: 6206,

    top: 6056

  },

  {

    right: 9494,

    left: 9314,

    bottom: 6206,

    top: 6056

  },

  {

    right: 9692,

    left: 9512,

    bottom: 6206,

    top: 6056

  },

  {

    right: 9890,

    left: 9710,

    bottom: 6206,

    top: 6056

  },

  {

    right: 188,

    left: 8,

    bottom: 6374,

    top: 6224

  },

  {

    right: 386,

    left: 206,

    bottom: 6374,

    top: 6224

  },

  {

    right: 584,

    left: 404,

    bottom: 6374,

    top: 6224

  },

  {

    right: 782,

    left: 602,

    bottom: 6374,

    top: 6224

  },

  {

    right: 980,

    left: 800,

    bottom: 6374,

    top: 6224

  },

  {

    right: 1178,

    left: 998,

    bottom: 6374,

    top: 6224

  },

  {

    right: 1376,

    left: 1196,

    bottom: 6374,

    top: 6224

  },

  {

    right: 1574,

    left: 1394,

    bottom: 6374,

    top: 6224

  },

  {

    right: 1772,

    left: 1592,

    bottom: 6374,

    top: 6224

  },

  {

    right: 1970,

    left: 1790,

    bottom: 6374,

    top: 6224

  },

  {

    right: 2168,

    left: 1988,

    bottom: 6374,

    top: 6224

  },

  {

    right: 2366,

    left: 2186,

    bottom: 6374,

    top: 6224

  },

  {

    right: 2564,

    left: 2384,

    bottom: 6374,

    top: 6224

  },

  {

    right: 2762,

    left: 2582,

    bottom: 6374,

    top: 6224

  },

  {

    right: 2960,

    left: 2780,

    bottom: 6374,

    top: 6224

  },

  {

    right: 3158,

    left: 2978,

    bottom: 6374,

    top: 6224

  },

  {

    right: 3356,

    left: 3176,

    bottom: 6374,

    top: 6224

  },

  {

    right: 3554,

    left: 3374,

    bottom: 6374,

    top: 6224

  },

  {

    right: 3752,

    left: 3572,

    bottom: 6374,

    top: 6224

  },

  {

    right: 3950,

    left: 3770,

    bottom: 6374,

    top: 6224

  },

  {

    right: 4148,

    left: 3968,

    bottom: 6374,

    top: 6224

  },

  {

    right: 4346,

    left: 4166,

    bottom: 6374,

    top: 6224

  },

  {

    right: 4544,

    left: 4364,

    bottom: 6374,

    top: 6224

  },

  {

    right: 4742,

    left: 4562,

    bottom: 6374,

    top: 6224

  },

  {

    right: 4940,

    left: 4760,

    bottom: 6374,

    top: 6224

  },

  {

    right: 5138,

    left: 4958,

    bottom: 6374,

    top: 6224

  },

  {

    right: 5336,

    left: 5156,

    bottom: 6374,

    top: 6224

  },

  {

    right: 5534,

    left: 5354,

    bottom: 6374,

    top: 6224

  },

  {

    right: 5732,

    left: 5552,

    bottom: 6374,

    top: 6224

  },

  {

    right: 5930,

    left: 5750,

    bottom: 6374,

    top: 6224

  },

  {

    right: 6128,

    left: 5948,

    bottom: 6374,

    top: 6224

  },

  {

    right: 6326,

    left: 6146,

    bottom: 6374,

    top: 6224

  },

  {

    right: 6524,

    left: 6344,

    bottom: 6374,

    top: 6224

  },

  {

    right: 6722,

    left: 6542,

    bottom: 6374,

    top: 6224

  },

  {

    right: 6920,

    left: 6740,

    bottom: 6374,

    top: 6224

  },

  {

    right: 7118,

    left: 6938,

    bottom: 6374,

    top: 6224

  },

  {

    right: 7316,

    left: 7136,

    bottom: 6374,

    top: 6224

  },

  {

    right: 7514,

    left: 7334,

    bottom: 6374,

    top: 6224

  },

  {

    right: 7712,

    left: 7532,

    bottom: 6374,

    top: 6224

  },

  {

    right: 7910,

    left: 7730,

    bottom: 6374,

    top: 6224

  },

  {

    right: 8108,

    left: 7928,

    bottom: 6374,

    top: 6224

  },

  {

    right: 8306,

    left: 8126,

    bottom: 6374,

    top: 6224

  },

  {

    right: 8504,

    left: 8324,

    bottom: 6374,

    top: 6224

  },

  {

    right: 8702,

    left: 8522,

    bottom: 6374,

    top: 6224

  },

  {

    right: 8900,

    left: 8720,

    bottom: 6374,

    top: 6224

  },

  {

    right: 9098,

    left: 8918,

    bottom: 6374,

    top: 6224

  },

  {

    right: 9296,

    left: 9116,

    bottom: 6374,

    top: 6224

  },

  {

    right: 9494,

    left: 9314,

    bottom: 6374,

    top: 6224

  },

  {

    right: 9692,

    left: 9512,

    bottom: 6374,

    top: 6224

  },

  {

    right: 9890,

    left: 9710,

    bottom: 6374,

    top: 6224

  },

  {

    right: 188,

    left: 8,

    bottom: 6542,

    top: 6392

  },

  {

    right: 386,

    left: 206,

    bottom: 6542,

    top: 6392

  },

  {

    right: 584,

    left: 404,

    bottom: 6542,

    top: 6392

  },

  {

    right: 782,

    left: 602,

    bottom: 6542,

    top: 6392

  },

  {

    right: 980,

    left: 800,

    bottom: 6542,

    top: 6392

  },

  {

    right: 1178,

    left: 998,

    bottom: 6542,

    top: 6392

  },

  {

    right: 1376,

    left: 1196,

    bottom: 6542,

    top: 6392

  },

  {

    right: 1574,

    left: 1394,

    bottom: 6542,

    top: 6392

  },

  {

    right: 1772,

    left: 1592,

    bottom: 6542,

    top: 6392

  },

  {

    right: 1970,

    left: 1790,

    bottom: 6542,

    top: 6392

  },

  {

    right: 2168,

    left: 1988,

    bottom: 6542,

    top: 6392

  },

  {

    right: 2366,

    left: 2186,

    bottom: 6542,

    top: 6392

  },

  {

    right: 2564,

    left: 2384,

    bottom: 6542,

    top: 6392

  },

  {

    right: 2762,

    left: 2582,

    bottom: 6542,

    top: 6392

  },

  {

    right: 2960,

    left: 2780,

    bottom: 6542,

    top: 6392

  },

  {

    right: 3158,

    left: 2978,

    bottom: 6542,

    top: 6392

  },

  {

    right: 3356,

    left: 3176,

    bottom: 6542,

    top: 6392

  },

  {

    right: 3554,

    left: 3374,

    bottom: 6542,

    top: 6392

  },

  {

    right: 3752,

    left: 3572,

    bottom: 6542,

    top: 6392

  },

  {

    right: 3950,

    left: 3770,

    bottom: 6542,

    top: 6392

  },

  {

    right: 4148,

    left: 3968,

    bottom: 6542,

    top: 6392

  },

  {

    right: 4346,

    left: 4166,

    bottom: 6542,

    top: 6392

  },

  {

    right: 4544,

    left: 4364,

    bottom: 6542,

    top: 6392

  },

  {

    right: 4742,

    left: 4562,

    bottom: 6542,

    top: 6392

  },

  {

    right: 4940,

    left: 4760,

    bottom: 6542,

    top: 6392

  },

  {

    right: 5138,

    left: 4958,

    bottom: 6542,

    top: 6392

  },

  {

    right: 5336,

    left: 5156,

    bottom: 6542,

    top: 6392

  },

  {

    right: 5534,

    left: 5354,

    bottom: 6542,

    top: 6392

  },

  {

    right: 5732,

    left: 5552,

    bottom: 6542,

    top: 6392

  },

  {

    right: 5930,

    left: 5750,

    bottom: 6542,

    top: 6392

  },

  {

    right: 6128,

    left: 5948,

    bottom: 6542,

    top: 6392

  },

  {

    right: 6326,

    left: 6146,

    bottom: 6542,

    top: 6392

  },

  {

    right: 6524,

    left: 6344,

    bottom: 6542,

    top: 6392

  },

  {

    right: 6722,

    left: 6542,

    bottom: 6542,

    top: 6392

  },

  {

    right: 6920,

    left: 6740,

    bottom: 6542,

    top: 6392

  },

  {

    right: 7118,

    left: 6938,

    bottom: 6542,

    top: 6392

  },

  {

    right: 7316,

    left: 7136,

    bottom: 6542,

    top: 6392

  },

  {

    right: 7514,

    left: 7334,

    bottom: 6542,

    top: 6392

  },

  {

    right: 7712,

    left: 7532,

    bottom: 6542,

    top: 6392

  },

  {

    right: 7910,

    left: 7730,

    bottom: 6542,

    top: 6392

  },

  {

    right: 8108,

    left: 7928,

    bottom: 6542,

    top: 6392

  },

  {

    right: 8306,

    left: 8126,

    bottom: 6542,

    top: 6392

  },

  {

    right: 8504,

    left: 8324,

    bottom: 6542,

    top: 6392

  },

  {

    right: 8702,

    left: 8522,

    bottom: 6542,

    top: 6392

  },

  {

    right: 8900,

    left: 8720,

    bottom: 6542,

    top: 6392

  },

  {

    right: 9098,

    left: 8918,

    bottom: 6542,

    top: 6392

  },

  {

    right: 9296,

    left: 9116,

    bottom: 6542,

    top: 6392

  },

  {

    right: 9494,

    left: 9314,

    bottom: 6542,

    top: 6392

  },

  {

    right: 9692,

    left: 9512,

    bottom: 6542,

    top: 6392

  },

  {

    right: 9890,

    left: 9710,

    bottom: 6542,

    top: 6392

  },

  {

    right: 188,

    left: 8,

    bottom: 6710,

    top: 6560

  },

  {

    right: 386,

    left: 206,

    bottom: 6710,

    top: 6560

  },

  {

    right: 584,

    left: 404,

    bottom: 6710,

    top: 6560

  },

  {

    right: 782,

    left: 602,

    bottom: 6710,

    top: 6560

  },

  {

    right: 980,

    left: 800,

    bottom: 6710,

    top: 6560

  },

  {

    right: 1178,

    left: 998,

    bottom: 6710,

    top: 6560

  },

  {

    right: 1376,

    left: 1196,

    bottom: 6710,

    top: 6560

  },

  {

    right: 1574,

    left: 1394,

    bottom: 6710,

    top: 6560

  },

  {

    right: 1772,

    left: 1592,

    bottom: 6710,

    top: 6560

  },

  {

    right: 1970,

    left: 1790,

    bottom: 6710,

    top: 6560

  },

  {

    right: 2168,

    left: 1988,

    bottom: 6710,

    top: 6560

  },

  {

    right: 2366,

    left: 2186,

    bottom: 6710,

    top: 6560

  },

  {

    right: 2564,

    left: 2384,

    bottom: 6710,

    top: 6560

  },

  {

    right: 2762,

    left: 2582,

    bottom: 6710,

    top: 6560

  },

  {

    right: 2960,

    left: 2780,

    bottom: 6710,

    top: 6560

  },

  {

    right: 3158,

    left: 2978,

    bottom: 6710,

    top: 6560

  },

  {

    right: 3356,

    left: 3176,

    bottom: 6710,

    top: 6560

  },

  {

    right: 3554,

    left: 3374,

    bottom: 6710,

    top: 6560

  },

  {

    right: 3752,

    left: 3572,

    bottom: 6710,

    top: 6560

  },

  {

    right: 3950,

    left: 3770,

    bottom: 6710,

    top: 6560

  },

  {

    right: 4148,

    left: 3968,

    bottom: 6710,

    top: 6560

  },

  {

    right: 4346,

    left: 4166,

    bottom: 6710,

    top: 6560

  },

  {

    right: 4544,

    left: 4364,

    bottom: 6710,

    top: 6560

  },

  {

    right: 4742,

    left: 4562,

    bottom: 6710,

    top: 6560

  },

  {

    right: 4940,

    left: 4760,

    bottom: 6710,

    top: 6560

  },

  {

    right: 5138,

    left: 4958,

    bottom: 6710,

    top: 6560

  },

  {

    right: 5336,

    left: 5156,

    bottom: 6710,

    top: 6560

  },

  {

    right: 5534,

    left: 5354,

    bottom: 6710,

    top: 6560

  },

  {

    right: 5732,

    left: 5552,

    bottom: 6710,

    top: 6560

  },

  {

    right: 5930,

    left: 5750,

    bottom: 6710,

    top: 6560

  },

  {

    right: 6128,

    left: 5948,

    bottom: 6710,

    top: 6560

  },

  {

    right: 6326,

    left: 6146,

    bottom: 6710,

    top: 6560

  },

  {

    right: 6524,

    left: 6344,

    bottom: 6710,

    top: 6560

  },

  {

    right: 6722,

    left: 6542,

    bottom: 6710,

    top: 6560

  },

  {

    right: 6920,

    left: 6740,

    bottom: 6710,

    top: 6560

  },

  {

    right: 7118,

    left: 6938,

    bottom: 6710,

    top: 6560

  },

  {

    right: 7316,

    left: 7136,

    bottom: 6710,

    top: 6560

  },

  {

    right: 7514,

    left: 7334,

    bottom: 6710,

    top: 6560

  },

  {

    right: 7712,

    left: 7532,

    bottom: 6710,

    top: 6560

  },

  {

    right: 7910,

    left: 7730,

    bottom: 6710,

    top: 6560

  },

  {

    right: 8108,

    left: 7928,

    bottom: 6710,

    top: 6560

  },

  {

    right: 8306,

    left: 8126,

    bottom: 6710,

    top: 6560

  },

  {

    right: 8504,

    left: 8324,

    bottom: 6710,

    top: 6560

  },

  {

    right: 8702,

    left: 8522,

    bottom: 6710,

    top: 6560

  },

  {

    right: 8900,

    left: 8720,

    bottom: 6710,

    top: 6560

  },

  {

    right: 9098,

    left: 8918,

    bottom: 6710,

    top: 6560

  },

  {

    right: 9296,

    left: 9116,

    bottom: 6710,

    top: 6560

  },

  {

    right: 9494,

    left: 9314,

    bottom: 6710,

    top: 6560

  },

  {

    right: 9692,

    left: 9512,

    bottom: 6710,

    top: 6560

  },

  {

    right: 9890,

    left: 9710,

    bottom: 6710,

    top: 6560

  },

  {

    right: 188,

    left: 8,

    bottom: 6878,

    top: 6728

  },

  {

    right: 386,

    left: 206,

    bottom: 6878,

    top: 6728

  },

  {

    right: 584,

    left: 404,

    bottom: 6878,

    top: 6728

  },

  {

    right: 782,

    left: 602,

    bottom: 6878,

    top: 6728

  },

  {

    right: 980,

    left: 800,

    bottom: 6878,

    top: 6728

  },

  {

    right: 1178,

    left: 998,

    bottom: 6878,

    top: 6728

  },

  {

    right: 1376,

    left: 1196,

    bottom: 6878,

    top: 6728

  },

  {

    right: 1574,

    left: 1394,

    bottom: 6878,

    top: 6728

  },

  {

    right: 1772,

    left: 1592,

    bottom: 6878,

    top: 6728

  },

  {

    right: 1970,

    left: 1790,

    bottom: 6878,

    top: 6728

  },

  {

    right: 2168,

    left: 1988,

    bottom: 6878,

    top: 6728

  },

  {

    right: 2366,

    left: 2186,

    bottom: 6878,

    top: 6728

  },

  {

    right: 2564,

    left: 2384,

    bottom: 6878,

    top: 6728

  },

  {

    right: 2762,

    left: 2582,

    bottom: 6878,

    top: 6728

  },

  {

    right: 2960,

    left: 2780,

    bottom: 6878,

    top: 6728

  },

  {

    right: 3158,

    left: 2978,

    bottom: 6878,

    top: 6728

  },

  {

    right: 3356,

    left: 3176,

    bottom: 6878,

    top: 6728

  },

  {

    right: 3554,

    left: 3374,

    bottom: 6878,

    top: 6728

  },

  {

    right: 3752,

    left: 3572,

    bottom: 6878,

    top: 6728

  },

  {

    right: 3950,

    left: 3770,

    bottom: 6878,

    top: 6728

  },

  {

    right: 4148,

    left: 3968,

    bottom: 6878,

    top: 6728

  },

  {

    right: 4346,

    left: 4166,

    bottom: 6878,

    top: 6728

  },

  {

    right: 4544,

    left: 4364,

    bottom: 6878,

    top: 6728

  },

  {

    right: 4742,

    left: 4562,

    bottom: 6878,

    top: 6728

  },

  {

    right: 4940,

    left: 4760,

    bottom: 6878,

    top: 6728

  },

  {

    right: 5138,

    left: 4958,

    bottom: 6878,

    top: 6728

  },

  {

    right: 5336,

    left: 5156,

    bottom: 6878,

    top: 6728

  },

  {

    right: 5534,

    left: 5354,

    bottom: 6878,

    top: 6728

  },

  {

    right: 5732,

    left: 5552,

    bottom: 6878,

    top: 6728

  },

  {

    right: 5930,

    left: 5750,

    bottom: 6878,

    top: 6728

  },

  {

    right: 6128,

    left: 5948,

    bottom: 6878,

    top: 6728

  },

  {

    right: 6326,

    left: 6146,

    bottom: 6878,

    top: 6728

  },

  {

    right: 6524,

    left: 6344,

    bottom: 6878,

    top: 6728

  },

  {

    right: 6722,

    left: 6542,

    bottom: 6878,

    top: 6728

  },

  {

    right: 6920,

    left: 6740,

    bottom: 6878,

    top: 6728

  },

  {

    right: 7118,

    left: 6938,

    bottom: 6878,

    top: 6728

  },

  {

    right: 7316,

    left: 7136,

    bottom: 6878,

    top: 6728

  },

  {

    right: 7514,

    left: 7334,

    bottom: 6878,

    top: 6728

  },

  {

    right: 7712,

    left: 7532,

    bottom: 6878,

    top: 6728

  },

  {

    right: 7910,

    left: 7730,

    bottom: 6878,

    top: 6728

  },

  {

    right: 8108,

    left: 7928,

    bottom: 6878,

    top: 6728

  },

  {

    right: 8306,

    left: 8126,

    bottom: 6878,

    top: 6728

  },

  {

    right: 8504,

    left: 8324,

    bottom: 6878,

    top: 6728

  },

  {

    right: 8702,

    left: 8522,

    bottom: 6878,

    top: 6728

  },

  {

    right: 8900,

    left: 8720,

    bottom: 6878,

    top: 6728

  },

  {

    right: 9098,

    left: 8918,

    bottom: 6878,

    top: 6728

  },

  {

    right: 9296,

    left: 9116,

    bottom: 6878,

    top: 6728

  },

  {

    right: 9494,

    left: 9314,

    bottom: 6878,

    top: 6728

  },

  {

    right: 9692,

    left: 9512,

    bottom: 6878,

    top: 6728

  },

  {

    right: 9890,

    left: 9710,

    bottom: 6878,

    top: 6728

  },

  {

    right: 188,

    left: 8,

    bottom: 7046,

    top: 6896

  },

  {

    right: 386,

    left: 206,

    bottom: 7046,

    top: 6896

  },

  {

    right: 584,

    left: 404,

    bottom: 7046,

    top: 6896

  },

  {

    right: 782,

    left: 602,

    bottom: 7046,

    top: 6896

  },

  {

    right: 980,

    left: 800,

    bottom: 7046,

    top: 6896

  },

  {

    right: 1178,

    left: 998,

    bottom: 7046,

    top: 6896

  },

  {

    right: 1376,

    left: 1196,

    bottom: 7046,

    top: 6896

  },

  {

    right: 1574,

    left: 1394,

    bottom: 7046,

    top: 6896

  },

  {

    right: 1772,

    left: 1592,

    bottom: 7046,

    top: 6896

  },

  {

    right: 1970,

    left: 1790,

    bottom: 7046,

    top: 6896

  },

  {

    right: 2168,

    left: 1988,

    bottom: 7046,

    top: 6896

  },

  {

    right: 2366,

    left: 2186,

    bottom: 7046,

    top: 6896

  },

  {

    right: 2564,

    left: 2384,

    bottom: 7046,

    top: 6896

  },

  {

    right: 2762,

    left: 2582,

    bottom: 7046,

    top: 6896

  },

  {

    right: 2960,

    left: 2780,

    bottom: 7046,

    top: 6896

  },

  {

    right: 3158,

    left: 2978,

    bottom: 7046,

    top: 6896

  },

  {

    right: 3356,

    left: 3176,

    bottom: 7046,

    top: 6896

  },

  {

    right: 3554,

    left: 3374,

    bottom: 7046,

    top: 6896

  },

  {

    right: 3752,

    left: 3572,

    bottom: 7046,

    top: 6896

  },

  {

    right: 3950,

    left: 3770,

    bottom: 7046,

    top: 6896

  },

  {

    right: 4148,

    left: 3968,

    bottom: 7046,

    top: 6896

  },

  {

    right: 4346,

    left: 4166,

    bottom: 7046,

    top: 6896

  },

  {

    right: 4544,

    left: 4364,

    bottom: 7046,

    top: 6896

  },

  {

    right: 4742,

    left: 4562,

    bottom: 7046,

    top: 6896

  },

  {

    right: 4940,

    left: 4760,

    bottom: 7046,

    top: 6896

  },

  {

    right: 5138,

    left: 4958,

    bottom: 7046,

    top: 6896

  },

  {

    right: 5336,

    left: 5156,

    bottom: 7046,

    top: 6896

  },

  {

    right: 5534,

    left: 5354,

    bottom: 7046,

    top: 6896

  },

  {

    right: 5732,

    left: 5552,

    bottom: 7046,

    top: 6896

  },

  {

    right: 5930,

    left: 5750,

    bottom: 7046,

    top: 6896

  },

  {

    right: 6128,

    left: 5948,

    bottom: 7046,

    top: 6896

  },

  {

    right: 6326,

    left: 6146,

    bottom: 7046,

    top: 6896

  },

  {

    right: 6524,

    left: 6344,

    bottom: 7046,

    top: 6896

  },

  {

    right: 6722,

    left: 6542,

    bottom: 7046,

    top: 6896

  },

  {

    right: 6920,

    left: 6740,

    bottom: 7046,

    top: 6896

  },

  {

    right: 7118,

    left: 6938,

    bottom: 7046,

    top: 6896

  },

  {

    right: 7316,

    left: 7136,

    bottom: 7046,

    top: 6896

  },

  {

    right: 7514,

    left: 7334,

    bottom: 7046,

    top: 6896

  },

  {

    right: 7712,

    left: 7532,

    bottom: 7046,

    top: 6896

  },

  {

    right: 7910,

    left: 7730,

    bottom: 7046,

    top: 6896

  },

  {

    right: 8108,

    left: 7928,

    bottom: 7046,

    top: 6896

  },

  {

    right: 8306,

    left: 8126,

    bottom: 7046,

    top: 6896

  },

  {

    right: 8504,

    left: 8324,

    bottom: 7046,

    top: 6896

  },

  {

    right: 8702,

    left: 8522,

    bottom: 7046,

    top: 6896

  },

  {

    right: 8900,

    left: 8720,

    bottom: 7046,

    top: 6896

  },

  {

    right: 9098,

    left: 8918,

    bottom: 7046,

    top: 6896

  },

  {

    right: 9296,

    left: 9116,

    bottom: 7046,

    top: 6896

  },

  {

    right: 9494,

    left: 9314,

    bottom: 7046,

    top: 6896

  },

  {

    right: 9692,

    left: 9512,

    bottom: 7046,

    top: 6896

  },

  {

    right: 9890,

    left: 9710,

    bottom: 7046,

    top: 6896

  },

  {

    right: 188,

    left: 8,

    bottom: 7214,

    top: 7064

  },

  {

    right: 386,

    left: 206,

    bottom: 7214,

    top: 7064

  },

  {

    right: 584,

    left: 404,

    bottom: 7214,

    top: 7064

  },

  {

    right: 782,

    left: 602,

    bottom: 7214,

    top: 7064

  },

  {

    right: 980,

    left: 800,

    bottom: 7214,

    top: 7064

  },

  {

    right: 1178,

    left: 998,

    bottom: 7214,

    top: 7064

  },

  {

    right: 1376,

    left: 1196,

    bottom: 7214,

    top: 7064

  },

  {

    right: 1574,

    left: 1394,

    bottom: 7214,

    top: 7064

  },

  {

    right: 1772,

    left: 1592,

    bottom: 7214,

    top: 7064

  },

  {

    right: 1970,

    left: 1790,

    bottom: 7214,

    top: 7064

  },

  {

    right: 2168,

    left: 1988,

    bottom: 7214,

    top: 7064

  },

  {

    right: 2366,

    left: 2186,

    bottom: 7214,

    top: 7064

  },

  {

    right: 2564,

    left: 2384,

    bottom: 7214,

    top: 7064

  },

  {

    right: 2762,

    left: 2582,

    bottom: 7214,

    top: 7064

  },

  {

    right: 2960,

    left: 2780,

    bottom: 7214,

    top: 7064

  },

  {

    right: 3158,

    left: 2978,

    bottom: 7214,

    top: 7064

  },

  {

    right: 3356,

    left: 3176,

    bottom: 7214,

    top: 7064

  },

  {

    right: 3554,

    left: 3374,

    bottom: 7214,

    top: 7064

  },

  {

    right: 3752,

    left: 3572,

    bottom: 7214,

    top: 7064

  },

  {

    right: 3950,

    left: 3770,

    bottom: 7214,

    top: 7064

  },

  {

    right: 4148,

    left: 3968,

    bottom: 7214,

    top: 7064

  },

  {

    right: 4346,

    left: 4166,

    bottom: 7214,

    top: 7064

  },

  {

    right: 4544,

    left: 4364,

    bottom: 7214,

    top: 7064

  },

  {

    right: 4742,

    left: 4562,

    bottom: 7214,

    top: 7064

  },

  {

    right: 4940,

    left: 4760,

    bottom: 7214,

    top: 7064

  },

  {

    right: 5138,

    left: 4958,

    bottom: 7214,

    top: 7064

  },

  {

    right: 5336,

    left: 5156,

    bottom: 7214,

    top: 7064

  },

  {

    right: 5534,

    left: 5354,

    bottom: 7214,

    top: 7064

  },

  {

    right: 5732,

    left: 5552,

    bottom: 7214,

    top: 7064

  },

  {

    right: 5930,

    left: 5750,

    bottom: 7214,

    top: 7064

  },

  {

    right: 6128,

    left: 5948,

    bottom: 7214,

    top: 7064

  },

  {

    right: 6326,

    left: 6146,

    bottom: 7214,

    top: 7064

  },

  {

    right: 6524,

    left: 6344,

    bottom: 7214,

    top: 7064

  },

  {

    right: 6722,

    left: 6542,

    bottom: 7214,

    top: 7064

  },

  {

    right: 6920,

    left: 6740,

    bottom: 7214,

    top: 7064

  },

  {

    right: 7118,

    left: 6938,

    bottom: 7214,

    top: 7064

  },

  {

    right: 7316,

    left: 7136,

    bottom: 7214,

    top: 7064

  },

  {

    right: 7514,

    left: 7334,

    bottom: 7214,

    top: 7064

  },

  {

    right: 7712,

    left: 7532,

    bottom: 7214,

    top: 7064

  },

  {

    right: 7910,

    left: 7730,

    bottom: 7214,

    top: 7064

  },

  {

    right: 8108,

    left: 7928,

    bottom: 7214,

    top: 7064

  },

  {

    right: 8306,

    left: 8126,

    bottom: 7214,

    top: 7064

  },

  {

    right: 8504,

    left: 8324,

    bottom: 7214,

    top: 7064

  },

  {

    right: 8702,

    left: 8522,

    bottom: 7214,

    top: 7064

  },

  {

    right: 8900,

    left: 8720,

    bottom: 7214,

    top: 7064

  },

  {

    right: 9098,

    left: 8918,

    bottom: 7214,

    top: 7064

  },

  {

    right: 9296,

    left: 9116,

    bottom: 7214,

    top: 7064

  },

  {

    right: 9494,

    left: 9314,

    bottom: 7214,

    top: 7064

  },

  {

    right: 9692,

    left: 9512,

    bottom: 7214,

    top: 7064

  },

  {

    right: 9890,

    left: 9710,

    bottom: 7214,

    top: 7064

  },

  {

    right: 188,

    left: 8,

    bottom: 7382,

    top: 7232

  },

  {

    right: 386,

    left: 206,

    bottom: 7382,

    top: 7232

  },

  {

    right: 584,

    left: 404,

    bottom: 7382,

    top: 7232

  },

  {

    right: 782,

    left: 602,

    bottom: 7382,

    top: 7232

  },

  {

    right: 980,

    left: 800,

    bottom: 7382,

    top: 7232

  },

  {

    right: 1178,

    left: 998,

    bottom: 7382,

    top: 7232

  },

  {

    right: 1376,

    left: 1196,

    bottom: 7382,

    top: 7232

  },

  {

    right: 1574,

    left: 1394,

    bottom: 7382,

    top: 7232

  },

  {

    right: 1772,

    left: 1592,

    bottom: 7382,

    top: 7232

  },

  {

    right: 1970,

    left: 1790,

    bottom: 7382,

    top: 7232

  },

  {

    right: 2168,

    left: 1988,

    bottom: 7382,

    top: 7232

  },

  {

    right: 2366,

    left: 2186,

    bottom: 7382,

    top: 7232

  },

  {

    right: 2564,

    left: 2384,

    bottom: 7382,

    top: 7232

  },

  {

    right: 2762,

    left: 2582,

    bottom: 7382,

    top: 7232

  },

  {

    right: 2960,

    left: 2780,

    bottom: 7382,

    top: 7232

  },

  {

    right: 3158,

    left: 2978,

    bottom: 7382,

    top: 7232

  },

  {

    right: 3356,

    left: 3176,

    bottom: 7382,

    top: 7232

  },

  {

    right: 3554,

    left: 3374,

    bottom: 7382,

    top: 7232

  },

  {

    right: 3752,

    left: 3572,

    bottom: 7382,

    top: 7232

  },

  {

    right: 3950,

    left: 3770,

    bottom: 7382,

    top: 7232

  },

  {

    right: 4148,

    left: 3968,

    bottom: 7382,

    top: 7232

  },

  {

    right: 4346,

    left: 4166,

    bottom: 7382,

    top: 7232

  },

  {

    right: 4544,

    left: 4364,

    bottom: 7382,

    top: 7232

  },

  {

    right: 4742,

    left: 4562,

    bottom: 7382,

    top: 7232

  },

  {

    right: 4940,

    left: 4760,

    bottom: 7382,

    top: 7232

  },

  {

    right: 5138,

    left: 4958,

    bottom: 7382,

    top: 7232

  },

  {

    right: 5336,

    left: 5156,

    bottom: 7382,

    top: 7232

  },

  {

    right: 5534,

    left: 5354,

    bottom: 7382,

    top: 7232

  },

  {

    right: 5732,

    left: 5552,

    bottom: 7382,

    top: 7232

  },

  {

    right: 5930,

    left: 5750,

    bottom: 7382,

    top: 7232

  },

  {

    right: 6128,

    left: 5948,

    bottom: 7382,

    top: 7232

  },

  {

    right: 6326,

    left: 6146,

    bottom: 7382,

    top: 7232

  },

  {

    right: 6524,

    left: 6344,

    bottom: 7382,

    top: 7232

  },

  {

    right: 6722,

    left: 6542,

    bottom: 7382,

    top: 7232

  },

  {

    right: 6920,

    left: 6740,

    bottom: 7382,

    top: 7232

  },

  {

    right: 7118,

    left: 6938,

    bottom: 7382,

    top: 7232

  },

  {

    right: 7316,

    left: 7136,

    bottom: 7382,

    top: 7232

  },

  {

    right: 7514,

    left: 7334,

    bottom: 7382,

    top: 7232

  },

  {

    right: 7712,

    left: 7532,

    bottom: 7382,

    top: 7232

  },

  {

    right: 7910,

    left: 7730,

    bottom: 7382,

    top: 7232

  },

  {

    right: 8108,

    left: 7928,

    bottom: 7382,

    top: 7232

  },

  {

    right: 8306,

    left: 8126,

    bottom: 7382,

    top: 7232

  },

  {

    right: 8504,

    left: 8324,

    bottom: 7382,

    top: 7232

  },

  {

    right: 8702,

    left: 8522,

    bottom: 7382,

    top: 7232

  },

  {

    right: 8900,

    left: 8720,

    bottom: 7382,

    top: 7232

  },

  {

    right: 9098,

    left: 8918,

    bottom: 7382,

    top: 7232

  },

  {

    right: 9296,

    left: 9116,

    bottom: 7382,

    top: 7232

  },

  {

    right: 9494,

    left: 9314,

    bottom: 7382,

    top: 7232

  },

  {

    right: 9692,

    left: 9512,

    bottom: 7382,

    top: 7232

  },

  {

    right: 9890,

    left: 9710,

    bottom: 7382,

    top: 7232

  },

  {

    right: 188,

    left: 8,

    bottom: 7550,

    top: 7400

  },

  {

    right: 386,

    left: 206,

    bottom: 7550,

    top: 7400

  },

  {

    right: 584,

    left: 404,

    bottom: 7550,

    top: 7400

  },

  {

    right: 782,

    left: 602,

    bottom: 7550,

    top: 7400

  },

  {

    right: 980,

    left: 800,

    bottom: 7550,

    top: 7400

  },

  {

    right: 1178,

    left: 998,

    bottom: 7550,

    top: 7400

  },

  {

    right: 1376,

    left: 1196,

    bottom: 7550,

    top: 7400

  },

  {

    right: 1574,

    left: 1394,

    bottom: 7550,

    top: 7400

  },

  {

    right: 1772,

    left: 1592,

    bottom: 7550,

    top: 7400

  },

  {

    right: 1970,

    left: 1790,

    bottom: 7550,

    top: 7400

  },

  {

    right: 2168,

    left: 1988,

    bottom: 7550,

    top: 7400

  },

  {

    right: 2366,

    left: 2186,

    bottom: 7550,

    top: 7400

  },

  {

    right: 2564,

    left: 2384,

    bottom: 7550,

    top: 7400

  },

  {

    right: 2762,

    left: 2582,

    bottom: 7550,

    top: 7400

  },

  {

    right: 2960,

    left: 2780,

    bottom: 7550,

    top: 7400

  },

  {

    right: 3158,

    left: 2978,

    bottom: 7550,

    top: 7400

  },

  {

    right: 3356,

    left: 3176,

    bottom: 7550,

    top: 7400

  },

  {

    right: 3554,

    left: 3374,

    bottom: 7550,

    top: 7400

  },

  {

    right: 3752,

    left: 3572,

    bottom: 7550,

    top: 7400

  },

  {

    right: 3950,

    left: 3770,

    bottom: 7550,

    top: 7400

  },

  {

    right: 4148,

    left: 3968,

    bottom: 7550,

    top: 7400

  },

  {

    right: 4346,

    left: 4166,

    bottom: 7550,

    top: 7400

  },

  {

    right: 4544,

    left: 4364,

    bottom: 7550,

    top: 7400

  },

  {

    right: 4742,

    left: 4562,

    bottom: 7550,

    top: 7400

  },

  {

    right: 4940,

    left: 4760,

    bottom: 7550,

    top: 7400

  },

  {

    right: 5138,

    left: 4958,

    bottom: 7550,

    top: 7400

  },

  {

    right: 5336,

    left: 5156,

    bottom: 7550,

    top: 7400

  },

  {

    right: 5534,

    left: 5354,

    bottom: 7550,

    top: 7400

  },

  {

    right: 5732,

    left: 5552,

    bottom: 7550,

    top: 7400

  },

  {

    right: 5930,

    left: 5750,

    bottom: 7550,

    top: 7400

  },

  {

    right: 6128,

    left: 5948,

    bottom: 7550,

    top: 7400

  },

  {

    right: 6326,

    left: 6146,

    bottom: 7550,

    top: 7400

  },

  {

    right: 6524,

    left: 6344,

    bottom: 7550,

    top: 7400

  },

  {

    right: 6722,

    left: 6542,

    bottom: 7550,

    top: 7400

  },

  {

    right: 6920,

    left: 6740,

    bottom: 7550,

    top: 7400

  },

  {

    right: 7118,

    left: 6938,

    bottom: 7550,

    top: 7400

  },

  {

    right: 7316,

    left: 7136,

    bottom: 7550,

    top: 7400

  },

  {

    right: 7514,

    left: 7334,

    bottom: 7550,

    top: 7400

  },

  {

    right: 7712,

    left: 7532,

    bottom: 7550,

    top: 7400

  },

  {

    right: 7910,

    left: 7730,

    bottom: 7550,

    top: 7400

  },

  {

    right: 8108,

    left: 7928,

    bottom: 7550,

    top: 7400

  },

  {

    right: 8306,

    left: 8126,

    bottom: 7550,

    top: 7400

  },

  {

    right: 8504,

    left: 8324,

    bottom: 7550,

    top: 7400

  },

  {

    right: 8702,

    left: 8522,

    bottom: 7550,

    top: 7400

  },

  {

    right: 8900,

    left: 8720,

    bottom: 7550,

    top: 7400

  },

  {

    right: 9098,

    left: 8918,

    bottom: 7550,

    top: 7400

  },

  {

    right: 9296,

    left: 9116,

    bottom: 7550,

    top: 7400

  },

  {

    right: 9494,

    left: 9314,

    bottom: 7550,

    top: 7400

  },

  {

    right: 9692,

    left: 9512,

    bottom: 7550,

    top: 7400

  },

  {

    right: 9890,

    left: 9710,

    bottom: 7550,

    top: 7400

  },

  {

    right: 188,

    left: 8,

    bottom: 7718,

    top: 7568

  },

  {

    right: 386,

    left: 206,

    bottom: 7718,

    top: 7568

  },

  {

    right: 584,

    left: 404,

    bottom: 7718,

    top: 7568

  },

  {

    right: 782,

    left: 602,

    bottom: 7718,

    top: 7568

  },

  {

    right: 980,

    left: 800,

    bottom: 7718,

    top: 7568

  },

  {

    right: 1178,

    left: 998,

    bottom: 7718,

    top: 7568

  },

  {

    right: 1376,

    left: 1196,

    bottom: 7718,

    top: 7568

  },

  {

    right: 1574,

    left: 1394,

    bottom: 7718,

    top: 7568

  },

  {

    right: 1772,

    left: 1592,

    bottom: 7718,

    top: 7568

  },

  {

    right: 1970,

    left: 1790,

    bottom: 7718,

    top: 7568

  },

  {

    right: 2168,

    left: 1988,

    bottom: 7718,

    top: 7568

  },

  {

    right: 2366,

    left: 2186,

    bottom: 7718,

    top: 7568

  },

  {

    right: 2564,

    left: 2384,

    bottom: 7718,

    top: 7568

  },

  {

    right: 2762,

    left: 2582,

    bottom: 7718,

    top: 7568

  },

  {

    right: 2960,

    left: 2780,

    bottom: 7718,

    top: 7568

  },

  {

    right: 3158,

    left: 2978,

    bottom: 7718,

    top: 7568

  },

  {

    right: 3356,

    left: 3176,

    bottom: 7718,

    top: 7568

  },

  {

    right: 3554,

    left: 3374,

    bottom: 7718,

    top: 7568

  },

  {

    right: 3752,

    left: 3572,

    bottom: 7718,

    top: 7568

  },

  {

    right: 3950,

    left: 3770,

    bottom: 7718,

    top: 7568

  },

  {

    right: 4148,

    left: 3968,

    bottom: 7718,

    top: 7568

  },

  {

    right: 4346,

    left: 4166,

    bottom: 7718,

    top: 7568

  },

  {

    right: 4544,

    left: 4364,

    bottom: 7718,

    top: 7568

  },

  {

    right: 4742,

    left: 4562,

    bottom: 7718,

    top: 7568

  },

  {

    right: 4940,

    left: 4760,

    bottom: 7718,

    top: 7568

  },

  {

    right: 5138,

    left: 4958,

    bottom: 7718,

    top: 7568

  },

  {

    right: 5336,

    left: 5156,

    bottom: 7718,

    top: 7568

  },

  {

    right: 5534,

    left: 5354,

    bottom: 7718,

    top: 7568

  },

  {

    right: 5732,

    left: 5552,

    bottom: 7718,

    top: 7568

  },

  {

    right: 5930,

    left: 5750,

    bottom: 7718,

    top: 7568

  },

  {

    right: 6128,

    left: 5948,

    bottom: 7718,

    top: 7568

  },

  {

    right: 6326,

    left: 6146,

    bottom: 7718,

    top: 7568

  },

  {

    right: 6524,

    left: 6344,

    bottom: 7718,

    top: 7568

  },

  {

    right: 6722,

    left: 6542,

    bottom: 7718,

    top: 7568

  },

  {

    right: 6920,

    left: 6740,

    bottom: 7718,

    top: 7568

  },

  {

    right: 7118,

    left: 6938,

    bottom: 7718,

    top: 7568

  },

  {

    right: 7316,

    left: 7136,

    bottom: 7718,

    top: 7568

  },

  {

    right: 7514,

    left: 7334,

    bottom: 7718,

    top: 7568

  },

  {

    right: 7712,

    left: 7532,

    bottom: 7718,

    top: 7568

  },

  {

    right: 7910,

    left: 7730,

    bottom: 7718,

    top: 7568

  },

  {

    right: 8108,

    left: 7928,

    bottom: 7718,

    top: 7568

  },

  {

    right: 8306,

    left: 8126,

    bottom: 7718,

    top: 7568

  },

  {

    right: 8504,

    left: 8324,

    bottom: 7718,

    top: 7568

  },

  {

    right: 8702,

    left: 8522,

    bottom: 7718,

    top: 7568

  },

  {

    right: 8900,

    left: 8720,

    bottom: 7718,

    top: 7568

  },

  {

    right: 9098,

    left: 8918,

    bottom: 7718,

    top: 7568

  },

  {

    right: 9296,

    left: 9116,

    bottom: 7718,

    top: 7568

  },

  {

    right: 9494,

    left: 9314,

    bottom: 7718,

    top: 7568

  },

  {

    right: 9692,

    left: 9512,

    bottom: 7718,

    top: 7568

  },

  {

    right: 9890,

    left: 9710,

    bottom: 7718,

    top: 7568

  },

  {

    right: 188,

    left: 8,

    bottom: 7886,

    top: 7736

  },

  {

    right: 386,

    left: 206,

    bottom: 7886,

    top: 7736

  },

  {

    right: 584,

    left: 404,

    bottom: 7886,

    top: 7736

  },

  {

    right: 782,

    left: 602,

    bottom: 7886,

    top: 7736

  },

  {

    right: 980,

    left: 800,

    bottom: 7886,

    top: 7736

  },

  {

    right: 1178,

    left: 998,

    bottom: 7886,

    top: 7736

  },

  {

    right: 1376,

    left: 1196,

    bottom: 7886,

    top: 7736

  },

  {

    right: 1574,

    left: 1394,

    bottom: 7886,

    top: 7736

  },

  {

    right: 1772,

    left: 1592,

    bottom: 7886,

    top: 7736

  },

  {

    right: 1970,

    left: 1790,

    bottom: 7886,

    top: 7736

  },

  {

    right: 2168,

    left: 1988,

    bottom: 7886,

    top: 7736

  },

  {

    right: 2366,

    left: 2186,

    bottom: 7886,

    top: 7736

  },

  {

    right: 2564,

    left: 2384,

    bottom: 7886,

    top: 7736

  },

  {

    right: 2762,

    left: 2582,

    bottom: 7886,

    top: 7736

  },

  {

    right: 2960,

    left: 2780,

    bottom: 7886,

    top: 7736

  },

  {

    right: 3158,

    left: 2978,

    bottom: 7886,

    top: 7736

  },

  {

    right: 3356,

    left: 3176,

    bottom: 7886,

    top: 7736

  },

  {

    right: 3554,

    left: 3374,

    bottom: 7886,

    top: 7736

  },

  {

    right: 3752,

    left: 3572,

    bottom: 7886,

    top: 7736

  },

  {

    right: 3950,

    left: 3770,

    bottom: 7886,

    top: 7736

  },

  {

    right: 4148,

    left: 3968,

    bottom: 7886,

    top: 7736

  },

  {

    right: 4346,

    left: 4166,

    bottom: 7886,

    top: 7736

  },

  {

    right: 4544,

    left: 4364,

    bottom: 7886,

    top: 7736

  },

  {

    right: 4742,

    left: 4562,

    bottom: 7886,

    top: 7736

  },

  {

    right: 4940,

    left: 4760,

    bottom: 7886,

    top: 7736

  },

  {

    right: 5138,

    left: 4958,

    bottom: 7886,

    top: 7736

  },

  {

    right: 5336,

    left: 5156,

    bottom: 7886,

    top: 7736

  },

  {

    right: 5534,

    left: 5354,

    bottom: 7886,

    top: 7736

  },

  {

    right: 5732,

    left: 5552,

    bottom: 7886,

    top: 7736

  },

  {

    right: 5930,

    left: 5750,

    bottom: 7886,

    top: 7736

  },

  {

    right: 6128,

    left: 5948,

    bottom: 7886,

    top: 7736

  },

  {

    right: 6326,

    left: 6146,

    bottom: 7886,

    top: 7736

  },

  {

    right: 6524,

    left: 6344,

    bottom: 7886,

    top: 7736

  },

  {

    right: 6722,

    left: 6542,

    bottom: 7886,

    top: 7736

  },

  {

    right: 6920,

    left: 6740,

    bottom: 7886,

    top: 7736

  },

  {

    right: 7118,

    left: 6938,

    bottom: 7886,

    top: 7736

  },

  {

    right: 7316,

    left: 7136,

    bottom: 7886,

    top: 7736

  },

  {

    right: 7514,

    left: 7334,

    bottom: 7886,

    top: 7736

  },

  {

    right: 7712,

    left: 7532,

    bottom: 7886,

    top: 7736

  },

  {

    right: 7910,

    left: 7730,

    bottom: 7886,

    top: 7736

  },

  {

    right: 8108,

    left: 7928,

    bottom: 7886,

    top: 7736

  },

  {

    right: 8306,

    left: 8126,

    bottom: 7886,

    top: 7736

  },

  {

    right: 8504,

    left: 8324,

    bottom: 7886,

    top: 7736

  },

  {

    right: 8702,

    left: 8522,

    bottom: 7886,

    top: 7736

  },

  {

    right: 8900,

    left: 8720,

    bottom: 7886,

    top: 7736

  },

  {

    right: 9098,

    left: 8918,

    bottom: 7886,

    top: 7736

  },

  {

    right: 9296,

    left: 9116,

    bottom: 7886,

    top: 7736

  },

  {

    right: 9494,

    left: 9314,

    bottom: 7886,

    top: 7736

  },

  {

    right: 9692,

    left: 9512,

    bottom: 7886,

    top: 7736

  },

  {

    right: 9890,

    left: 9710,

    bottom: 7886,

    top: 7736

  },

  {

    right: 188,

    left: 8,

    bottom: 8054,

    top: 7904

  },

  {

    right: 386,

    left: 206,

    bottom: 8054,

    top: 7904

  },

  {

    right: 584,

    left: 404,

    bottom: 8054,

    top: 7904

  },

  {

    right: 782,

    left: 602,

    bottom: 8054,

    top: 7904

  },

  {

    right: 980,

    left: 800,

    bottom: 8054,

    top: 7904

  },

  {

    right: 1178,

    left: 998,

    bottom: 8054,

    top: 7904

  },

  {

    right: 1376,

    left: 1196,

    bottom: 8054,

    top: 7904

  },

  {

    right: 1574,

    left: 1394,

    bottom: 8054,

    top: 7904

  },

  {

    right: 1772,

    left: 1592,

    bottom: 8054,

    top: 7904

  },

  {

    right: 1970,

    left: 1790,

    bottom: 8054,

    top: 7904

  },

  {

    right: 2168,

    left: 1988,

    bottom: 8054,

    top: 7904

  },

  {

    right: 2366,

    left: 2186,

    bottom: 8054,

    top: 7904

  },

  {

    right: 2564,

    left: 2384,

    bottom: 8054,

    top: 7904

  },

  {

    right: 2762,

    left: 2582,

    bottom: 8054,

    top: 7904

  },

  {

    right: 2960,

    left: 2780,

    bottom: 8054,

    top: 7904

  },

  {

    right: 3158,

    left: 2978,

    bottom: 8054,

    top: 7904

  },

  {

    right: 3356,

    left: 3176,

    bottom: 8054,

    top: 7904

  },

  {

    right: 3554,

    left: 3374,

    bottom: 8054,

    top: 7904

  },

  {

    right: 3752,

    left: 3572,

    bottom: 8054,

    top: 7904

  },

  {

    right: 3950,

    left: 3770,

    bottom: 8054,

    top: 7904

  },

  {

    right: 4148,

    left: 3968,

    bottom: 8054,

    top: 7904

  },

  {

    right: 4346,

    left: 4166,

    bottom: 8054,

    top: 7904

  },

  {

    right: 4544,

    left: 4364,

    bottom: 8054,

    top: 7904

  },

  {

    right: 4742,

    left: 4562,

    bottom: 8054,

    top: 7904

  },

  {

    right: 4940,

    left: 4760,

    bottom: 8054,

    top: 7904

  },

  {

    right: 5138,

    left: 4958,

    bottom: 8054,

    top: 7904

  },

  {

    right: 5336,

    left: 5156,

    bottom: 8054,

    top: 7904

  },

  {

    right: 5534,

    left: 5354,

    bottom: 8054,

    top: 7904

  },

  {

    right: 5732,

    left: 5552,

    bottom: 8054,

    top: 7904

  },

  {

    right: 5930,

    left: 5750,

    bottom: 8054,

    top: 7904

  },

  {

    right: 6128,

    left: 5948,

    bottom: 8054,

    top: 7904

  },

  {

    right: 6326,

    left: 6146,

    bottom: 8054,

    top: 7904

  },

  {

    right: 6524,

    left: 6344,

    bottom: 8054,

    top: 7904

  },

  {

    right: 6722,

    left: 6542,

    bottom: 8054,

    top: 7904

  },

  {

    right: 6920,

    left: 6740,

    bottom: 8054,

    top: 7904

  },

  {

    right: 7118,

    left: 6938,

    bottom: 8054,

    top: 7904

  },

  {

    right: 7316,

    left: 7136,

    bottom: 8054,

    top: 7904

  },

  {

    right: 7514,

    left: 7334,

    bottom: 8054,

    top: 7904

  },

  {

    right: 7712,

    left: 7532,

    bottom: 8054,

    top: 7904

  },

  {

    right: 7910,

    left: 7730,

    bottom: 8054,

    top: 7904

  },

  {

    right: 8108,

    left: 7928,

    bottom: 8054,

    top: 7904

  },

  {

    right: 8306,

    left: 8126,

    bottom: 8054,

    top: 7904

  },

  {

    right: 8504,

    left: 8324,

    bottom: 8054,

    top: 7904

  },

  {

    right: 8702,

    left: 8522,

    bottom: 8054,

    top: 7904

  },

  {

    right: 8900,

    left: 8720,

    bottom: 8054,

    top: 7904

  },

  {

    right: 9098,

    left: 8918,

    bottom: 8054,

    top: 7904

  },

  {

    right: 9296,

    left: 9116,

    bottom: 8054,

    top: 7904

  },

  {

    right: 9494,

    left: 9314,

    bottom: 8054,

    top: 7904

  },

  {

    right: 9692,

    left: 9512,

    bottom: 8054,

    top: 7904

  },

  {

    right: 9890,

    left: 9710,

    bottom: 8054,

    top: 7904

  },

  {

    right: 188,

    left: 8,

    bottom: 8222,

    top: 8072

  },

  {

    right: 386,

    left: 206,

    bottom: 8222,

    top: 8072

  },

  {

    right: 584,

    left: 404,

    bottom: 8222,

    top: 8072

  },

  {

    right: 782,

    left: 602,

    bottom: 8222,

    top: 8072

  },

  {

    right: 980,

    left: 800,

    bottom: 8222,

    top: 8072

  },

  {

    right: 1178,

    left: 998,

    bottom: 8222,

    top: 8072

  },

  {

    right: 1376,

    left: 1196,

    bottom: 8222,

    top: 8072

  },

  {

    right: 1574,

    left: 1394,

    bottom: 8222,

    top: 8072

  },

  {

    right: 1772,

    left: 1592,

    bottom: 8222,

    top: 8072

  },

  {

    right: 1970,

    left: 1790,

    bottom: 8222,

    top: 8072

  },

  {

    right: 2168,

    left: 1988,

    bottom: 8222,

    top: 8072

  },

  {

    right: 2366,

    left: 2186,

    bottom: 8222,

    top: 8072

  },

  {

    right: 2564,

    left: 2384,

    bottom: 8222,

    top: 8072

  },

  {

    right: 2762,

    left: 2582,

    bottom: 8222,

    top: 8072

  },

  {

    right: 2960,

    left: 2780,

    bottom: 8222,

    top: 8072

  },

  {

    right: 3158,

    left: 2978,

    bottom: 8222,

    top: 8072

  },

  {

    right: 3356,

    left: 3176,

    bottom: 8222,

    top: 8072

  },

  {

    right: 3554,

    left: 3374,

    bottom: 8222,

    top: 8072

  },

  {

    right: 3752,

    left: 3572,

    bottom: 8222,

    top: 8072

  },

  {

    right: 3950,

    left: 3770,

    bottom: 8222,

    top: 8072

  },

  {

    right: 4148,

    left: 3968,

    bottom: 8222,

    top: 8072

  },

  {

    right: 4346,

    left: 4166,

    bottom: 8222,

    top: 8072

  },

  {

    right: 4544,

    left: 4364,

    bottom: 8222,

    top: 8072

  },

  {

    right: 4742,

    left: 4562,

    bottom: 8222,

    top: 8072

  },

  {

    right: 4940,

    left: 4760,

    bottom: 8222,

    top: 8072

  },

  {

    right: 5138,

    left: 4958,

    bottom: 8222,

    top: 8072

  },

  {

    right: 5336,

    left: 5156,

    bottom: 8222,

    top: 8072

  },

  {

    right: 5534,

    left: 5354,

    bottom: 8222,

    top: 8072

  },

  {

    right: 5732,

    left: 5552,

    bottom: 8222,

    top: 8072

  },

  {

    right: 5930,

    left: 5750,

    bottom: 8222,

    top: 8072

  },

  {

    right: 6128,

    left: 5948,

    bottom: 8222,

    top: 8072

  },

  {

    right: 6326,

    left: 6146,

    bottom: 8222,

    top: 8072

  },

  {

    right: 6524,

    left: 6344,

    bottom: 8222,

    top: 8072

  },

  {

    right: 6722,

    left: 6542,

    bottom: 8222,

    top: 8072

  },

  {

    right: 6920,

    left: 6740,

    bottom: 8222,

    top: 8072

  },

  {

    right: 7118,

    left: 6938,

    bottom: 8222,

    top: 8072

  },

  {

    right: 7316,

    left: 7136,

    bottom: 8222,

    top: 8072

  },

  {

    right: 7514,

    left: 7334,

    bottom: 8222,

    top: 8072

  },

  {

    right: 7712,

    left: 7532,

    bottom: 8222,

    top: 8072

  },

  {

    right: 7910,

    left: 7730,

    bottom: 8222,

    top: 8072

  },

  {

    right: 8108,

    left: 7928,

    bottom: 8222,

    top: 8072

  },

  {

    right: 8306,

    left: 8126,

    bottom: 8222,

    top: 8072

  },

  {

    right: 8504,

    left: 8324,

    bottom: 8222,

    top: 8072

  },

  {

    right: 8702,

    left: 8522,

    bottom: 8222,

    top: 8072

  },

  {

    right: 8900,

    left: 8720,

    bottom: 8222,

    top: 8072

  },

  {

    right: 9098,

    left: 8918,

    bottom: 8222,

    top: 8072

  },

  {

    right: 9296,

    left: 9116,

    bottom: 8222,

    top: 8072

  },

  {

    right: 9494,

    left: 9314,

    bottom: 8222,

    top: 8072

  },

  {

    right: 9692,

    left: 9512,

    bottom: 8222,

    top: 8072

  },

  {

    right: 9890,

    left: 9710,

    bottom: 8222,

    top: 8072

  },

  {

    right: 188,

    left: 8,

    bottom: 8390,

    top: 8240

  },

  {

    right: 386,

    left: 206,

    bottom: 8390,

    top: 8240

  },

  {

    right: 584,

    left: 404,

    bottom: 8390,

    top: 8240

  },

  {

    right: 782,

    left: 602,

    bottom: 8390,

    top: 8240

  },

  {

    right: 980,

    left: 800,

    bottom: 8390,

    top: 8240

  },

  {

    right: 1178,

    left: 998,

    bottom: 8390,

    top: 8240

  },

  {

    right: 1376,

    left: 1196,

    bottom: 8390,

    top: 8240

  },

  {

    right: 1574,

    left: 1394,

    bottom: 8390,

    top: 8240

  },

  {

    right: 1772,

    left: 1592,

    bottom: 8390,

    top: 8240

  },

  {

    right: 1970,

    left: 1790,

    bottom: 8390,

    top: 8240

  },

  {

    right: 2168,

    left: 1988,

    bottom: 8390,

    top: 8240

  },

  {

    right: 2366,

    left: 2186,

    bottom: 8390,

    top: 8240

  },

  {

    right: 2564,

    left: 2384,

    bottom: 8390,

    top: 8240

  },

  {

    right: 2762,

    left: 2582,

    bottom: 8390,

    top: 8240

  },

  {

    right: 2960,

    left: 2780,

    bottom: 8390,

    top: 8240

  },

  {

    right: 3158,

    left: 2978,

    bottom: 8390,

    top: 8240

  },

  {

    right: 3356,

    left: 3176,

    bottom: 8390,

    top: 8240

  },

  {

    right: 3554,

    left: 3374,

    bottom: 8390,

    top: 8240

  },

  {

    right: 3752,

    left: 3572,

    bottom: 8390,

    top: 8240

  },

  {

    right: 3950,

    left: 3770,

    bottom: 8390,

    top: 8240

  },

  {

    right: 4148,

    left: 3968,

    bottom: 8390,

    top: 8240

  },

  {

    right: 4346,

    left: 4166,

    bottom: 8390,

    top: 8240

  },

  {

    right: 4544,

    left: 4364,

    bottom: 8390,

    top: 8240

  },

  {

    right: 4742,

    left: 4562,

    bottom: 8390,

    top: 8240

  },

  {

    right: 4940,

    left: 4760,

    bottom: 8390,

    top: 8240

  },

  {

    right: 5138,

    left: 4958,

    bottom: 8390,

    top: 8240

  },

  {

    right: 5336,

    left: 5156,

    bottom: 8390,

    top: 8240

  },

  {

    right: 5534,

    left: 5354,

    bottom: 8390,

    top: 8240

  },

  {

    right: 5732,

    left: 5552,

    bottom: 8390,

    top: 8240

  },

  {

    right: 5930,

    left: 5750,

    bottom: 8390,

    top: 8240

  },

  {

    right: 6128,

    left: 5948,

    bottom: 8390,

    top: 8240

  },

  {

    right: 6326,

    left: 6146,

    bottom: 8390,

    top: 8240

  },

  {

    right: 6524,

    left: 6344,

    bottom: 8390,

    top: 8240

  },

  {

    right: 6722,

    left: 6542,

    bottom: 8390,

    top: 8240

  },

  {

    right: 6920,

    left: 6740,

    bottom: 8390,

    top: 8240

  },

  {

    right: 7118,

    left: 6938,

    bottom: 8390,

    top: 8240

  },

  {

    right: 7316,

    left: 7136,

    bottom: 8390,

    top: 8240

  },

  {

    right: 7514,

    left: 7334,

    bottom: 8390,

    top: 8240

  },

  {

    right: 7712,

    left: 7532,

    bottom: 8390,

    top: 8240

  },

  {

    right: 7910,

    left: 7730,

    bottom: 8390,

    top: 8240

  },

  {

    right: 8108,

    left: 7928,

    bottom: 8390,

    top: 8240

  },

  {

    right: 8306,

    left: 8126,

    bottom: 8390,

    top: 8240

  },

  {

    right: 8504,

    left: 8324,

    bottom: 8390,

    top: 8240

  },

  {

    right: 8702,

    left: 8522,

    bottom: 8390,

    top: 8240

  },

  {

    right: 8900,

    left: 8720,

    bottom: 8390,

    top: 8240

  },

  {

    right: 9098,

    left: 8918,

    bottom: 8390,

    top: 8240

  },

  {

    right: 9296,

    left: 9116,

    bottom: 8390,

    top: 8240

  },

  {

    right: 9494,

    left: 9314,

    bottom: 8390,

    top: 8240

  },

  {

    right: 9692,

    left: 9512,

    bottom: 8390,

    top: 8240

  },

  {

    right: 9890,

    left: 9710,

    bottom: 8390,

    top: 8240

  }

]
    const leftedge= 0
    const rightedge= 1942
    const topedge= 0
    const bottomedge= 1642
    socket.on("start_match",(input)=>{
      if(input[1]){
        socket.emit("send_dim",[boxes,leftedge,rightedge,topedge,bottomedge,enteredid]);
        setInterval(() => {
    const arrow = arr[Math.floor(Math.random() * arr.length)];

    socket.emit("send_arrow", [arrow, enteredid]);

}, 500);
      }
      
    })
    


  });
}

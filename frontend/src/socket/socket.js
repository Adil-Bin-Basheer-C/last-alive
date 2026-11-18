import { io } from "socket.io-client";
export const socket=io.connect('http://192.168.1.34:3001')
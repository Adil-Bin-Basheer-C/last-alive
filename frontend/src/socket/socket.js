import { io } from "socket.io-client";
export const socket=io.connect('http://172.16.100.16:3001')
import { io } from "socket.io-client";



const socket = io("https://api.selfmade.city", { autoConnect: true });




export default socket;
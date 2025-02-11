import { useRef } from "react";
import WebSocketContext from "./WebSocketsContext";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
let ws = useRef();

ws.current = new WebSocket(SERVER_URL);

ws.current.onopen = () => {
  console.log("Connection Opened");
};

ws.current.onclose = () => {
  console.log("Connection closed");
};

ws.current.onmessage = (e) => {
  const data = JSON.parse(e.data);

  console.log(data);
};

const WebSocketsContextProvider = ({ Children }) => {
  const logIn = () => {};

  const logOut = () => {};

  const sendMessage = (message) => {
    ws.current.send(message)        
  };

  return (
    <WebSocketContext.Provider value={(logIn, logOut, sendMessage)}>
      {Children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketsContextProvider
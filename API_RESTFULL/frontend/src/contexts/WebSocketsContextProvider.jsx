import { useRef, useEffect } from "react";
import WebSocketContext from "./WebSocketsContext";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const WebSocketsContextProvider = ({ children }) => {
  const ws = useRef(null);

  // Cleanup cuando el componente se desmonta
  // return () => {
  //   if (ws.current) {
  //     ws.current.close();
  //   }
  // };

  const logIn = () => {
    ws.current = new WebSocket(SERVER_URL);
    ws.current.onopen = () => {
      console.log("Connection Opened");
    };
  };

  const logOut = () => {
    ws.current.close();
    console.log("Connection closed");
  };

  const sendMessage = (message) => {
    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
    };
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    } else {
      console.error("WebSocket no está conectado.");
    }
  };

  return (
    <WebSocketContext.Provider value={{ logIn, logOut, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketsContextProvider;   
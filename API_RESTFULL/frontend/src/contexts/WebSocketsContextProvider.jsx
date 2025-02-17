import { useRef, useEffect, useState } from "react";
import WebSocketContext from "./WebSocketsContext";
import { getUserId, getUserRole } from "../services/utils";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const WebSocketsContextProvider = ({ children }) => {
  const ws = useRef(null);
  const userId = getUserId();
  const userRole = getUserRole();

  const logIn = () => {
    ws.current = new WebSocket(SERVER_URL);

    ws.current.addEventListener("open", (e) => {
      console.log("Connected to WS server");

      ws.current.send('Hello server!');
    });

    ws.current.addEventListener("message", (e) => {
      const data = e.data;
      console.log("Received message data:", data);
    });

    ws.current.addEventListener("error", (e) => {
      console.error("WebSocket error:", e);
    });

    ws.current.addEventListener("close", (e) => {
      console.error("Disconnected from Websocket server");
    });
  };

  const logOut = () => {
    ws.current.close();
    console.log("Connection closed");
  };

  const sendMessage = (message) => {
    ws.current.send(JSON.stringify(message));
  };

  return (
    <WebSocketContext.Provider value={{ logIn, logOut, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketsContextProvider;

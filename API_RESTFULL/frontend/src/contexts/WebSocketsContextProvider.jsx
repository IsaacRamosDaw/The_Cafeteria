import { useContext, useRef } from "react";
import WebSocketContext from "./WebSocketsContext";
import { getUserId, getUserRole } from "../services/utils";

import OrderContext from "./OrderContext";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const WebSocketsContextProvider = ({ children }) => {

  const { orders, setOrders, removeOrderById } = useContext(OrderContext)

  const ws = useRef();
  const userId = getUserId();
  const userRole = getUserRole();


  const logIn = () => {
    ws.current = new WebSocket(SERVER_URL);
    
    ws.current.addEventListener("open", (e) => {
      // TYPES: auth, chat, notification
      const data = {
        type: "auth",
        data: {
          message: "Hello server",
          userId: userId,
          userRole: userRole
        }
      }

      console.log("Connected to WS server");

      ws.current.send(JSON.stringify(data));
    })

    ws.current.addEventListener("message", (e) => {
      const message = JSON.parse( e.data)
      console.log("Received message:", message);
      
      if( message.type === "notification" ){
        
        console.log("Received message:", message);
        removeOrderById(message.data.orderId)
      }

    });

    ws.current.addEventListener("error", (e) => {
      console.log("WebSocket error:", e);
    });

    ws.current.addEventListener("close", (e) => {
      console.log("Disconnected from Websocket server");
    });
  };

  const logOut = () => {
    ws.current.close();
    console.log("Connection closed");
  };

  const sendMessage = (message) => {
    ws.current.send(message);
  };

  return (
    <WebSocketContext.Provider value={{ logIn, logOut, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketsContextProvider;

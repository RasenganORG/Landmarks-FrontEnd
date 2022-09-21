// import io from 'socket.io-client';
// const socket = io('ws://localhost:8080');
// export default socket;

import { createContext } from 'react';
import openSocket from 'socket.io-client';
const ENDPOINT = 'ws://localhost:8080';

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default function WebSocketProvider({ children }) {
  let socket;
  let ws;

  if (!socket) {
    socket = openSocket(ENDPOINT, { transports: ['websocket'] });
    console.log('De cate ori');

    // socket.on('eventname', (data) => {
    //   console.log(data);
    // });

    ws = {
      socket: socket,
    };
  }

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
}

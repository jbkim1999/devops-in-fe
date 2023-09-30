import React, { useState, useEffect } from 'react';
import { socket } from '../components/socket';

export default function Home() {  
  const [serverInfos, setServerInfos] = useState([0, 0]);

  useEffect(() => {
    socket.on("notify-server-change", (serverInfo) => {
      console.log(serverInfo);
    });

    return () => {
      socket.off("notify-server-change");
    };
  }, []);

  return (
    <div>
      Hello world!
    </div>
  );
}

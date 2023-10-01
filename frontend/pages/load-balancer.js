import React, { useState, useEffect } from 'react';

import { socket } from '../components/socket';
import BoxContainer from '../components/box-container';
import ButtonBox from '../components/boxes/button-box';
import MessageBox from '../components/boxes/message-box';

const BACKEND_URL = 'http://localhost:8080'; // TODO: Use ENV variable

export default function LoadBalancer() {
    const [serverInfos, setServerInfos] = useState([0, 0]);

    const [message, setMessage] = useState("I am the load balancer!"); // msg for load balancer
    const [status, setStatus] = useState(null); // status for load balancer

    useEffect(() => {
        socket.on("notify-server-change", (serverInfo) => {
            console.log(serverInfo);
        });
        
        return () => {
            socket.off("notify-server-change");
        };
    }, []);

    const submitRequest = async () => {
        try {
            const response = await fetch(BACKEND_URL + "/submit");
            const data = await response.json()
            if (response.status === 500) {
                throw new Error(data.message);
            }
            setMessage(data.message); // TODO: SRP
        } catch (error) {
            console.log(error.message);
            setMessage(error.message);
        }
    }

    return (
        <div>
            <BoxContainer title="Client">
                <ButtonBox text="Generate a new request!" onClick={submitRequest}/>
            </BoxContainer>

            <BoxContainer title="Load Balancer">
                <MessageBox text={message} status={1}/>
            </BoxContainer>
        </div>
    );
}

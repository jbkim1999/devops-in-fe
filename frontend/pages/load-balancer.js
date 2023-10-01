import React, { useState, useEffect } from 'react';
import styles from '../styles/load-balancer.module.css';

import { socket } from '../components/socket';
import BoxContainer from '../components/box-container';
import ButtonBox from '../components/boxes/button-box';
import MessageBox from '../components/boxes/message-box';
import FillBox from '../components/boxes/fill-box';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';
console.log(process.env.BACKEND_URL);

export default function LoadBalancer() {
    const [serverInfos, setServerInfos] = useState([0, 0]);

    const [message, setMessage] = useState("I am the load balancer!"); // msg for load balancer
    const [status, setStatus] = useState(null); // status for load balancer

    useEffect(() => {
        socket.on("notify-server-change", (serverInfo) => {
            const updatedServerInfos = [...serverInfos];
            updatedServerInfos[serverInfo.id] = serverInfo.utilization;
            setServerInfos(updatedServerInfos);
        });
        
        return () => {
            socket.off("notify-server-change");
        };
    }, [serverInfos]); // IMPORTANT: serverInfos as dependency

    const submitRequest = async () => {
        try {
            const response = await fetch(BACKEND_URL + "/submit");
            const data = await response.json()
            if (response.status === 500) {
                throw new Error(data.message);
            }
            setMessage(data.message); // TODO: SRP
        } catch (error) {
            setMessage(error.message);
        }
    }

    return (
        <div className={styles.container}>
            <h1> Load Balancer </h1>
            <h2> 
                A load balancer is a network device or software application that distributes incoming network traffic or workload across multiple servers or resources to ensure efficient utilization.
            </h2>
            <div className={styles.divider}/> 
            <div className={styles.boxesContainer}>
                <BoxContainer title="Client">
                    <ButtonBox text="Generate a new request" onClick={submitRequest}/>
                </BoxContainer>

                <BoxContainer title="Load Balancer">
                    <MessageBox text={message} status={1}/>
                </BoxContainer>

                <div className={styles.serversContainer}>
                    {/* TODO: Dynamically generate servers */}
                    <BoxContainer title="Server 1">
                        <FillBox color="tomato" utilization={serverInfos[0]}/>
                    </BoxContainer>

                    <BoxContainer title="Server 2">
                        <FillBox color="darkturquoise" utilization={serverInfos[1]}/>
                    </BoxContainer>
                </div>
            </div>
        </div>
    );
}

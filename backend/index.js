import express from 'express';
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";

import { initializeAndGetServers } from './servers.js';
import { LoadBalancer } from './load-balancer.js';
import { Notifier } from './notifier.js'; 
import { respond } from './socket-routing.js';

const app = express();
app.use(cors());
const httpServer = createServer(app);
const port = 8080;

const servers = initializeAndGetServers(2);
const notifier = new Notifier(servers);
const loadBalancer = new LoadBalancer(servers);

// handle io
const io = new Server(httpServer, {
  cors: { origin: '*' }
});
respond(io, notifier);

// handle api
app.get('/', (req, res) => {
	res.send('Hello from Devops in FE!');
});

app.get('/submit', (req, res) => {
	loadBalancer.handleClientSubmit(req, res);
});

httpServer.listen(port, () => {
	console.log('Starting server...');
});

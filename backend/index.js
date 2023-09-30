import express from 'express';
import { initializeAndGetServers } from './servers.js';
import { LoadBalancer } from './load_balancer.js';

const app = express();
const port = 8080;

const servers = initializeAndGetServers(2);
const loadBalancer = new LoadBalancer(servers);

app.get('/', (req, res) => {
	res.send('Hello from Devops in FE!');
});

app.get('/submit', (req, res) => {
	loadBalancer.handleClientSubmit(req, res);
});

app.listen(port, () => {
	console.log('Starting server...');
});

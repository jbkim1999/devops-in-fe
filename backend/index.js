import express from 'express';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
	res.send('Hello from Devops in FE!');
});

app.listen(port, () => {
	console.log('Starting server...');
});

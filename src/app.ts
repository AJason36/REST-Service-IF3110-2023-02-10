import express, { Express } from 'express';

// express app instance
const app: Express = express();

// parse json request bodies
app.use(express.json());

// parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

export default app;
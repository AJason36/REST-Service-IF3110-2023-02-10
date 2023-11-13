import express, { Express } from 'express';
import routes from './routes/index';

// express app instance
const app: Express = express();

// parse json request bodies
app.use(express.json());

// parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// routing
app.use('/', routes);

export default app;
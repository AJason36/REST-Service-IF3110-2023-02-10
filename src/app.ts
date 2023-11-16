import express, { Express } from 'express';
import routes from './routes/index';
const cors = require("cors");

// express app instance
const app: Express = express();
app.use(cors());
// parse json request bodies
app.use(express.json());

// parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// routing
app.use('/api', routes);

export default app;
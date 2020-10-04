import express from 'express';
import apiRouter from './api/routes/apiRouter';
import Config from './util/config';

// Set up the server
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Register the API router
app.use('/api', apiRouter);

app.listen(Config.port, () => console.log(`Server now listening on port ${Config.port}`));
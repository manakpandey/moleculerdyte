import express from 'express';
import logger from './utils/logger';

const app = express();
const port = 5000;

app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});

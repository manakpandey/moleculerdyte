import express from 'express';
import logger from './utils/logger';
import adminRouter from './routes/admin';

import './services/db';

const app = express();
const port = 5000;

app.use(express.json());
app.use('/admin', adminRouter);

app.get('/ip', (req, res) => {
  const { ip } = req;
  const ipa = ip.substr(ip.lastIndexOf(':') + 1);
  res.send(ipa);
});

app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});

import express from 'express';
import logger from './utils/logger';
import adminRouter from './routes/admin';
import Broker from './services/webhooks';

import './services/db';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/admin', adminRouter);

app.get('/ip', async (req, res) => {
  const { ip } = req;
  const ipa = ip.substr(ip.lastIndexOf(':') + 1);
  try {
    await Broker.start();
    await Broker.call('webhooks.trigger', { ipAddress: ipa });
    res.sendStatus(200);
  } catch (e) {
    logger.error(e);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});

import { Router } from 'express';
import Broker from '../services/webhooks';
import logger from '../utils/logger';

const router = Router();
router.post('/register', async (req, res) => {
  const { targetUrl } = req.body;
  if (!targetUrl) {
    res.sendStatus(400);
    return;
  }
  try {
    await Broker.start();
    const reg = await Broker.call('webhooks.register', { targetUrl });
    res.send(reg);
  } catch (e) {
    logger.error(e);
    res.sendStatus(500);
  }
});

router.post('/delete', async (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.sendStatus(400);
    return;
  }
  try {
    await Broker.start();
    const reg:number = await Broker.call('webhooks.delete', { id });
    res.sendStatus(reg);
  } catch (e) {
    logger.error(e);
    res.sendStatus(500);
  }
});

router.post('/update', async (req, res) => {
  const { id, targetUrl } = req.body;
  if (!id || !targetUrl) {
    res.sendStatus(400);
    return;
  }
  try {
    await Broker.start();
    const reg:number = await Broker.call('webhooks.update', { id, targetUrl });
    res.sendStatus(reg);
  } catch (e) {
    logger.error(e);
    res.sendStatus(500);
  }
});

router.get('/list', async (req, res) => {
  try {
    await Broker.start();
    const reg = await Broker.call('webhooks.list');
    res.send(reg);
  } catch (e) {
    logger.error(e);
    res.sendStatus(500);
  }
});

export default router;

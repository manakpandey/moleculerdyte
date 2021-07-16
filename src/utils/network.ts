import axios from 'axios';
import logger from './logger';

async function postWithRetries(
  url: string,
  data: Record<string, any>,
  numRetries: number,
) {
  try {
    logger.info(`Sending POST request to ${url} `);
    await axios.post(url, { ...data, timestamp: new Date().getTime() });
  } catch (e) {
    logger.error(`${url} responded with status ${e.response?.status}`);
    if (numRetries > 0) {
      await postWithRetries(url, data, numRetries - 1);
    }
  }
}

export default { postWithRetries };

import mongoose from 'mongoose';
import logger from '../utils/logger';

mongoose.connect(process.env.DB_URL as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', logger.error.bind(console));
db.on('open', () => logger.info('DB Connected'));

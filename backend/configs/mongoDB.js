import mongoose from 'mongoose';
import config from '../utils/config.js';
import logger from '../utils/logger.js';

logger.info('connecting to', config.MONGODB_URI);

const connectMongoDB = async () => {
  try {
    await mongoose
      .connect(config.MONGODB_URI);
    logger.info('connected to MongoDB');
  } catch (error) {
    logger.error('error connection to MongoDB: ', error.message);
  };
};

export default connectMongoDB;

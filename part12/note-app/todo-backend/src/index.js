import 'dotenv/config'
import app from "./app.js";
import mongoose from "mongoose";
import './redis.js';

const MONGO_URL = process.env.MONGO_URL || null;

try {
  await mongoose.connect(MONGO_URL);
  console.log('Connected to MongoDB');
} catch (error) {
  console.error('MongoDB connection error:', error);
  process.exit(1);
}


app.get('/delayed', async (request, reply) => {
  const SECONDS_DELAY = 60000
  await new Promise(resolve => {
    setTimeout(() => resolve(), SECONDS_DELAY)
  })
  return { hello: 'delayed world' }
})

const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const shutdown = async () => {
  console.log('Shutting down...');
  server.close(async () => {
    console.log('Server closed. Cleaning up resources...');
    await mongoose.connection.close(); // Ensure any DB connections are closed
    console.log('Database connection closed. Exiting process.');
    process.exit(0);  // Exit gracefully
  });
};

// Listen for signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
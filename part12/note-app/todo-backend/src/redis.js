import redis from 'redis';

const REDIS_URL = process.env.REDIS_URL || null;

let client;

if (REDIS_URL) {
  client = redis.createClient({
    url: REDIS_URL
  });

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();
  console.log('Redis Client Connected');
}

const getAsync = async (key) => {
  if (!client) return null;
  return await client.get(key);
};

const setAsync = async (key, value) => {
  if (!client) return;
  await client.set(key, value);
};

export default {
  getAsync,
  setAsync
};

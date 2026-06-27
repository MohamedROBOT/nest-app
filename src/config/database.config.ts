import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  url: process.env.DB_URL,
  REDIS_URL: process.env.REDIS_URL,
  CACHE_TTL: process.env.CACHE_TTL,
}));

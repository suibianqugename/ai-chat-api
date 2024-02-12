import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10) || 27017,
  name: process.env.DB_NAME || 'ai-chat',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
}));

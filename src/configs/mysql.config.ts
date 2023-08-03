import { registerAs } from '@nestjs/config';

export default registerAs('mysql', () => ({
  type: process.env.DATABASE_TYPE as 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME || 'mysql',
  password: process.env.DATABASE_PASSWORD || 'mysql',
  database: process.env.DATABASE_DATABASE || 'mysql',
}));

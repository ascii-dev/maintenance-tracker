import dotenv from 'dotenv';

dotenv.config();

const config = {
  database: {
    user: process.env.TEST_DB_USER,
    host: process.env.TEST_DB_HOST,
    database: process.env.TEST_DB_NAME,
    password: process.env.TEST_DB_PASSWORD,
    port: process.env.TEST_DB_PORT,
  },
};

export default config;

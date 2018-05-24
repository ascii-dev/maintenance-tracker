const config = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'm_tracker',
  password: process.env.DB_PASSWORD || 'alessiacara',
  port: '5432',
};

export default config;

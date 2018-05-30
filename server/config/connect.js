import pg from 'pg';
import config from './config';

const pool = (process.env.NODE_ENV === 'test') ? new pg.Pool(config.test) : new pg.Pool(config.database);

export default pool;

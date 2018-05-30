import pg from 'pg';
import config from './config';

const pool = new pg.Pool(config.database);

export default pool;

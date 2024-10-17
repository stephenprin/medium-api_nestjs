import { DataSource } from 'typeorm';
import { ormseedConfig } from './ormseedConfig';

export default new DataSource(ormseedConfig);

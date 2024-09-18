import { DataSource } from 'typeorm';
import ormConfig from './ormConfig';

export default new DataSource(ormConfig);

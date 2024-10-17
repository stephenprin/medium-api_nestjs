import ormConfig from './ormConfig';

export const ormseedConfig = {
  ...ormConfig,
  migration: ['src/seeds/*.ts'],
};

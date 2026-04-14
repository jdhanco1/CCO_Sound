import * as migration_20260414_175703 from './20260414_175703';
import * as migration_20260414_191613 from './20260414_191613';

export const migrations = [
  {
    up: migration_20260414_175703.up,
    down: migration_20260414_175703.down,
    name: '20260414_175703',
  },
  {
    up: migration_20260414_191613.up,
    down: migration_20260414_191613.down,
    name: '20260414_191613'
  },
];

import * as migration_20260414_175703 from './20260414_175703';
import * as migration_20260414_191613 from './20260414_191613';
import * as migration_20260414_200000 from './20260414_200000';
import * as migration_20260414_210000 from './20260414_210000';
import * as migration_20260415_000000 from './20260415_000000';

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
  {
    up: migration_20260414_200000.up,
    down: migration_20260414_200000.down,
    name: '20260414_200000'
  },
  {
    up: migration_20260414_210000.up,
    down: migration_20260414_210000.down,
    name: '20260414_210000'
  },
  {
    up: migration_20260415_000000.up,
    down: migration_20260415_000000.down,
    name: '20260415_000000'
  },
];

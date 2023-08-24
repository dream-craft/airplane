import { execute } from './common/utils.js';

const imageName = 'postgres:15.3-bullseye';
const containerName = 'airplane-postgres';
const databaseName = 'airplane';
const userName = 'airplane';
const password = 'airplane';

await execute('Check Docker cli', 'docker', ['--version']);
await execute('Pull image', 'docker', ['pull', imageName]);
await execute('Remove container', 'docker', ['rm', '-f', containerName]);
await execute('Remove volume', 'docker', ['volume', 'rm', '-f', containerName]);
await execute('Create volume', 'docker', ['volume', 'create', containerName]);
await execute('Run container', 'docker', [
  'run',
  '-d',
  '--name',
  containerName,
  '-p',
  '3200:5432',
  '-e',
  `POSTGRES_DB=${databaseName}`,
  '-e',
  `POSTGRES_USER=${userName}`,
  '-e',
  `POSTGRES_PASSWORD=${password}`,
  '-e',
  'TZ=Etc/UTC',
  '-e',
  'PGDATA=/var/lib/postgresql/data/pgdata',
  '-v',
  `${containerName}:/var/lib/postgresql/data`,
  '--restart',
  'always',
  imageName,
]);
await execute('Wait for container to start', 'docker', [
  'run',
  '--rm',
  '--link',
  containerName,
  'postgres:15.3-bullseye',
  'bash',
  '-c',
  `while ! pg_isready -h "${containerName}" -U "${userName}" -d "${databaseName}" -t 1; do sleep 1; done`,
]);

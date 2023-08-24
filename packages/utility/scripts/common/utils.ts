import { SpawnOptions, spawn } from 'child_process';
import chalk from 'chalk';

export const logger = {
  info: (message?: any, ...optionalParams: any[]) => console.log(`${chalk.blue('[INFO]')} ${message}`, ...optionalParams),
  error: (message?: any, ...optionalParams: any[]) => console.error(`${chalk.yellow('[WARN]')} ${message}`, ...optionalParams),
};

const defaultExecuteOptions: SpawnOptions = {
  stdio: 'inherit',
};

export async function execute(name: string, command: string, args: string[], options: SpawnOptions = defaultExecuteOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    logger.info(`${chalk.yellow(`[${name}]`)} Executing with`, { command, args, options });
    const child = spawn(command, args, options);
    child.once('error', (error) => {
      logger.error(`${chalk.yellow(`[${name}]`)}  Failed with`, { error });
      reject(error);
    });
    child.once('spawn', () => {
      child.off('error', reject);
      child.on('exit', (code, signal) => {
        logger.info(`${chalk.yellow(`[${name}]`)} Exited with`, { code, signal });

        if (code === 0) {
          resolve();
          return;
        }

        reject(new Error(`Process failed with code ${code} and signal ${signal}`));
      });
    });
  });
}

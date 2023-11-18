// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './apps/data-seeder/.env' });

import { E2E_TEST_DB_CONFIG } from './db-setup';
import { UserSeedService } from '@wrapup/seeder-services';
import { UserCreation } from '@wrapup/api-interfaces';
import {
  createTestDbConnection,
  generateFakeDataForUserCreation,
} from '@wrapup/test-utils';
import { createInterface, Interface } from 'readline';
import { argv } from 'yargs';
import { ConfigModel, setConfigItem } from './config';
import * as fs from 'fs';

const setupTest = async (config: ConfigModel) => {
  const dbConnection = await createTestDbConnection(E2E_TEST_DB_CONFIG);

  const userService = new UserSeedService(dbConnection);

  const userToSave: Partial<UserCreation>[] = [];

  for (let i = 0; i < config.users; i++) {
    userToSave.push(generateFakeDataForUserCreation());
  }
  await userService.seedData(userToSave);

  fs.writeFile(
    './apps/wrapup-e2e/playwright/accounts.json',
    JSON.stringify(userToSave),
    (err) => {
      if (err) {
        return console.log(err);
      }
      console.log('The data were saved to the file!');
    },
  );
};

const askAboutUsers = (line: Interface) => {
  line.question('How many users you want to create? ', (userCount) => {
    const userCountInt = parseInt(userCount);
    if (typeof userCountInt === 'number' && userCountInt > 0) {
      console.log(`Roger! ${userCount} it is.`);
      setConfigItem('users', userCountInt);
      console.log(`Seeding data to ${process.env.PGHOST}...`);
      line.close();
      setupTest({ users: userCountInt });
    } else {
      console.log('Invalid value. Pass a number.');
      askAboutUsers(line);
    }
  });
};

if ('users' in argv && typeof argv.users === 'number' && argv.users > 0) {
  setConfigItem('users', argv.users);
  setupTest({ users: 3 });
} else {
  const line = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  askAboutUsers(line);
}

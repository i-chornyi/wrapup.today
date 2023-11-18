import { expect, test } from '@playwright/test';

import * as fs from 'fs';

const authFile = './apps/wrapup-e2e/playwright/.auth/user.json';
const accountsFile = './apps/wrapup-e2e/playwright/accounts.json';

test('user should log in', async ({ page }) => {
  await page.goto('/');

  const openCreateAccountDialogButton = page.getByTestId(
    'open-login-dialog-button',
  );
  await openCreateAccountDialogButton.click();

  const emailControl = page.getByTestId('login-email-control');
  const passwordControl = page.getByTestId('login-password-control');
  const loginButton = page.getByTestId('login-action-button');

  const userData = JSON.parse(fs.readFileSync(accountsFile, 'utf-8'));

  await emailControl.type(userData[0].email);
  await passwordControl.type(userData[0].password);

  await loginButton.click();

  await page.waitForURL('**/projects');

  expect(page.url()).toContain('/projects');

  await page.context().storageState({ path: authFile });
});

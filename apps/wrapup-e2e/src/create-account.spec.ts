import { expect, test } from '@playwright/test';
import { generateFakeDataForUserCreation } from '@wrapup/test-utils';

test('should register a user', async ({ page }) => {
  await page.goto('/');

  const openCreateAccountDialogButton = page.getByTestId(
    'open-create-account-dialog-button',
  );
  await openCreateAccountDialogButton.click();

  expect(page.getByTestId('create-account-dialog')).toBeDefined();

  const emailControl = page.getByTestId('create-account-email-control');
  const passwordControl = page.getByTestId('create-account-password-control');
  const createAccountButton = page.getByTestId('create-account-action-button');

  const fakeUser = generateFakeDataForUserCreation();

  await emailControl.type(fakeUser.email);
  await passwordControl.type(fakeUser.password);

  await createAccountButton.click();

  await page.waitForURL('**/projects');

  expect(page.url()).toContain('/projects');
});

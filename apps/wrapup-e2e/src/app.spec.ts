import { expect, test } from '@playwright/test';

test('should start page', async ({ page }) => {
  await page.goto('/');
  expect(await page.content()).toContain('Wrapup');

  expect(true).toBeTruthy();
});

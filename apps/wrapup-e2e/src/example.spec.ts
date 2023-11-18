import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  const projectsLink = page.getByTestId('project-page-link');

  await projectsLink.click();

  const projectsTitle = page.getByTestId('projects-title');

  expect(await projectsTitle.textContent()).toContain('Projects');
});

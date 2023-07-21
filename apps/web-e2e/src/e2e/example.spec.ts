import { test, expect } from '@playwright/test';

test('homepage has Playwright in title and get started link linking to the intro page', async ({
  page,
}) => {
  await page.goto('http://localhost:9999');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/MyApp/);

  // create a locator
  const getLeave = page.locator('text=Leave a note');

  // Expect the text to exist
  await expect(getLeave).toHaveText('Leave a note');

});

import { test, expect } from '@playwright/test';

const NEXT_URL="http://localhost:3000"

test('logging in GRID', async ({ page }) => {
  await page.goto(NEXT_URL);
  const getStarted = page.getByRole('button', { name: 'Login' });
  await getStarted.click();
  await page.waitForURL(/auth.grid.domain-for-tests.com/);
  await page.getByRole('textbox', { name: 'Username' }).fill('Kyryll');
  await page.fill('#password', '12345');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL(NEXT_URL);
  await expect(page.locator('.MuiBox-root .mui-yyeo6n > a')).toHaveText("Serebriakov Kyryl");
  const cart = await page.getByRole('button', { name: 'CART' }).isEnabled();
  const logout = await page.getByRole('button', { name: 'LOGOUT' }).isEnabled();
  expect(cart).toBe(true);
  expect(logout).toBe(true);
});

// test('registrations in GRID', async ({ page }) => {
//   await page.goto(NEXT_URL);
//   const getStarted = page.getByRole('button', { name: 'Login' });
//   await getStarted.click();
//   await page.waitForURL(/auth.grid.domain-for-tests.com/);
//   await page.getByRole('link', { name: 'Register' }).click();
//   await page.waitForSelector('#kc-page-title');
//   await page.fill('#username', 'KyrylTestE2E');
//   await page.fill('#password', '12345');
//   await page.fill('#password-confirm', '12345');
//   await page.fill('#email', 'LsKp0@example.com');
//   await page.fill('#firstName', 'KyrylTestE2E');
//   await page.fill('#lastName', 'SerebriakovTestE2E');
//   await page.fill('#street_address', 'Rathauspl. 5, 71720 Oberstenfeld');
//   await page.fill('#postal_code', '71720');
//   await page.fill('#locality', 'Oberstenfeld');
//   await page.fill('#country', 'Germany');
//   await page.fill('#birthdate', '2000-06-01');
//   await page.getByRole('button', { name: 'Register' }).click();
//   await page.waitForURL(NEXT_URL);
// });

test('logging out in GRID', async ({ page }) => {
  await page.goto(NEXT_URL);
  const getStarted = page.getByRole('button', { name: 'Login' });
  await getStarted.click();
  await page.waitForURL(/auth.grid.domain-for-tests.com/);
  await page.getByRole('textbox', { name: 'Username' }).fill('Kyryll');
  await page.fill('#password', '12345');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL(NEXT_URL);
  await expect(page.locator('.MuiBox-root .mui-yyeo6n > a')).toHaveText("Serebriakov Kyryl");
  await page.getByRole('button', { name: 'LOGOUT' }).click();
  await getStarted.click();
  await page.waitForURL(/auth.grid.domain-for-tests.com/);
  await expect(page).toHaveTitle("Sign in to GRID");
});

import { test, expect } from '@playwright/test';
const NEXT_URL="http://localhost:3000"

test('adding game to cart', async ({ page }) => {
    await page.goto(NEXT_URL);
  const getStarted = page.getByRole('button', { name: 'Login' });
  await getStarted.click();
  await page.waitForURL(/auth.grid.domain-for-tests.com/);
  await page.getByRole('textbox', { name: 'Username' }).fill('Kyryll');
  await page.fill('#password', '12345');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL(NEXT_URL);
  //await expect(page.locator('.MuiBox-root .mui-yyeo6n > a')).toHaveText("Serebriakov Kyryl");
  await page.getByRole('button', { name: /[0-9]/ }).first().click();
  await page.waitForURL(/game/);
  await page.getByRole('button', { name: /[0-9]/ }).first().click();
  await page.getByRole('button', { name: 'Successfully added to cart!' }).waitFor();    
  await page.getByRole('button', { name: 'CART' }).first().click();
  await page.waitForURL(/cart/);
  await page.getByRole('button', { name: 'DELETE ALL' }).waitFor();
  expect(await page.getByRole('button', { name: 'DELETE ALL' }).isVisible()).toBe(true)
  expect(await page.getByRole('button', { name: 'BUY ALL' }).isVisible()).toBe(true)
  //expect(await page.locator(".MuiBox-root .mui-q5y0w2 > div:ntch-child(1)").isVisible()).toBe(true)


    
})
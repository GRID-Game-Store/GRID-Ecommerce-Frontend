import { test, expect } from "@playwright/test";

test("write in search game and check in list", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("textbox", { name: "Search" }).fill("Battlefield 2042");
  await page.getByRole("textbox", { name: "Search" }).hover();
  await expect(
    page.getByRole("link", { name: "Battlefield™ 2042" }),
  ).toHaveText("Battlefield™ 2042");
});

test("write in search and click on name of game", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("textbox", { name: "Search" }).fill("Battlefield 2042");
  await page.getByRole("textbox", { name: "Search" }).hover();
  await page.getByRole("link", { name: "Battlefield™ 2042" }).click();
  await expect(
    page.getByRole("heading", { name: "Battlefield™ 2042" }),
  ).toHaveText("Battlefield™ 2042");
});

test("write in search not found game", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("textbox", { name: "Search" }).fill("dsadasdas");
  await page.locator("div:nth-child(2) > div").first().waitFor();
  await page.getByRole("textbox", { name: "Search" }).hover();
  await expect(page.getByText("Not found :(")).toBeVisible();
});

test("write in search not found game", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("textbox", { name: "Search" }).fill("dsadasdas");
  await page.locator("div:nth-child(2) > div").first().waitFor();
  await page.getByRole("textbox", { name: "Search" }).hover();
  await expect(page.getByText("Not found :(")).toBeVisible();
});

test("write with help keyboard", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("textbox", { name: "Search" }).focus();
  await page.keyboard.type("B");
  await page.getByRole("textbox", { name: "Search" }).hover();
  await expect(page.getByRole("link", { name: "Baldurs Gate 3" })).toHaveText(
    "Baldurs Gate 3",
  );
  await page.keyboard.type("G");
  await expect(page.getByRole("link", { name: "Baldurs Gate 3" })).toHaveText(
    "Baldurs Gate 3",
  );
  await page.keyboard.type("3");
  await expect(page.getByRole("link", { name: "Baldurs Gate 3" })).toHaveText(
    "Baldurs Gate 3",
  );
  await page.keyboard.type("1");
  await expect(page.getByText("Not found :(")).toBeVisible();
});

test("search game with help # symbol", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("textbox", { name: "Search" }).fill("BG#");
  await page.getByRole("textbox", { name: "Search" }).hover();
  await page.getByRole("link", { name: "Baldurs Gate 3" }).waitFor();
  const allGameInList =
    (
      await page
        .locator(".MuiBox-root .mui-ve3r9o div:nth-child(2) > div > div")
        .all()
    ).length - 1;
  expect(allGameInList).toBe(3);
});

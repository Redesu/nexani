import { expect, test } from "@playwright/test";

test("logout", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "account of current user" }).click();
  await page.getByRole("menuitem", { name: "Logout" }).click();
  expect(page.url()).toBe("http://localhost:3000/");
});

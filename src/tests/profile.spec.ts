import { test, expect } from "@playwright/test";

test("user profile", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "account of current user" }).click();
  await page.getByRole("menuitem", { name: "Profile" }).click();
  await page.waitForURL("http://localhost:3000/profile/*");
  await expect(
    page.getByRole("heading", { name: "Profile Info" })
  ).toBeVisible();
});

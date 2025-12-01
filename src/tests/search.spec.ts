import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox", { name: "search" }).fill("naruto");
  await expect(
    page.getByRole("link", { name: "Naruto: Shippuuden Naruto:" })
  ).toBeVisible();
});

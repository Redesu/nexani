import { test, expect } from "@playwright/test";

test("anime details", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("textbox", { name: "search" }).fill("naruto");
  await page
    .getByRole("link", { name: /Naruto:.*Shippuuden/ })
    .first()
    .click();
  await expect(
    page.getByRole("heading", { name: "Naruto: Shippuuden" })
  ).toBeVisible();
  await expect(page.url()).toBe("http://localhost:3000/anime/1735");
});

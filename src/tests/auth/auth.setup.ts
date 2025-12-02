import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await page.getByRole("button", { name: "account of current user" }).click();
  await page.getByRole("menuitem", { name: "Login" }).click();
  await page.waitForLoadState("networkidle");
  await page.fill(
    'input[name="user_name"]',
    process.env.TEST_USER_USERNAME || ""
  );
  await page.fill(
    'input[name="password"]',
    process.env.TEST_USER_PASSWORD || ""
  );
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: "Allow" }).click();
  await page.waitForURL("http://localhost:3000/");

  await page.context().storageState({ path: authFile });
});

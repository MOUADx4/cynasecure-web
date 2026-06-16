import { test, expect } from '@playwright/test';

test.describe('Catalogue', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/catalogue');
  });

  test('affiche le titre et les cartes services', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /catalogue/i })).toBeVisible();
    // Wait for cards to load (skeleton → real content)
    await expect(page.locator('[data-testid="service-card"], .service-card, article').first())
      .toBeVisible({ timeout: 8000 });
  });

  test('la recherche filtre les résultats', async ({ page }) => {
    const search = page.getByPlaceholder(/recherch/i);
    await search.fill('SOC');
    await page.waitForTimeout(400); // debounce
    const cards = page.locator('[data-testid="service-card"], article, .card');
    await expect(cards.first()).toBeVisible({ timeout: 6000 });
    // Results should mention SOC
    await expect(page.getByText(/SOC/i).first()).toBeVisible();
  });

  test('effacer la recherche restaure tous les résultats', async ({ page }) => {
    const search = page.getByPlaceholder(/recherch/i);
    await search.fill('SOC');
    await page.waitForTimeout(400);
    await search.clear();
    await page.waitForTimeout(400);
    // Multiple cards should be visible again
    const count = await page.locator('article').count();
    expect(count).toBeGreaterThan(1);
  });

  test('filtre par type SaaS fonctionne', async ({ page }) => {
    await page.getByRole('button', { name: /saas/i }).click();
    await page.waitForTimeout(400);
    await expect(page.getByText(/saas/i).first()).toBeVisible();
  });

  test('cliquer sur une carte navigue vers les détails', async ({ page }) => {
    await page.waitForTimeout(800);
    const firstCard = page.locator('article, [data-testid="service-card"]').first();
    await firstCard.click();
    await expect(page).toHaveURL(/\/services\/\d+/);
  });

  test('page de détails affiche le prix et le bouton ajout panier', async ({ page }) => {
    await page.goto('/services/2');
    await expect(page.getByText(/€/)).toBeVisible({ timeout: 6000 });
    await expect(page.getByRole('button', { name: /abonner|ajouter|acheter/i })).toBeVisible();
  });
});

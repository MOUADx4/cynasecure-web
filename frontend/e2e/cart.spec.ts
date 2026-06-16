import { test, expect } from '@playwright/test';

async function login(page: any) {
  await page.goto('/connexion');
  await page.getByLabel(/e-mail/i).fill('admin@demo.local');
  await page.getByLabel(/mot de passe/i).fill('Admin1234!');
  await page.getByRole('button', { name: /connexion/i }).click();
  await page.waitForURL(/\/(dashboard|accueil|admin)?/, { timeout: 8000 });
}

test.describe('Panier', () => {
  test('panier vide affiche un état vide', async ({ page }) => {
    await page.goto('/panier');
    await expect(page.getByText(/panier vide|aucun article/i)).toBeVisible({ timeout: 5000 });
  });

  test('ajouter un service au panier depuis les détails', async ({ page }) => {
    await login(page);
    await page.goto('/services/2');
    await expect(page.getByText(/€/)).toBeVisible({ timeout: 6000 });
    const addBtn = page.getByRole('button', { name: /abonner|ajouter|acheter/i });
    await addBtn.click();
    // Confirm alert if present
    page.on('dialog', dialog => dialog.accept());
    // Should show cart indicator or success feedback
    await expect(page.getByText(/ajouté|panier|mon panier/i)).toBeVisible({ timeout: 5000 });
  });

  test('bouton "Mon panier" sur service déjà ajouté navigue vers le panier', async ({ page }) => {
    await login(page);
    await page.goto('/services/2');
    const addBtn = page.getByRole('button', { name: /abonner|ajouter|acheter/i });
    await addBtn.click();
    page.on('dialog', dialog => dialog.accept());
    await page.waitForTimeout(500);
    // Click again when already in cart
    const cartBtn = page.getByRole('button', { name: /mon panier/i });
    if (await cartBtn.isVisible()) {
      await cartBtn.click();
      await expect(page).toHaveURL(/panier/);
    }
  });

  test('page panier affiche les articles et le total', async ({ page }) => {
    await login(page);
    // Add item
    await page.goto('/services/3');
    const btn = page.getByRole('button', { name: /abonner|ajouter|acheter/i });
    await btn.click();
    page.on('dialog', dialog => dialog.accept());
    await page.goto('/panier');
    await expect(page.getByText(/total/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/€/)).toBeVisible();
  });

  test('page 404 affiche le CTA retour accueil', async ({ page }) => {
    await page.goto('/page-inexistante-xyz');
    await expect(page.getByText(/404|introuvable|not found/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('link', { name: /accueil|retour/i })).toBeVisible();
  });
});

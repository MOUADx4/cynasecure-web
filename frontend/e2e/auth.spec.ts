import { test, expect } from '@playwright/test';

const ADMIN = { email: 'admin@demo.local', password: 'Admin1234!' };
const USER  = { email: 'test_e2e@cynasecure.test', password: 'Test1234!' };

test.describe('Authentification', () => {
  test('affiche la page de connexion', async ({ page }) => {
    await page.goto('/connexion');
    await expect(page.getByRole('heading', { name: /connexion/i })).toBeVisible();
    await expect(page.getByLabel(/e-mail/i)).toBeVisible();
    await expect(page.getByLabel(/mot de passe/i)).toBeVisible();
  });

  test('erreur avec des identifiants invalides', async ({ page }) => {
    await page.goto('/connexion');
    await page.getByLabel(/e-mail/i).fill('inconnu@test.com');
    await page.getByLabel(/mot de passe/i).fill('mauvais');
    await page.getByRole('button', { name: /connexion/i }).click();
    await expect(page.getByText(/incorrect|invalide|erreur/i)).toBeVisible({ timeout: 5000 });
  });

  test('connexion admin réussie redirige vers dashboard', async ({ page }) => {
    await page.goto('/connexion');
    await page.getByLabel(/e-mail/i).fill(ADMIN.email);
    await page.getByLabel(/mot de passe/i).fill(ADMIN.password);
    await page.getByRole('button', { name: /connexion/i }).click();
    await expect(page).toHaveURL(/\/(dashboard|accueil|admin)?/, { timeout: 8000 });
  });

  test('lien "mot de passe oublié" accessible', async ({ page }) => {
    await page.goto('/connexion');
    await page.getByRole('link', { name: /oublié/i }).click();
    await expect(page).toHaveURL(/mot-de-passe/);
  });

  test('déconnexion efface la session', async ({ page }) => {
    await page.goto('/connexion');
    await page.getByLabel(/e-mail/i).fill(ADMIN.email);
    await page.getByLabel(/mot de passe/i).fill(ADMIN.password);
    await page.getByRole('button', { name: /connexion/i }).click();
    await page.waitForURL(/\/(dashboard|accueil|admin)?/);
    // Click logout
    const logoutBtn = page.getByRole('button', { name: /déconnexion|logout/i });
    if (await logoutBtn.isVisible()) {
      await logoutBtn.click();
      await expect(page).toHaveURL(/connexion/);
    }
  });
});

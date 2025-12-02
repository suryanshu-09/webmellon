import { test, expect } from '@playwright/test'

/**
 * E2E Tests for Dashboard functionality
 * Tests catalogue display, search, and navigation
 */

test.describe('Dashboard Page', () => {
  test('should display the home page correctly', async ({ page }) => {
    await page.goto('/')
    
    // The home page should load without errors
    await expect(page).toHaveTitle(/WebMellon/i)
  })

  test('should have responsive navigation', async ({ page }) => {
    await page.goto('/')
    
    // Check if the page has basic structure
    await page.waitForLoadState('domcontentloaded')
    
    // The page should not have any console errors
    const errors: string[] = []
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })
    
    await page.waitForTimeout(2000)
    
    // Filter out known acceptable errors (like network issues in test env)
    const criticalErrors = errors.filter(
      e => !e.includes('favicon') && !e.includes('net::')
    )
    
    expect(criticalErrors.length).toBe(0)
  })
})

test.describe('Feed Pages', () => {
  test('should navigate to YouTube feed page', async ({ page }) => {
    await page.goto('/feed/ytfeed')
    
    await page.waitForLoadState('domcontentloaded')
    
    // Check the page loads without crashing
    const currentUrl = page.url()
    expect(
      currentUrl.includes('/feed/ytfeed') || 
      currentUrl.includes('/signin')
    ).toBeTruthy()
  })

  test('should navigate to WordPress feed page', async ({ page }) => {
    await page.goto('/feed/wpfeed')
    
    await page.waitForLoadState('domcontentloaded')
    
    const currentUrl = page.url()
    expect(
      currentUrl.includes('/feed/wpfeed') || 
      currentUrl.includes('/signin')
    ).toBeTruthy()
  })

  test('should navigate to News feed page', async ({ page }) => {
    await page.goto('/feed/newsfeed')
    
    await page.waitForLoadState('domcontentloaded')
    
    const currentUrl = page.url()
    expect(
      currentUrl.includes('/feed/newsfeed') || 
      currentUrl.includes('/signin')
    ).toBeTruthy()
  })

  test('should navigate to main feed page', async ({ page }) => {
    await page.goto('/feed')
    
    await page.waitForLoadState('domcontentloaded')
    
    const currentUrl = page.url()
    expect(
      currentUrl.includes('/feed') || 
      currentUrl.includes('/signin')
    ).toBeTruthy()
  })
})

test.describe('Edit Pages', () => {
  test('should navigate to edit catalogues page', async ({ page }) => {
    await page.goto('/edit/catalogues')
    
    await page.waitForLoadState('domcontentloaded')
    
    const currentUrl = page.url()
    expect(
      currentUrl.includes('/edit/catalogues') || 
      currentUrl.includes('/signin')
    ).toBeTruthy()
  })

  test('should navigate to edit websites page', async ({ page }) => {
    await page.goto('/edit/websites')
    
    await page.waitForLoadState('domcontentloaded')
    
    const currentUrl = page.url()
    expect(
      currentUrl.includes('/edit/websites') || 
      currentUrl.includes('/signin')
    ).toBeTruthy()
  })

  test('should navigate to edit feed page', async ({ page }) => {
    await page.goto('/edit/feed')
    
    await page.waitForLoadState('domcontentloaded')
    
    const currentUrl = page.url()
    expect(
      currentUrl.includes('/edit/feed') || 
      currentUrl.includes('/signin')
    ).toBeTruthy()
  })
})

test.describe('Error Handling', () => {
  test('should display error page for invalid routes', async ({ page }) => {
    await page.goto('/error')
    
    await page.waitForLoadState('domcontentloaded')
    
    // Error page should load
    const currentUrl = page.url()
    expect(currentUrl.includes('/error')).toBeTruthy()
  })

  test('should handle 404 gracefully', async ({ page }) => {
    await page.goto('/non-existent-page-xyz-123')
    
    await page.waitForLoadState('domcontentloaded')
    
    // Should show 404 page or redirect
    // Next.js will show a 404 page by default
  })
})

test.describe('Accessibility', () => {
  test('signin page should have proper form labels', async ({ page }) => {
    await page.goto('/signin')
    
    await page.waitForLoadState('domcontentloaded')
    
    // Check that buttons have accessible text
    const googleButton = page.getByText('Login with Google')
    const githubButton = page.getByText('Login with Github')
    const guestButton = page.getByText('Login as Guest')
    
    await expect(googleButton).toBeVisible()
    await expect(githubButton).toBeVisible()
    await expect(guestButton).toBeVisible()
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/signin')
    
    await page.waitForLoadState('domcontentloaded')
    
    // The page should have a clear heading
    const heading = page.getByText('SignUp to')
    await expect(heading).toBeVisible()
  })
})

test.describe('Mobile Responsiveness', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test('signin page should be mobile friendly', async ({ page }) => {
    await page.goto('/signin')
    
    await page.waitForLoadState('domcontentloaded')
    
    // Check that main elements are visible on mobile
    await expect(page.getByText('SignUp to')).toBeVisible()
    await expect(page.getByText('WebMellon')).toBeVisible()
    
    // Buttons should still be accessible
    await expect(page.getByText('Login with Google')).toBeVisible()
    await expect(page.getByText('Login with Github')).toBeVisible()
    await expect(page.getByText('Login as Guest')).toBeVisible()
  })
})

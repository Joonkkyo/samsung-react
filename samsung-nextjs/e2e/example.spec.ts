import { test, expect } from '@playwright/test'

test.describe('영화 목록 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/movies') // baseURL을 기준으로 상대 경로 사용
  })

  test('페이지 접속 시 기본 영화 목록이 표시되어야 함', async ({ page }) => {
    await expect(page.locator('h2')).toHaveText('Movie List!')
    await expect(
      page.locator('div').filter({ hasText: 'The Avengers' })
    ).toBeVisible()
    await expect(page.locator('div').count()).toBeGreaterThan(2) // 영화 항목 + 제목
  })

  test('영화 제목 검색 시 해당 영화 목록이 표시되어야 함', async ({ page }) => {
    const searchInput = page.getByPlaceholder('영화 제목을 입력하세요!')
    await searchInput.fill('batman')
    await searchInput.press('Enter')
    await expect(
      page.locator('div').filter({ hasText: 'Batman Begins' })
    ).toBeVisible()
    await expect(page.locator('div').count()).toBeGreaterThan(2)
  })
})

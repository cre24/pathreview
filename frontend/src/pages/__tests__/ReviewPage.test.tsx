import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { axe } from 'jest-axe'
import { ReviewPage } from '../ReviewPage'
import { useReviewStatus } from '../../hooks/useReviewStatus'
import { apiClient } from '../../services/api'
import type { Review } from '../../types'

// ---- Mocks ----------------------------------------------------------------
// Mock the polling hook so we control the render state directly instead of
// waiting on timers / network.
vi.mock('../../hooks/useReviewStatus')

// Mock the API client so the "complete" path can populate `fullReview`.
vi.mock('../../services/api', () => ({
  apiClient: {
    getReview: vi.fn(),
    getReviewStatus: vi.fn(),
  },
}))

// Typed handles to the mocked functions.
const mockedUseReviewStatus = vi.mocked(useReviewStatus)
const mockedGetReview = vi.mocked(apiClient.getReview)

// ---- Fixtures -------------------------------------------------------------
// A fully-populated, "happy path" review. Spread + override per-test for
// variants (missing score, empty sections, failed, etc.).
const fixtureReview: Review = {
  id: 'review-123',
  profile_id: 'profile-123',
  status: 'complete',
  overall_score: 0.82,
  sections: [
    {
      section_name: 'GitHub Profile',
      content: 'Your pinned repos tell a clear story.',
      suggestions: ['Add a README badge', 'Pin one more project'],
      confidence: 0.9,
    },
  ],
  error_message: undefined,
  created_at: '2026-07-28T00:00:00Z',
  updated_at: '2026-07-28T00:00:00Z',
}

// Default return shape for the hook. Helpers below override fields per state.
const hookReturn = (over: Partial<ReturnType<typeof useReviewStatus>> = {}) => ({
  review: null,
  isPolling: false,
  error: null,
  ...over,
})

// ---- Helpers --------------------------------------------------------------
// ReviewPage reads `reviewId` from the route, so render under a matching path.
function renderReviewPage(reviewId = 'review-123') {
  return render(
    <MemoryRouter initialEntries={[`/reviews/${reviewId}`]}>
      <Routes>
        <Route path="/reviews/:reviewId" element={<ReviewPage />} />
      </Routes>
    </MemoryRouter>
  )
}

// State setup shortcuts — each mirrors one edge case from PLAN.md.
// A "complete" render needs BOTH: hook says complete+not-polling AND
// apiClient.getReview resolves (that's what fills `fullReview`).
function setLoadingState() {
  mockedUseReviewStatus.mockReturnValue(hookReturn({ isPolling: true }))
}

function setCompleteState(review: Review = fixtureReview) {
  mockedUseReviewStatus.mockReturnValue(
    hookReturn({ review, isPolling: false })
  )
  mockedGetReview.mockResolvedValue(review)
}

function setFailedState(errorMessage?: string) {
  mockedUseReviewStatus.mockReturnValue(
    hookReturn({
      review: { ...fixtureReview, status: 'failed', error_message: errorMessage },
      isPolling: false,
    })
  )
}

// Status-error banner (ReviewPage.tsx:82-86): useReviewStatus surfaces an
// `error`. Renders regardless of polling, so pair it with the spinner.
function setStatusErrorState(error = 'Failed to fetch review status') {
  mockedUseReviewStatus.mockReturnValue(hookReturn({ isPolling: true, error }))
}

// Fetch-error banner (ReviewPage.tsx:88-92): hook says complete, but the
// follow-up apiClient.getReview REJECTS, so `fullReview` stays null and
// `fetchError` is set. Exercises the getReview reject path.
function setFetchErrorState(message = 'Failed to load review') {
  mockedUseReviewStatus.mockReturnValue(
    hookReturn({ review: fixtureReview, isPolling: false })
  )
  mockedGetReview.mockRejectedValue(new Error(message))
}

beforeEach(() => {
  vi.clearAllMocks()
})

// ===========================================================================
// Scaffolding smoke test (delete once real tests below exist)
// ===========================================================================
describe('ReviewPage — smoke', () => {
  it('renders the back-to-dashboard control in every state', () => {
    setLoadingState()
    renderReviewPage()
    expect(
      screen.getByRole('button', { name: /back to dashboard/i })
    ).toBeInTheDocument()
  })
})

// ===========================================================================
// Semantic / role assertions (PLAN step 5)
// ===========================================================================
describe('ReviewPage — semantics & roles', () => {
  // Complete state: reachable landmarks + controls by role/name.
  it.todo('exposes the "Portfolio Review" heading when complete')
  it.todo('exposes Share and Export buttons by accessible name')
  it.todo('renders the "Overall Score" heading when overall_score is defined')
  it.todo('hides the score block when overall_score is undefined')
  it.todo('shows the "No feedback sections available" fallback when sections empty')

  // Failed state
  it.todo('shows the review-failed message with error_message when present')
  it.todo('falls back to "An error occurred" when error_message is absent')

  // Error banners (distinct from failed status)
  it.todo('shows the status-error banner when useReviewStatus returns an error')
  it.todo('shows the fetch-error banner when getReview rejects')
})

// ===========================================================================
// Axe scans across render states (PLAN step 7)
// ===========================================================================
describe('ReviewPage — a11y (axe)', () => {
  it.todo('loading state has no axe violations')

  it('complete state has no axe violations', async () => {
    setCompleteState()
    const { container } = renderReviewPage()
    await screen.findByRole('heading', { name: /portfolio review/i })
    expect(await axe(container)).toHaveNoViolations()
  })

  it.todo('failed state has no axe violations')
  it.todo('empty-sections state has no axe violations')
  it.todo('error-banner state has no axe violations')

  // NOTE (out of scope, see PLAN.md risks): the score progress bar at
  // ReviewPage.tsx:134-138 has no role/aria — not queryable by screen readers.
  // TODO(#issue): add role="progressbar" + aria-valuenow and cover it here.
})

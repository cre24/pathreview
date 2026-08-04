## Week 7 — Issue selection

**Issue link:** https://github.com/ascherj/pathreview/issues/105

**Issue title:** Add accessibility tests for the review page using `jest-axe`

**Tier:** Tier 2

**Problem summary:**
The review page currently has no automated accessibility checks, so regressions in things like color contrast, missing form labels, or improper heading order could ship without anyone noticing. This issue asks for `jest-axe` tests to be added to the existing `ReviewPage.test.tsx` file that automatically scan the rendered page for common accessibility violations. A successful fix adds test coverage that fails the build if the review page violates baseline accessibility rules, giving the team a safety net going forward rather than relying on manual checks.

**Selection notes:**
I considered a Tier 3 frontend bug (#97, real-time progress indicator) and a
Tier 2 feature (#101, shareable review links) before choosing this one. I
have TypeScript/React experience and some prior exposure to accessibility
testing at work, though not with `jest-axe` specifically, so this felt like
the right level of stretch — a new tool applied to a domain I already
understand, rather than a new domain and a new tool at once. It's also
scoped to a single file with a clear, verifiable output (test pass/fail),
which made it a safer time commitment than the alternatives I considered.

**Branch name:** test/105-review-page-a11y-tests

**Setup confirmation:** [x] App runs locally at localhost:5173

**Cohort ledger:** [x] Issue added to cohort ledger

## Week 8 — Reproduction & solution planning

**Reproduction commit link:** There is no comment for me to leave for the issue so I will provide the expected file path for the test file: `frontend/src/pages/__tests__/ReviewPage.test.tsx`

**Reproduction summary:**
The issue included the location for the test file so I checked if the file already existed. Navigate to the pages directory and you will see there is not a `__tests__` subdirectory.

**PLAN.md link:** https://github.com/cre24/pathreview/blob/test/105-review-page-a11y-tests/docs/PLAN.md

**Walkthrough video (recommended):** 

**Blockers or open questions:**

## Week 9 — Solution building & PR submission

### Check-in 1 (mid-week)

**Current progress:**
Committed the test scaffolding (commit 1). Wired `jest-axe` into
`frontend/src/test/setup.ts` by registering the `toHaveNoViolations` matcher,
and created `frontend/src/pages/__tests__/ReviewPage.test.tsx` with the mocks
for `useReviewStatus` and `apiClient`, a `Review` fixture, a `renderReviewPage`
router helper, and per-state setup shortcuts (loading, complete, failed,
status-error, fetch-error). The file runs green with a passing smoke test and
the working complete-state axe scan; the remaining assertions are stubbed as
`it.todo`. This covers PLAN.md steps 3 (matcher) and 4 (helpers/mocks).

**Next steps:**
Fill in the role/semantic assertions (PLAN step 5: complete-state heading and
Share/Export buttons, score shown vs. hidden, empty-sections fallback, failed
w/ and w/o error_message, and the two error banners), then the remaining axe
scans for each render state (PLAN step 7). Open the PR once green.

**Blockers:**
None.

---

### Check-in 2 (end of week)

**PR link:** https://github.com/ascherj/pathreview/pull/745

**Branch:** `test/105-review-page-a11y-tests`

**What you built:**
Added the first automated test coverage for ReviewPage: an accessibility test suite built on jest-axe that scans each render state for violations and asserts on roles and accessible names to confirm interactive elements remain reachable by assistive technology.

**Tests added or updated:**
- `frontend/src/pages/__tests__/ReviewPage.test.tsx` (new) — axe scans across
render states and semantic/role assertions. 
- `frontend/src/test/setup.ts` — registered the `jest-axe` `toHaveNoViolations` matcher.

**Self-review confirmation:** [x] make check passes  [x] make test-unit passes

**Pre-existing failures (baseline on `main`, none introduced by this PR):**
- `make test-unit`: 53 failed / 375 passed, all in backend modules
  (`test_review_service`, `test_security`, `test_skill_extractor`, …).
- `make lint`: 182 ruff errors, none in `frontend/` (`make check` stops here).
- Frontend `npm test`: 2 failures — `ProfileForm.test.tsx` (uninstalled
  `@testing-library/user-event`) and `ReviewSection.test.tsx >
  "starts collapsed and expands on click"`.
This PR only adds `ReviewPage.test.tsx` and one matcher line in `setup.ts`; it
touches no Python and no other frontend file. All 15 new tests pass.

**Draft PR feedback received from:** None

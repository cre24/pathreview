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
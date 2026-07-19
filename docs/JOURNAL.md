## Week 7 — Issue selection

**Issue link:** https://github.com/ascherj/pathreview/issues/105

**Issue title:** Add accessibility tests for the review page using `jest-axe`

**Tier:** Tier 2

**Problem summary:**
The review page currently has no automated accessibility checks, so regressions in things like color contrast, missing form labels, or improper heading order could ship without anyone noticing. This issue asks for `jest-axe` tests to be added to the existing `ReviewPage.test.tsx` file that automatically scan the rendered page for common accessibility violations. A successful fix adds test coverage that fails the build if the review page violates baseline accessibility rules, giving the team a safety net going forward rather than relying on manual checks.

**Branch name:** test/105-review-page-a11y-tests

**Setup confirmation:** [x] App runs locally at localhost:5173

**Cohort ledger:** [x] Issue added to cohort ledger

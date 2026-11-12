# Revision plan

1. Read both practice documents and resolve their conflicting implementation narratives.
2. Use Practice 07's actual numeric TypeScript API and strict starts-after-now rule.
3. Reconstruct the 17 documented scenarios against an equivalent one-room baseline.
4. Add immutable room catalog, ALL-equipment filtering and selection orchestration.
5. Extract repeated validation into validateTimes and keep checkAvailability's API.
6. Run the shared regression cases and feature/HTTP integration checks.
7. Update the diagrams, report, AI record and provenance of all quality metrics.

Risks in the reconstruction, not findings about unavailable original source:
- baseline/src/validation.ts checkAvailability and preview repeat time validation.
- baseline/src/app.ts combines fixed one-room data with DOM presentation.
- Directly passing the baseline booking fixture while switching rooms would check
  the wrong room. final/src/service.ts passes selected.bookings explicitly.

Rejected suggestion: keep the previous revision's start >= now rule. Practice
07 T02 provides a stronger project-specific contract, so use start > now.
Preserve the previous regression protections for touching intervals and mutation.

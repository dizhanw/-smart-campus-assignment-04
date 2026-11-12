# Source alignment and corrections

Practice-07.docx establishes:
- src/validation.ts and checkAvailability(room, start, end, currentTime, bookings).
- Numeric minutes, default currentTime 540, one booking 600–660.
- T02: start=540, end=570 must be unavailable; the equality bug was fixed with <=.
- 17 named cases: T01–T14, AC5, Extra 1, Extra 2. The reported run used Vitest 2.1.9.
- Room names Innovation Lab and blocked Project Room A.
- Historical Versions 5/8, mutation claims and limits; mobile review not verified.

Practice 08 contains conflicting historical narratives. Its appended evidence
notes explicitly identify the actual validation.ts project, say the earlier
roomAvailability.js screenshots differ, and limit claims about source diffs,
skill activation and matched AI comparisons. Those limits are retained here.

Corrections to the first Assignment 04 packet:
- Replace Python implementation with TypeScript source matching the documented API.
- Reject start exactly at currentTime, retain numeric minute input and day boundary.
- Use isBlocked and CheckResult decision/reasons, rather than available/message.
- Reconstruct all 17 documented test scenarios and add new feature/HTTP checks.
- Separate historical Vitest results from newly executed Node results.
- Tie the report to the two practice documents while noting source is reconstructed.

No source export or live Bolt workspace was opened. Repository counts and
before/after differences refer only to this submitted local reconstruction.

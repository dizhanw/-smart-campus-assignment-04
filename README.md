# Smart Campus Assignment 04

Student: Dizhan Mashirov. Revision aligned with Practice-07.docx and
Smart_Campus_Practice_08_Report.docx, supplied on 12 November 2026.

## Provenance
The reports identify a TypeScript application with src/validation.ts and the
function checkAvailability(room, start, end, currentTime, bookings). The full
Bolt source was not attached. Both source snapshots here are equivalent local
reconstructions of the documented contract, not an export of Bolt Versions 5/8.
Room names Innovation Lab and Project Room A, now=540 and the 600–660 booking
follow Practice 07. IDs, capacities, equipment and additional bookings are
fictional choices for Assignment 04, not recovered historical project facts.

Practice 08 contains an earlier JavaScript/8-test narrative and later evidence
notes identifying the actual TypeScript/17-test project. The latter explicitly
limit which debugging, skill-activation and comparison claims are verified.
This assignment uses Practice 07's numeric TypeScript contract. No new skill
is created, and prior skill activation is not claimed or required.

## Setup and commands
Node.js 24 or later; modern browser. No npm install or third-party packages.
Node's built-in type stripping executes the TypeScript modules. It is not a
TypeScript compiler or static type check.

From this directory:

```sh
npm run start:baseline
# Open http://127.0.0.1:8001 ; Ctrl+C to stop
npm start
# Open http://127.0.0.1:8000 ; Ctrl+C to stop
npm run test:baseline
npm test
```

Equivalent direct test commands actually executed:

```sh
node --test tests/baseline.test.mjs
node --test tests/final.test.mjs tests/features.test.mjs tests/http.test.mjs
```

New local results: baseline 17/17; final 37/37 (17 shared regression, 15 feature
and 5 HTTP checks). These are fresh Node test runs. Practice 07's 17/17 Vitest
result is a historical report, not a Vitest rerun in this session. Node may
print an ExperimentalWarning for stripTypeScriptTypes; this does not fail tests.

## Contract and demonstration
- Numeric whole minutes after midnight; 0 <= start < end <= 1440.
- Start must be strictly later than fixed now=540. Start exactly 540 is rejected
  as Practice 07 T02 requires; 541–570 is allowed with no overlap.
- At most 120 minutes. Touching endpoints are allowed using strict inequalities.
- room.isBlocked means unavailable. No booking is added, sorted or changed.
- Result remains {decision: 'available'|'unavailable', reasons: string[]}.
- Room capacity >= attendees; ALL selected equipment items required.
- Empty matches clear both selection and result. Selection changes recompute.

At 660–720 (11:00–12:00), 4 attendees and no equipment, R101 is available;
switch to R102 and its own booking conflicts. Choose Computers to keep R103
only. Request 25 attendees to get the empty state. R104 Project Room A is
blocked. On R101, 720–840 is exactly 120 minutes and 720–841 is rejected.

## Structure and metrics
baseline/src/validation.ts contains the reconstructed one-room contract and
an explicitly reconstructed duplicate preview path. This duplication is NOT
an observed defect of the unavailable Bolt source. baseline/src/app.ts embeds
the one-room fixture and DOM handling.

final/src/types.ts: types; data.ts: immutable fictional catalog; validation.ts:
time and availability rules; filtering.ts: capacity and ALL equipment;
service.ts: selection and rule composition; app.ts: DOM rendering. Shared local
server.mjs serves HTML/CSS and strips TS annotations for browsers. No backend
booking API, database, authentication or external service is involved.

Manual source comparison counts two baseline time-validation blocks versus
one final validateTimes block, removing one extra reconstructed location.
Counts describe this submitted reconstruction only. They are not measured
changes in the original Bolt repository. Full source diff and hashes are in
evidence/. The baseline has two TS modules; final has six. Shared server,
HTML, CSS, tests and evidence are excluded from these module counts.

## Evidence and limitations
See evidence/baseline-tests.txt, final-tests.txt, validation.diff,
source-alignment.md, plan.md, ai-record.md and sha256.txt. Integration tests
compose filtering, selection and validation, and HTTP tests check actual served
JavaScript/HTML/CSS. No browser rendering or mobile behavior is claimed tested.
A real desktop/mobile and keyboard review remains outstanding, as does
independent student review. No dates, persistence, booking creation, external
APIs or multi-user reservation races are in scope.

# AI use record
Tool: OpenAI ChatGPT acting as Codex. Exact model version unavailable.
Date: 12 November 2026.

User revision request: read the previous practices and change Assignment 04 if needed.
Inputs: assignment presentation plus Practice-07.docx and
Smart_Campus_Practice_08_Report.docx, including its appended evidence limits.

Context brief used for this revision: retain numeric minutes, fixed now=540,
start > now, max 120, end<=1440, isBlocked, strict overlap and no mutation;
keep checkAvailability's positional arguments and decision/reasons result;
reconstruct T01–T14, AC5 and both extras; add four rooms and F1–F5.
This brief is a summary of supplied context, not a fabricated separate transcript.

Output used: complete equivalent baseline and extended TypeScript source,
shared Node regression tests, feature/HTTP tests, README and revised report.

Correction/rejected suggestion: the previous AI packet allowed start exactly
at now and used a Python available/message API. Practice 07 T02 and its real
function signature contradicted those choices. This revision corrects both.

Verification: fresh Node built-in test runs, baseline 17/17 and final 37/37;
source review of immutable data and selected.bookings; HTTP TS transformation
checks; comparison of source snapshots; rendered DOCX page review.
Not performed: fresh Vitest run, original Bolt source diff, static TypeScript
compiler check, browser rendering/mobile review, separate human review or
matched skill/no-skill comparison. Historical claims are not relabeled as new.

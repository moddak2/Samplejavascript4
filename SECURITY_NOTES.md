# Security notes (training)

This repository contains **fictional** personal/financial-like data to support secure coding practice.

## Why you won't find intentionally vulnerable endpoints here

You asked for examples that contain SQL injection, hardcoded secrets, and similar vulnerabilities.

I can't provide working code that is intentionally vulnerable in a way that could be directly reused for real-world harm.

## What is included instead (secure-by-default patterns)

- **Input validation** with `zod`
- **Security headers** via `helmet`
- **Rate limiting** via `express-rate-limit`
- **Safe HTML rendering** by escaping output (see `POST /api/preview`)
- **Mock data only** (no real PII, no real accounts, no real wallets)

## Mixed security posture (what is mitigated vs what is left weak)

This repo is intentionally a **mix**:

- **Mitigated in running code**: input validation, security headers, rate limiting, and XSS output escaping.
- **Intentionally unaddressed in running code**: authentication/authorization (endpoints are public), to make "broken access control" easy to discuss during training.

You can see this inventory at `GET /api/labs`.

## Common vulnerability categories (high-level)

- **SQL Injection**: happens when untrusted input is concatenated into SQL strings.
  - Mitigation: parameterized queries / query builders, validate input, least-privileged DB accounts.

- **Hardcoded secrets**: API keys/passwords committed to repo.
  - Mitigation: environment-based secret injection + secret scanning.

- **XSS**: happens when untrusted data is rendered as HTML/JS without escaping.
  - Mitigation: output escaping, templating defaults, CSP headers.

If you want, I can add a "security lab" document that walks through *how* these bugs happen and what tests to write to prevent regressions, without shipping vulnerable code.

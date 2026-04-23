const express = require('express');

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({
    data: [
      {
        id: 'xss-output-escaping',
        posture: 'mitigated',
        where: '/api/preview',
        summary: 'Untrusted text is HTML-escaped before rendering.',
        riskIfMissing: 'Reflected/stored XSS',
        mitigation: 'Escape output; keep CSP headers enabled.'
      },
      {
        id: 'input-validation',
        posture: 'mitigated',
        where: '/api/people/:id, /api/finance/owner/:ownerId, /api/preview',
        summary: 'Request params/body are validated with zod.',
        riskIfMissing: 'Injection primitives, crashes, weird edge cases',
        mitigation: 'Schema-validate all inputs and set size limits.'
      },
      {
        id: 'security-headers',
        posture: 'mitigated',
        where: 'app middleware',
        summary: 'Helmet is enabled and X-Powered-By is disabled.',
        riskIfMissing: 'Weaker browser-side protections, info leakage',
        mitigation: 'Use Helmet defaults; tune CSP as needed.'
      },
      {
        id: 'rate-limiting',
        posture: 'mitigated',
        where: 'app middleware',
        summary: 'Basic rate limiting enabled for abuse resistance.',
        riskIfMissing: 'Bruteforce / scraping / DoS amplification',
        mitigation: 'Rate limit + logging + bot protections.'
      },
      {
        id: 'broken-access-control',
        posture: 'intentionally-unaddressed',
        where: '/api/people, /api/finance/*',
        summary: 'These endpoints are public (no auth) in this training sample.',
        riskIfPresent: 'IDOR / data exposure in real systems',
        mitigation: 'Add authn/authz (sessions/JWT), enforce per-user access.'
      },
      {
        id: 'sql-injection',
        posture: 'not-implemented-as-executable',
        where: 'N/A (no DB in this repo)',
        summary: 'SQLi happens when untrusted input is concatenated into SQL strings.',
        riskIfPresent: 'Data exfiltration / auth bypass / data corruption',
        mitigation: 'Use parameterized queries/query builder; validate inputs.'
      },
      {
        id: 'hardcoded-secrets',
        posture: 'not-implemented-as-executable',
        where: 'N/A (no secrets in runtime code)',
        summary: 'Hardcoded secrets are credentials committed into source control.',
        riskIfPresent: 'Credential leak, lateral movement',
        mitigation: 'Inject secrets via environment/secret manager + scanning.'
      }
    ]
  });
});

module.exports = router;

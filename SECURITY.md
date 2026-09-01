# Security Policy

## Scope

This repository contains the source for the [orangelabs.co](https://orangelabs.co) marketing site (Astro + React + Tailwind, deployed via Netlify). This polic
y covers that codebase and its deployment only.

**Out of scope:** `community.orangelabs.co` runs on [Circle](https://circle.so) and is not part of this repository or deployment — please report any issues th
ere directly to Circle.

## Supported Versions

This project has no versioned releases — only the code currently deployed on `main` is supported. Security fixes are applied to `main` and go live on the next
 deploy.

## Reporting a Vulnerability

If you find a security issue (e.g. an XSS vector, exposed secret, dependency vulnerability, or misconfiguration), please report it privately rather than openi
ng a public issue.

- **Preferred:** open a [GitHub Security Advisory](https://github.com/BritneyMuller/orange-labs/security/advisories/new) for this repo (visible only to mainta
iners until resolved).
- **Alternative:** email britneymuller@gmail.com with a description of the issue and steps to reproduce.

**What to expect:**
- Acknowledgment within 3 business days.
- An initial assessment (accepted / needs more info / declined) within 7 days.
- If accepted, a fix timeline based on severity — critical issues (e.g. exposed credentials, RCE, auth bypass) are prioritized for same-week deployment.
- Credit in the fix commit/release notes if you'd like it, once the issue is resolved.

Please do not publicly disclose a vulnerability until it's been fixed and deployed.
